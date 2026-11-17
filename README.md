# alorferiwebapp

## Project setup

Use Node.js **22.22.2** and npm **10.9.7** for the recovered dependency baseline.
If you use nvm, run `nvm use` to select the version in `.nvmrc`.

```
npm ci
```

Provide your existing private API configuration in the ignored `.env` file or
through your deployment environment; `.env.example` lists the required keys.
Every `VUE_APP_*` value is public in the browser bundle, so do not use these
variables for confidential credentials.

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

For verification without rewriting source files:

```
npm run lint -- --no-fix
```

### Dependency recovery and security

The application retains Vue 2, Vue Router 3, Vuex 3, Bootstrap Vue 2, and Vue CLI 4.
Install from the committed lockfile and review dependency updates individually.
Do not use `npm audit fix --force` or permanent peer-dependency bypasses.

See [the recovery record](docs/dependency-recovery.md) for the compatibility
adjustments, verification results, remaining security risks, rollback procedure,
and separate modernization roadmap.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
