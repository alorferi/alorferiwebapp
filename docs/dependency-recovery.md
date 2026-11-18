# Dependency recovery record

> Historical Vue 2 recovery baseline. The approved Vue 3/Pinia/Vite migration
> supersedes this configuration; see [modernization.md](modernization.md) and
> the project README for current commands, versions and audit findings. Temporary
> backup locations below may no longer exist after the power interruption.

Verified on 18 November 2026, macOS Apple Silicon, Node 22.22.2 and npm 10.9.7.

## Subsequent UI migration

The application now uses Tailwind CSS 3.4 and shared Vue 2 dialogs, dropdowns,
and file pickers. Bootstrap, BootstrapVue, and direct jQuery/Popper imports and
dependencies have been removed. Application CSS uses PostCSS 8 through the
Webpack 4-compatible postcss-loader 4; CLI internals retain their own PostCSS 7.
The recovery checkpoint, dependency table, and audit findings below describe
the earlier recovery baseline. See the README for current UI verification.

## Source baseline

After refreshing origin, the latest application branch was `origin/feature/training`
at `35d6d1e` (30 June 2025). The user selected this baseline explicitly.
`master` was at `6fd6c69` (31 March 2024); the histories diverged, with two
master-only commits and seven training-only commits. The original dependency
manifests were identical on both branches.

The completed recovery branch is `recovery/training-dependencies-20261118`.
Its compatibility checkpoint is `dfccc25`. Application files under `src` match
`origin/feature/training` exactly, including its cart, careers links, contact
email, and slider changes. No application routes, UI, or business logic were
edited for recovery. Environment-file checksums were unchanged.

An initial recovery based on master remains on
`recovery/vue2-dependencies-20261117` at `49d5a29` for traceability.

## Compatibility changes

Forced audit remediation had introduced Vue 3-only Vuex and Portal Vue,
an incompatible ESLint integration, a Bootstrap Vue downgrade that lacked
the application's named imports, and downgrades of headful/i18n tooling.

| Package | Recovered resolution |
| --- | --- |
| Vue / Vue Template Compiler | 2.7.16 / 2.7.16, explicitly pinned |
| Vue Router / Vuex / Portal Vue | 3.6.5 / 3.6.2 / 2.1.7 |
| Bootstrap / Bootstrap Vue | 4.6.2 / 2.23.1 |
| CLI Service / Webpack | 4.5.19 / 4.47.0 |
| CLI Babel / ESLint plugins | 4.4.6 / 4.4.6 |
| ESLint / ESLint Plugin Vue / babel-eslint | 6.8.0 / 6.2.2 / 10.1.0 |
| Vue I18n / i18n CLI plugin | 8.28.2 / 2.3.2 |
| Vue Headful | 2.1.0 |
| Axios / Moment | 0.35.0 / 2.31.0, explicitly pinned |
| follow-redirects | 1.16.3 |

The lockfile was upgraded from format 1 to format 3. A second lockfile-only
installation pass filled missing optional fsevents dependency entries before
`npm ci` could succeed. No peer-dependency bypasses were used.

CLI Service 4 declares an optional Vue 3 SFC compiler peer. Declaring
`@vue/compiler-sfc@3.4.19` as a development dependency gives CLI tooling a
compatible compiler, while Vue 2 retains its own nested SFC compiler 2.7.16.
This tooling package was already present transitively in the original lockfile;
the application runtime remains Vue 2.

CLI Shared Utils pins Node IPC 9.2.2, whose declared engines exclude Node 22.
A scoped override selects `@achrinza/node-ipc@9.2.10`, which supports Node 22.

Webpack 4.47.0's own hashing works on Node 22, but Terser Webpack Plugin 1.x
hard-codes native MD4 for its disk cache. `vue.config.js` disables that cache
only in production. JavaScript minification remains enabled. Builds passed
without the OpenSSL legacy-provider flag or a global Node downgrade.

