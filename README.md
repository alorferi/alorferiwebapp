# alorferiwebapp

Library-based social network built with Vue 3, Pinia, Vue Router, Vite and Tailwind CSS 4.

## Run locally

Use Node **26.13.1** and npm **12.2.3**. With nvm:

```sh
nvm install
nvm use
npm install --global npm@12.2.3
npm ci
```

Copy `.env.example` to `.env` when setting up a new checkout and configure
`VITE_API_BASE_URL` with the API origin. Existing private `.env` files are preserved;
`VUE_APP_API_SERVER_BASE_URL` remains supported as a migration fallback.
API origins are public browser configuration. Never put credentials or client
secrets in frontend environment variables. Only the API origin is explicitly
injected by Vite; unused legacy OAuth client configuration is no longer bundled.

```sh
npm run serve
```

Open http://127.0.0.1:8080. VS Code's **Run app (Vue 3 + Vite + Chrome)** starts
that server and opens the debugger. Ports are strict: stop the server already
using 8080 or choose another port explicitly:

```sh
npm run serve -- --port 8082
```

Project scripts select the exact `.nvmrc` runtime from nvm when an older Node
appears first on PATH. For installation or audit commands in such a shell, use
`node scripts/toolchain.cjs npm ci` or `node scripts/toolchain.cjs npm audit`.
The wrapper does not download or change a system runtime.

## Build and check

```sh
npm run lint
npm test
npm run i18n:report
npm run build
npm run preview
```

The production build is in `dist`; preview uses http://127.0.0.1:4173.
Production hosting must serve `index.html` for application history URLs such as
`/courses` and `/libraries/123`. Serve real missing asset/API requests normally.
Minimum supported browsers: Chrome/Edge 111, Safari 16.4 and Firefox 128.

The full browser regression suite uses isolated Chrome and intercepted API
fixtures. It never submits fixture data to the real API. Start the dedicated
browser-test mode first; its test hooks are excluded from normal builds:

```sh
npm run serve -- --mode browser-test --port 8082
# In another terminal:
npm run test:browser -- http://127.0.0.1:8082 /tmp/alorferi-ui-results.json
```

Set `CHROME_BIN` if Chrome is installed elsewhere. `UI_SMOKE_ONLY=1` skips the
longer authentication scenarios. Production-format browser verification can use
`npm run build -- --mode browser-test --outDir /tmp/alorferi-browser-dist`, then
`npm run preview -- --outDir /tmp/alorferi-browser-dist --port 4174` and the same
browser runner against 4174. Deploy only the normal `npm run build` output.

## Styling and state

Tailwind runs through its Vite plugin. Shared tokens and API-supplied color
safelists are in `src/styles/tailwind.css`; component styles using `@apply`
reference that stylesheet. Shared dialogs use native Vue Teleport and Vue 3
`v-model`; dropdowns and file pickers are in `src/components/ui`.

The 23 native Pinia domain stores live in `src/store`. Components use their
state and actions directly through `$stores`; `$actions` binds the few dynamic
action names used by shared lists and upload dialogs. Vuex and PortalVue are
removed. API calls share `src/api.js`; authentication requests use AbortController.
English and Bengali messages are explicit imports; `i18n:report` checks parity
and literal translation references without the obsolete Vue CLI plugin.

## Docker development

```sh
docker compose up --build
```

The development image uses Node 26.13.1/npm 12.2.3, installs with `npm ci`, and
serves on http://127.0.0.1:8081. Its named volume keeps Linux dependencies separate
from host `node_modules`. After lockfile changes run
`docker compose run --rm vueapp npm ci` and restart the service. The existing
external `alorferiwebapp_default` network must exist; its configured static IP
must be available.

See [the modernization record](docs/modernization.md) for versions, verification,
remaining upstream audit findings and rollback. The earlier
[dependency recovery record](docs/dependency-recovery.md) is historical.
