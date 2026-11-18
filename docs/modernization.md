# Vue 3 modernization

Migration branch: `upgrade/vue3-vite-latest`, based on local merge `de3a5df`.
Versions were checked against stable npm releases on 18 November 2026. The
application design, route URLs, Laravel payloads and selected training baseline
remain the basis of this migration. No backend changes or deployment are included.

## Current versions

| Component | Version |
| --- | --- |
| Node / npm | 26.13.1 / 12.2.3 |
| Vue / SFC compiler | 3.5.45 / 3.5.45 |
| Vue Router / Pinia | 5.5.1 / 4.1.0 |
| Vue I18n | 11.4.22, composition mode |
| Vite / Vue plugin | 8.3.8 / 6.0.11 |
| Tailwind / Vite plugin | 4.3.5 / 4.3.5 |
| Axios / Moment | 1.21.1 / 2.31.0 |
| Font Awesome | 7.3.1, CSS icons |
| ESLint / Vue plugin | 10.15.0 / 10.12.1 |
| Vitest / Vue Test Utils / jsdom | 5.1.0 / 2.6.0 / 31.0.1 |

All direct dependency versions are pinned in package.json and the lockfile.
Moment remains because its current stable release supports existing date
behavior, including Bengali. Node is the current release line selected for this
upgrade; keep reviewing security patches and the Node release schedule.

## Changes

Vue 2, Vuex, Vue CLI/Webpack, Babel, PortalVue and unused legacy Vue plugins are
removed. All 23 actual domain modules are native Pinia stores with independent
state factories. Cross-store async actions capture their original store group,
while feed and detail generation guards continue rejecting stale responses.
Shared dialogs use Teleport, components emit Vue 3 model updates, and lifecycle
cleanup uses beforeUnmount. Browser fixtures mount native Vue 3 applications.

Axios is shared explicitly rather than injected by vue-axios. Pending auth
requests use AbortController. Both authentication flows preserve their existing
API contracts. The unused legacy client-secret OAuth action is removed; only a
whitelisted public API origin is injected into the build. Existing private env
files were left intact. Old Vue CLI base-URL configuration remains a fallback.

Vite replaces the CLI loaders and serves index.html from the repository root.
Tailwind 4 uses its Vite integration with the existing theme, breakpoints and
API color safelist. Component @apply styles reference the shared stylesheet.
ESLint uses a flat configuration. The Node wrapper accommodates nvm installations
when another Node executable appears first on PATH. Docker now builds from the
repository root and separates its node_modules from the host through a volume.

The browser test harness loads only in `browser-test` mode; production bundles
must not contain its global hooks. Its legacy assertion names are confined to a
test adapter and do not provide Vuex behavior to the application.

## Security status

The former recovery stack had 141 full-graph findings, including 7 critical
entries (see the historical record). Current audit: **9 high / 0 critical / 0 moderate / 0 low** in the full graph;
`--omit=dev` reports **8 high**. All remaining entries derive from the same
picomatch advisory. Vue Router declares tooling dependencies/peers, so npm still
classifies several tooling paths in the production graph.

Scoped overrides update js-beautify's glob to 14.0.6 and editorconfig's minimatch
to 11.0.9. These are test formatting dependencies; the DOM test runner and
formatted markup checks exercise their integration. No force fixes,
legacy-peer-deps or framework downgrades are used.

The stable picomatch 4.0.7 still has
[GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf), with **no
patched release** as of verification. Its audit chains include Vite, Vitest and
Vue Router's tooling integrations. The application does not accept visitor-supplied
glob patterns. It is deployed as static assets; do not expose the Vite development
server as production hosting. This is an unresolved upstream finding, not a claim
of a clean audit. Recheck when a patch is released.

## Verification

| Check | Result |
| --- | --- |
| Node 26.13.1/npm 12.2.3 clean `npm ci` | Passed; no peer bypasses |
| `npm ls --all` | Valid tree; no invalid or extraneous packages |
| `npm outdated --json` | `{}`; direct packages match stable latest |
| `npm run lint` | Passed |
| `npm test` | 10 tests passed across store/UI suites |
| `npm run i18n:report` | 190 English / 190 Bengali keys; parity and references passed |
| `npm run build` | Passed; main JS 424.54 kB / gzip 134.35 kB, no chunk-size warning |
| Development browser checks | 54 checks passed during migration; final 35-check smoke run with zero errors/warnings |
| Production-format browser suite | 54 checks passed; zero console errors/warnings |
| Staging-mode build | Passed; legacy API-origin fallback verified |
| Production bundle isolation | No browser-test hooks or client-secret fixture values |
| `git diff --check` | Passed |

Store tests cover state isolation, login/logout persistence, cart deduplication,
language restoration, concurrent page requests, explicit retry, stale responses
and cross-app async completion. UI tests cover Teleport, nested focus layers,
scroll restoration, busy dismissal and File v-model behavior. Browser checks
cover responsive English/Bengali layouts, auth cancellations, navigation, all
15 dialogs, all five file pickers, courses, library/profile editing, post
pagination and interactions. Screenshots were inspected for the home and feed.

Browser API calls are fixture-backed; this verifies frontend contracts and
behavior, not connectivity or live backend data. Docker is not installed on this
machine, so its updated configuration was reviewed but its image was not built.
VS Code launch configuration was updated and the Vite command was verified;
the editor debugger itself was not launched. npm 12 leaves the optional fsevents
install script blocked; filesystem watching and the build work without it.

## Rollback

The original merged Vue 2 source is preserved at `de3a5df` on local master.
For a separate diagnostic checkout, use a new worktree at that commit and its
Node 22.22.2/npm 10.9.7 toolchain. Do not reset this working tree or copy the old
node_modules across the two stacks. The old stack reintroduces its documented
security findings. No deployment is included in this migration.
