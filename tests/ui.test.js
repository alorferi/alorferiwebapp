import { afterEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import UiModal from '@/components/ui/UiModal.vue';
import UiFileInput from '@/components/ui/UiFileInput.vue';
import { modalState } from '@/components/ui/modalState';
const wrappers = [];
afterEach(async () => {
    wrappers.forEach(wrapper => wrapper.unmount());
    wrappers.length = 0;
    await nextTick();
    document.body.innerHTML = '';
});
function modal(props = {}) {
    const wrapper = mount(UiModal, {
        attachTo: document.body,
        props: { modelValue: true, title: 'Confirm', ...props },
        global: { mocks: { $stores: { language: { activeLanguage: 'en' } } } },
    });
    wrappers.push(wrapper);
    return wrapper;
}
describe('Vue 3 native shared components', () => {
    it('teleports dialogs to body, labels them, emits v-model updates and releases the body lock', async () => {
        const wrapper = modal();
        await nextTick();
        const panel = document.querySelector('[role="dialog"]');
        expect(panel.getAttribute('aria-modal')).toBe('true');
        expect(document.getElementById(panel.getAttribute('aria-labelledby')).textContent).toBe('Confirm');
        expect(document.body.style.overflow).toBe('hidden');
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
        await wrapper.setProps({ modelValue: false });
        expect(document.querySelector('[role="dialog"]')).toBeNull();
        expect(document.body.style.overflow).toBe('');
    });
    it('keeps nested and busy dialogs from dismissing the wrong layer', async () => {
        const first = modal();
        const second = modal({ busy: true, title: 'Saving' });
        await nextTick();
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        expect(first.emitted('update:modelValue')).toBeUndefined();
        expect(second.emitted('update:modelValue')).toBeUndefined();
        await second.setProps({ busy: false });
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        expect(second.emitted('update:modelValue')).toEqual([[false]]);
        await second.setProps({ modelValue: false });
        expect(modalState.layers).toHaveLength(1);
        expect(document.body.style.overflow).toBe('hidden');
    });
    it('emits the selected File via Vue 3 v-model and ignores drops while disabled', async () => {
        const wrapper = mount(UiFileInput);
        wrappers.push(wrapper);
        expect(wrapper.html()).toContain('type="file"');
        const file = new File(['image'], 'book.png', { type: 'image/png' });
        await wrapper.trigger('drop', { dataTransfer: { files: [file] } });
        expect(wrapper.emitted('update:modelValue')).toEqual([[file]]);
        await wrapper.setProps({ disabled: true });
        await wrapper.trigger('drop', { dataTransfer: { files: [file] } });
        expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    });
});
