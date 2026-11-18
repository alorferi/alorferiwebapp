const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { spawnSync } = require('node:child_process');
const root=path.resolve(__dirname,'..');
const version=fs.readFileSync(path.join(root,'.nvmrc'),'utf8').trim().replace(/^v/,'');
let runtime=process.execPath;
if(process.versions.node!==version){
    const candidate=path.join(process.env.NVM_DIR||path.join(os.homedir(),'.nvm'),'versions','node','v'+version,'bin','node');
    if(fs.existsSync(candidate))runtime=candidate;
    else{console.error('This project requires Node '+version+'. Run nvm install && nvm use, then retry.');process.exit(1);}
}
const [tool,...args]=process.argv.slice(2);
const executables={vite:'node_modules/vite/bin/vite.js',eslint:'node_modules/eslint/bin/eslint.js',vitest:'node_modules/vitest/vitest.mjs',browser:'scripts/verify-ui.cjs',i18n:'scripts/i18n-report.js'};
let script=executables[tool]&&path.join(root,executables[tool]);
if(tool==='npm')script=path.join(path.dirname(runtime),'..','lib','node_modules','npm','bin','npm-cli.js');
if(!script){console.error('Unknown project tool: '+tool);process.exit(1);}
const result=spawnSync(runtime,[script,...args],{cwd:root,stdio:'inherit',env:{...process.env,PATH:path.dirname(runtime)+path.delimiter+process.env.PATH}});
if(result.error){console.error(result.error.message);process.exit(1);}process.exit(result.status??1);
