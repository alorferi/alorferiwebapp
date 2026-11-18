import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useStores } from '@/store';
import api from '@/api';

function freshStores() {
    const pinia = createPinia();
    setActivePinia(pinia);
    return useStores(pinia);
}
function deferred() {
    let resolve, reject;
    const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
    return { promise, resolve, reject };
}
const post = id => ({ attributes: { id, user: { id: 7 } } });
const page = (ids, next = null) => ({ data: { data: ids.map(post), links: { next }, meta: { total: 3 } } });
let stores;
beforeEach(() => {
    localStorage.clear();
    delete api.defaults.headers.common.Authorization;
    stores = freshStores();
    stores.auth.setToken('fixture-token');
    localStorage.setItem('token', JSON.stringify('fixture-token'));
});

describe('native Pinia stores', () => {
    it('creates independent state for every domain in separate app instances', () => {
        const other = freshStores();
        expect(Object.keys(stores)).toHaveLength(23);
        for (const name of Object.keys(stores)) {
            expect(stores[name]).not.toBe(other[name]);
            expect(stores[name].$state).not.toBe(other[name].$state);
        }
        stores.post.insertPostToFeed(post(1));
        expect(other.post.postsResponse.data).toEqual([]);
    });
    it('persists login, then clears authentication and invalidates pending feed pages on logout', async () => {
        vi.spyOn(api, 'request');
        const adapter = vi.fn(async config => ({ data: { data: { token: 'new-token' } }, status: 200, statusText: 'OK', headers: {}, config }));
        const previous = api.defaults.adapter;
        api.defaults.adapter = adapter;
        try {
            await stores.auth.loginBasic({ mobile: '01700000000', password: 'fixture' });
            expect(stores.auth.access_token).toBe('new-token');
            expect(JSON.parse(localStorage.getItem('token'))).toBe('new-token');
            expect(api.defaults.headers.common.Authorization).toBe('Bearer new-token');
            stores.post.insertPostToFeed(post(1));
            const generation = stores.post.postsPaging.generation;
            await stores.auth.logout();
            expect(stores.auth.isLoggedIn).toBe(false);
            expect(localStorage.getItem('token')).toBeNull();
            expect(api.defaults.headers.common.Authorization).toBeUndefined();
            expect(stores.post.postsResponse.data).toEqual([]);
            expect(stores.post.postsPaging.generation).toBeGreaterThan(generation);
        } finally { api.defaults.adapter = previous; }
    });
    it('deduplicates cart entries and restores saved language in a new app', () => {
        stores.myCart.addProductToCart({ id: 4, name: 'Book' });
        stores.myCart.addProductToCart({ id: 4, name: 'Book' });
        expect(stores.myCart.myCart).toHaveLength(1);
        stores.language.setActiveLanguage('bn');
        expect(freshStores().language.activeLanguage).toBe('bn');
    });
});

describe('feed pagination', () => {
    it('prevents concurrent requests, merges unique posts, and stops at the last page', async () => {
        const pending = deferred();
        const get = vi.spyOn(api, 'get').mockReturnValueOnce(pending.promise).mockResolvedValueOnce(page([2, 3]));
        const first = stores.post.fetchPostFeed();
        expect(await stores.post.fetchPostFeed()).toBeNull();
        expect(get).toHaveBeenCalledTimes(1);
        pending.resolve(page([1, 2], '?page=2'));
        await first;
        await stores.post.fetchPostFeed();
        expect(stores.post.postsResponse.data.map(x => x.attributes.id)).toEqual([1, 2, 3]);
        expect(get.mock.calls[1][0]).toContain('?page=2');
        expect(await stores.post.fetchPostFeed()).toBeNull();
        expect(get).toHaveBeenCalledTimes(2);
    });
    it('keeps existing posts on error and retries the same page explicitly', async () => {
        const get = vi.spyOn(api, 'get').mockResolvedValueOnce(page([1], '?page=2')).mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce(page([2]));
        await stores.post.fetchPostFeed();
        await expect(stores.post.fetchPostFeed()).rejects.toThrow('offline');
        expect(stores.post.postsResponse.data).toHaveLength(1);
        expect(await stores.post.fetchPostFeed()).toBeNull();
        await stores.post.fetchPostFeed({ retry: true });
        expect(get.mock.calls[1][0]).toBe(get.mock.calls[2][0]);
        expect(stores.post.postsResponse.data).toHaveLength(2);
    });
    it('discards stale responses after changing feed or logging out', async () => {
        const old = deferred();
        vi.spyOn(api, 'get').mockReturnValueOnce(old.promise).mockResolvedValueOnce(page([2]));
        const first = stores.post.fetchPostFeed();
        await stores.post.fetchPostsPage({ source: '/api/users/7/posts' });
        old.resolve(page([1]));
        await first;
        expect(stores.post.postsResponse.data.map(x => x.attributes.id)).toEqual([2]);
        const pending = deferred();
        api.get.mockReturnValueOnce(pending.promise);
        const request = stores.post.fetchPostFeed();
        await stores.auth.logout();
        pending.resolve(page([9]));
        await request;
        expect(stores.post.postsResponse.data).toEqual([]);
    });
    it('finishes an async action in its original Pinia instance', async () => {
        const pending = deferred();
        vi.spyOn(api, 'get').mockReturnValueOnce(pending.promise);
        const request = stores.post.fetchPostFeed();
        const other = freshStores();
        pending.resolve(page([1]));
        await request;
        expect(stores.post.postsResponse.data).toHaveLength(1);
        expect(other.post.postsResponse.data).toEqual([]);
    });
});
