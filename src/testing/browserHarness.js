// Loaded only by Vite's browser-test mode. Normal production builds omit this module.
import { createApp, h } from 'vue';
import { createPinia } from 'pinia';
import { useStores, bindActions } from '@/store';
import { getters, mutations, actions } from '@/store/owners';
import mixin from '@/mixin';
import api from '@/api';
import { apiBaseUrl } from '@/config/runtime';
import UiModal from '@/components/ui/UiModal.vue';
import UiDropdown from '@/components/ui/UiDropdown.vue';
import UiFileInput from '@/components/ui/UiFileInput.vue';
import AlertMessageModal from '@/components/AlertMessageModal.vue';
import AskForOtcModal from '@/components/AskForOtcModal.vue';
import LoadingModal from '@/components/LoadingModal.vue';
import CreateBlockModal from '@/views/complain/CreateBlockModal.vue';
import CreateReportModal from '@/views/complain/CreateReportModal.vue';
import LibraryFollowersModal from '@/views/follower/LibraryFollowersModal.vue';
import UserFollowersModal from '@/views/follower/UserFollowersModal.vue';
import UserFollowingListModal from '@/views/follower/UserFollowingListModal.vue';
import UploadLibraryCoverModal from '@/views/library/UploadLibraryCoverModal.vue';
import UploadLibraryLogoModal from '@/views/library/UploadLibraryLogoModal.vue';
import CreateLibraryMemberRequestModal from '@/views/librarymember/CreateLibraryMemberRequestModal.vue';
import CreateOrEditPostModal from '@/views/post/CreateOrEditPostModal.vue';
import PostLikesModal from '@/views/postlike/PostLikesModal.vue';
import UploadMyCoverModal from '@/views/user/UploadMyCoverModal.vue';
import UploadMyPhotoModal from '@/views/user/UploadMyPhotoModal.vue';
import CreatePostComment from '@/views/postcomment/CreatePostComment.vue';
const fixtures={AlertMessageModal,AskForOtcModal,LoadingModal,CreateBlockModal,CreateReportModal,LibraryFollowersModal,UserFollowersModal,UserFollowingListModal,UploadLibraryCoverModal,UploadLibraryLogoModal,CreateLibraryMemberRequestModal,CreateOrEditPostModal,PostLikesModal,UploadMyCoverModal,UploadMyPhotoModal,CreatePostComment};
function storeDriver(stores){
    const values={};for(const [name,[owner,field]] of Object.entries(getters))Object.defineProperty(values,name,{get:()=>JSON.parse(JSON.stringify(stores[owner][field]??null)),enumerable:true});
    return {getters:values,commit(name,payload){const [owner,method]=mutations[name];return stores[owner][method](payload);},dispatch(name,payload){const [owner,method]=actions[name];return Promise.resolve(stores[owner][method](payload));}};
}
export function installBrowserHarness(app,context){
    const mounted=new Set();let fixtureApp,fixtureContainer,nestedApp,nestedContainer;
    const harness={app:null,components:()=>[...mounted],driver:storeDriver(context.stores)};
    app.config.globalProperties.$testStore=harness.driver;
    app.mixin({mounted(){mounted.add(this);if(this.$root===this)harness.app=this;},beforeUnmount(){mounted.delete(this);}});
    function configure(testApp,pinia,stores){
        testApp.use(pinia);testApp.use(context.router);testApp.use(context.i18n);testApp.mixin(mixin);
        testApp.component('UiModal',UiModal);testApp.component('UiDropdown',UiDropdown);testApp.component('UiFileInput',UiFileInput);
        Object.assign(testApp.config.globalProperties,{$stores:stores,$actions:bindActions(stores),$axios:api,$http:api,$apiServerBaseUrl:apiBaseUrl});
    }
    harness.disposeNested=()=>{if(nestedApp)nestedApp.unmount();if(nestedContainer)nestedContainer.remove();nestedApp=nestedContainer=null;window.qaNested=null;};
    harness.disposeFixture=()=>{harness.disposeNested();if(fixtureApp)fixtureApp.unmount();if(fixtureContainer)fixtureContainer.remove();fixtureApp=fixtureContainer=null;window.qaHost=null;};
    harness.mountFixture=(name,props={},binding='show',event='updateVisibleState')=>{
        harness.disposeFixture();window.qaCalls=[];window.qaHold=false;window.qaFail=false;window.qaResolve=null;
        const pinia=createPinia(),stores=useStores(pinia);
        for(const [domain,store] of Object.entries(stores))store.$patch(JSON.parse(JSON.stringify(context.stores[domain].$state)));
        stores.complain.complainTypesResponse={data:['Spam','Abuse']};
        for(const [name,[owner,method]] of Object.entries(actions))stores[owner][method]=payload=>{
            const form=payload&&(payload.formData||payload.payload&&payload.payload.formData);
            window.qaCalls.push({type:name,keys:form?[...form.keys()]:payload?Object.keys(payload):[]});
            if(window.qaFail)return Promise.reject({response:{data:{message:'Fixture request failed.'}}});
            if(window.qaHold)return new Promise(resolve=>{window.qaResolve=resolve;});
            return Promise.resolve({data:{data:{attributes:{id:1}}}});
        };
        const component=fixtures[name];if(!component)throw new Error('Unknown fixture component '+name);
        const eventKey='on'+event[0].toUpperCase()+event.slice(1);
        fixtureApp=createApp({data(){return {open:false};},render(){return h('div',[
            h('button',{id:'qa-open',onClick:()=>this.open=true},'Open '+name),
            h(component,{ref:'subject',...props,[binding]:this.open,[eventKey]:value=>this.open=value,onOnClickOk:()=>{},onOnClickCancel:()=>{}})
        ]);}});
        configure(fixtureApp,pinia,stores);fixtureContainer=document.createElement('div');document.getElementById('app').appendChild(fixtureContainer);
        window.qaHost=fixtureApp.mount(fixtureContainer);document.getElementById('qa-open').focus();document.getElementById('qa-open').click();
    };
    harness.mountNested=()=>{
        harness.disposeNested();nestedApp=createApp({data(){return {open:true};},render(){return h(UiModal,{modelValue:this.open,title:'Nested confirmation',centered:true,closeOnConfirm:true,'onUpdate:modelValue':value=>this.open=value},{default:()=>h('button','Nested action')});}});
        configure(nestedApp,context.pinia,context.stores);nestedContainer=document.createElement('div');document.getElementById('app').appendChild(nestedContainer);window.qaNested=nestedApp.mount(nestedContainer);
    };
    window.__ALORFERI_TEST__=harness;
    window.qaMount=(...args)=>harness.mountFixture(...args);
}
