import { getActivePinia } from 'pinia';
let definitions={};
const instances=new WeakMap();
export function registerStores(next){definitions=next;}
export function useStores(pinia=getActivePinia()){
    if(!pinia)throw new Error('Pinia must be installed before accessing application stores');
    if(!instances.has(pinia)){
        const stores={};instances.set(pinia,stores);
        for(const [name,defineStore] of Object.entries(definitions))stores[name]=defineStore(pinia);
    }
    return instances.get(pinia);
}
