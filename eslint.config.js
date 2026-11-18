import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import globals from 'globals';
export default [
    {ignores:['dist/**','dist-browser/**','node_modules/**','coverage/**']},
    js.configs.recommended,
    ...vue.configs['flat/essential'],
    {files:['**/*.{js,cjs,vue}'],languageOptions:{globals:{...globals.browser,...globals.node,__ALORFERI_API_BASE_URL__:'readonly'}},rules:{'no-unused-vars':['error',{argsIgnorePattern:'^_',caughtErrors:'none',varsIgnorePattern:'^_'}],'vue/multi-word-component-names':'off','vue/no-mutating-props':['error',{shallowOnly:true}]}}
];