Compatible transitive security updates also select PostCSS 8.5.33, nanoid
3.3.20, source-map-js 1.2.2, cipher-base 1.0.7, elliptic 6.6.1, pbkdf2 3.1.7,
proxy-addr 2.0.8, sha.js 2.4.12, shell-quote 1.12.0, and websocket-driver 0.7.5.
These updates stay within existing parent dependency ranges.

## Verification

The final dependency installation completed successfully with normal package
lifecycle scripts. `YORKIE_SKIP_INSTALL=1` preserved existing Git hooks during
the recovery installation; other scripts were enabled.

| Check | Observed result |
| --- | --- |
| Clean `npm ci` | Passed |
| `npm ls --all` | Passed; no invalid dependency edges |
| `npm run lint -- --no-fix` | Passed |
| `npm run serve -- --host 127.0.0.1 --port 8080` | Compiled successfully |
| `npm run build` | Passed |
| Staging-mode production build | Passed; output written outside the repo |
| Browser smoke checks, development | 11 scenarios passed |
| Browser smoke checks, production | 11 scenarios passed |
| Production minimizer configuration | Minification enabled; MD4 disk cache disabled |
| Application source / environment preservation | Verified |

Browser checks used isolated Chrome profiles, mocked API responses, and blocked
external page requests. They covered fresh-session startup, public navigation
and history, English/Bengali switching and persistence, protected-route redirects,
login validation, course API/Vuex updates, OTC/password-reset store actions,
the latest branch's cart button/badge/duplicate prevention, Bootstrap modal
portals, authenticated store actions/session reload/logout, multipart upload
boundaries and authorization, and mobile/desktop navigation.

The successful-login checks exercised store actions with a fixture user loaded
first; they do not establish that a fresh-user login works against a real backend.
No live credentials, SMS messages, production uploads, or backend writes were used.
Live authentication, backend validation, image resizing, library operations,
course enrollment, and deployment history fallback still require staging checks
with the existing private API configuration.

Remaining observed warnings: large existing assets/bundles, outdated Browserslist
data, legacy Node deprecations, and a pre-existing missing `my-courses` i18n key
in authenticated navigation. Browser checks recorded no uncaught exceptions or
unknown-component/render errors. These warnings were not hidden by configuration.

Repeat core checks with:

```sh
npm ci
npm ls --all
npm run lint -- --no-fix
npm run build
npm run build -- --mode staging
npm run serve -- --host 127.0.0.1 --port 8080
```

The two build commands above both write `dist`; run them sequentially. Actual
staging deployment must supply its API configuration and SPA history fallback.

## Security status and remaining risks

Audit counts are registry snapshots, including inherited findings rather than
independent exploitable vulnerabilities. The final audits returned findings;
they were not reported as vulnerability-free.

| Dependency graph | Critical | High | Moderate | Low | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| Broken forced-upgrade tree, full | 9 | 40 | 57 | 9 | 115 |
| Recovered tree, full | 7 | 50 | 65 | 19 | 141 |
| Broken forced-upgrade tree, production | 2 | 3 | 0 | 4 | 9 |
| Recovered tree, production | 0 | 0 | 0 | 6 | 6 |

The full count rises because recovery restores the compatible legacy development
toolchain. Runtime-oriented audit severity improves, but the development graph
still requires modernization. Dependency classifications alone do not prove that
code is excluded from the browser bundle or that a finding is exploitable.

