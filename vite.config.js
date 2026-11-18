import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';
export default defineConfig(({mode})=>{
    const env=loadEnv(mode,process.cwd(),'');
    return {
        plugins:[vue(),tailwindcss()],
        resolve:{alias:{'@':fileURLToPath(new URL('./src',import.meta.url))},extensions:['.mjs','.js','.json','.vue']},
        envPrefix:'VITE_PUBLIC_',
        define:{__ALORFERI_API_BASE_URL__:JSON.stringify(env.VITE_API_BASE_URL||env.VUE_APP_API_SERVER_BASE_URL||'')},
        server:{host:'127.0.0.1',port:8080,strictPort:true},
        preview:{host:'127.0.0.1',port:4173,strictPort:true},
        build:{target:['chrome111','edge111','firefox128','safari16.4'],outDir:'dist'},
        test:{environment:'jsdom',include:['tests/**/*.test.js'],restoreMocks:true,clearMocks:true}
    };
});
