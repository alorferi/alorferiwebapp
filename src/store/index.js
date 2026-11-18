import { createPinia } from 'pinia';
import { registerStores,useStores } from './registry';
import { actions } from './owners';
import { useAuthStore } from './auth.js';
import { useBlockStore } from './block.js';
import { useCommentStore } from './comment.js';
import { useComplainStore } from './complain.js';
import { useCourseOrderStore } from './course-order.js';
import { useCourseStore } from './course.js';
import { useFollowerStore } from './follower.js';
import { useLanguageStore } from './language.js';
import { useLibraryBookIssueStore } from './library-book-issue.js';
import { useLibraryBookStore } from './library-book.js';
import { useLibraryFollowerStore } from './library-follower.js';
import { useLibraryMemberRequestStore } from './library-member-request.js';
import { useLibraryMemberStore } from './library-member.js';
import { useLibraryPostStore } from './library-post.js';
import { useLibraryStore } from './library.js';
import { useLikeStore } from './like.js';
import { useMyCartStore } from './my-cart.js';
import { usePageTitleStore } from './page-title.js';
import { usePostStore } from './post.js';
import { useUserFollowerStore } from './user-follower.js';
import { useUserFollowingStore } from './user-following.js';
import { useUserPostStore } from './user-post.js';
import { useUserStore } from './user.js';
registerStores({
    auth: useAuthStore,
    block: useBlockStore,
    comment: useCommentStore,
    complain: useComplainStore,
    courseOrder: useCourseOrderStore,
    course: useCourseStore,
    follower: useFollowerStore,
    language: useLanguageStore,
    libraryBookIssue: useLibraryBookIssueStore,
    libraryBook: useLibraryBookStore,
    libraryFollower: useLibraryFollowerStore,
    libraryMemberRequest: useLibraryMemberRequestStore,
    libraryMember: useLibraryMemberStore,
    libraryPost: useLibraryPostStore,
    library: useLibraryStore,
    like: useLikeStore,
    myCart: useMyCartStore,
    pageTitle: usePageTitleStore,
    post: usePostStore,
    userFollower: useUserFollowerStore,
    userFollowing: useUserFollowingStore,
    userPost: useUserPostStore,
    user: useUserStore
});
export const pinia=createPinia();
export const stores=useStores(pinia);
export {useStores};
export function bindActions(stores){return Object.fromEntries(Object.entries(actions).map(([name,[owner,method]])=>[name,stores[owner][method].bind(stores[owner])]));}
export const storeActions=bindActions(stores);
export default stores;