| Remaining risk / dependency path | Exposure and follow-up |
| --- | --- |
| Vue 2.7.16; inherited through Bootstrap Vue, Portal Vue, Vuex, headful, and uploader | Six production low findings inherit the Vue parser ReDoS advisory. Avoid untrusted runtime templates; plan Vue 3 migration. |
| Vue Template Compiler 2.7.16 | Moderate compiler XSS advisory remains. Review generated output and template trust boundaries; devDependency placement alone is not a mitigation. |
| CLI Service → HTML Webpack Plugin → loader-utils 0.2.x | Critical prototype-pollution finding plus inherited plugin/service findings. Do not process untrusted build inputs; replace the legacy build pipeline separately. |
| CLI Service → Webpack Bundle Analyzer → EJS 2.x | Critical template-injection finding inherited by analyzer. Keep build/analyzer tools private and templates trusted; replace tooling with modernization. |
| CLI Shared Utils → request → form-data 2.3.x | Critical multipart-boundary finding inherited by request. This is distinct from Axios's patched dependency chain and browser-native FormData. request pins an older minor line; do not force broad overrides. |
| Webpack Dev Server and remaining legacy transitive packages | High/moderate findings remain. Bind development to loopback, retain host checks, and avoid using development services as production hosting. |
| API-origin HTML rendered with `v-html` | Backend sanitization was not available to inspect. Verify stored-content sanitization in staging as a separate application/backend security task. |
| Browser OAuth client-secret configuration | Existing `VUE_APP_*` values are public. Check whether the legacy OAuth flow is active; rotate any real confidential credential and redesign that flow with the backend if needed. |

The seven full-graph critical entries are CLI Service, EJS, form-data,
HTML Webpack Plugin, loader-utils, request, and Webpack Bundle Analyzer;
several are inherited from the same underlying advisories.

References: [Vue parser advisory](https://github.com/advisories/GHSA-5j4c-8p2g-v4jx),
[compiler advisory](https://github.com/advisories/GHSA-g3ch-rx76-35fx),
[loader-utils advisory](https://github.com/advisories/GHSA-76p3-8jx3-jpfq),
[EJS advisory](https://github.com/advisories/GHSA-phwq-j96m-2c2q),
[form-data advisory](https://github.com/advisories/GHSA-fjxv-7rqg-78g4).

Reassess with `npm audit --json` and `npm audit --omit=dev --json`. Review each
advisory's actual path and exploit conditions. Do not run forced audit fixes or
replace the framework solely to lower an audit count during recovery.

## Rollback and local evidence

The original uncommitted manifests, original installed dependencies, patches,
environment checksums, audit reports, build logs, browser driver/results, and
screenshots are retained locally in:

```text
/tmp/alorferi-recovery-G1AnB9
```

This directory is temporary storage; copy it to a private durable location before
cleanup if it is needed later. It is not committed or uploaded.

To undo the security dependency step while retaining the latest application source
and compatibility configuration, first save any new local work. With a clean
working tree on the recovery branch:

```sh
git restore --source=dfccc25 --worktree -- package.json package-lock.json
npm ci
npm run lint -- --no-fix
npm run build
```

This deliberately reintroduces older Axios/Moment and transitive security risks;
use it for diagnosis and review the resulting diff before committing it.
The recovery branches and original upstream branches remain available; no branch
was pushed and no existing history was reset.

For forensic restoration of the exact pre-recovery installed state, the backup
contains `package.json`, `package-lock.json`, and `node_modules.before`. That state
was the broken forced-upgrade tree on master, not a recommended operating state.
Stop local servers and preserve current files before restoring any backup.

## Separate modernization roadmap

1. Add CI clean-install, lint, build, security reporting, and representative
   backend-backed browser checks. Validate a current supported Node 22 security patch.
2. Repair the existing Docker configuration: it uses obsolete Node 10 and a
   build context that lacks the manifests its Dockerfile copies.
3. Inventory unused/deprecated packages, then replace legacy metadata, select,
   autocomplete, upload, and date integrations with behavior checks.
4. Migrate Vue 2 to Vue 3 and Router 3 to Router 4 while preserving route/auth contracts.
5. Port the shared UI components to Vue 3, preserving accessibility and responsive
   layouts; replace PortalVue with Teleport where appropriate.
6. Move Vuex modules to Pinia incrementally, and migrate Vue CLI/Webpack to Vite
   in a separate change covering assets, locale loading, environment variables,
   source maps, and production history fallback.
7. Adopt maintained lint tooling and resolve OAuth/HTML sanitization with backend owners.

[Vue 2 is end-of-life](https://v2.vuejs.org/lts/) and
[Vue CLI is in maintenance mode](https://cli.vuejs.org/). This recovery restores
operation; it does not remove the need to replace the unsupported stack.
