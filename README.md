# xhr-sniffer

<!-- prettier-ignore-start -->

[![node version](https://img.shields.io/node/v/xhr-sniffer.svg)](https://www.npmjs.com/package/xhr-sniffer)
[![npm version](https://badge.fury.io/js/xhr-sniffer.svg)](https://badge.fury.io/js/xhr-sniffer)
[![downloads count](https://img.shields.io/npm/dt/xhr-sniffer.svg)](https://www.npmjs.com/package/xhr-sniffer)
[![size](https://packagephobia.com/badge?p=xhr-sniffer)](https://packagephobia.com/result?p=xhr-sniffer)
[![license](https://img.shields.io/npm/l/xhr-sniffer.svg)](https://piecioshka.mit-license.org)
[![github-ci](https://github.com/piecioshka/xhr-sniffer/actions/workflows/testing.yml/badge.svg)](https://github.com/piecioshka/xhr-sniffer/actions/workflows/testing.yml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

<!-- prettier-ignore-end -->

🔨 Sniff HTTP requests made by `XMLHttpRequest` / `Fetch API` in the browser or the `http`/`https` module in Node.js

## Preview 🎉

<https://piecioshka.github.io/xhr-sniffer/demo/browser/>

Every intercepted request is logged to the console in a single, consistent line:

```text
[2026-06-29 13:25:41.812] XMLHttpRequest GET    OK https://example.org/ [128ms]
[2026-06-29 13:25:42.004] Fetch          POST   OK https://example.org/api [73ms]
[2026-06-29 13:25:42.310] http.request   GET    OK /                     [54ms]
```

Each line contains:

- a timestamp (`YYYY-MM-DD HH:mm:ss.SSS`),
- the source label (`XMLHttpRequest`, `Fetch` or `http.request`),
- the HTTP method (padded to 6 characters),
- the response status text,
- the request URL (or path in Node.js),
- the request duration in milliseconds.

## Features

- ✅ Logs `XMLHttpRequest` calls in the DevTools console
- ✅ Logs `Fetch API` calls in the DevTools console
- ✅ Logs `http` / `https` module calls in Node.js
- ✅ Zero runtime dependencies
- ✅ Reversible in Node.js — `install()` / `uninstall()`

## How it works

The library monkey-patches the relevant network primitives so that every request
flows through a logging wrapper before the original implementation runs.

| Environment | Patched APIs                                                       |
| ----------- | ------------------------------------------------------------------ |
| Browser     | `XMLHttpRequest.prototype.open` / `send`, `window.fetch`           |
| Node.js     | `https.request` (the `http` module routes through `https` as well) |

The original behaviour is preserved — the wrappers only observe and log, then
delegate to the native call.

## Installation

```bash
npm install xhr-sniffer
```

## Usage

### Sniff requests in Node.js

Calling `install()` patches `https.request`. Use `uninstall()` to restore the
original implementation when you no longer need the logs.

```javascript
const xhrSniffer = require('xhr-sniffer');

xhrSniffer.install();

// ...perform your HTTP requests...

xhrSniffer.uninstall();
```

Example with the native `https` module:

```javascript
const xhrSniffer = require('xhr-sniffer');
const { request } = require('https');

xhrSniffer.install();

request({ hostname: 'example.org', path: '/', method: 'GET' }, (res) => {
    res.on('data', () => {});
}).end();
```

> [!NOTE]
> The Node.js entry point patches `https.request`. Plain `http://` requests
> made through the `http` module are not intercepted — use `https` (see the
> `WARNING` note in [`src/server.js`](src/server.js)).

### Sniff requests in the browser

Build the browser bundle (or use the one published in the package) and attach it
in the `<head>` so it patches the network APIs before your application runs:

```html
<script src="xhr-sniffer/dist/xhr-sniffer.browser.js"></script>
```

After that, any `XMLHttpRequest` or `fetch()` call is logged automatically. The
browser build patches the globals on load — there is no `install()` step.

## API

### Node.js

| Method        | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| `install()`   | Patches `https.request` and starts logging requests.         |
| `uninstall()` | Restores the original `https.request`, stopping the logging. |

### Browser

The browser bundle patches `XMLHttpRequest` and `window.fetch` automatically on
load; it exposes no public API.

## Development

```bash
npm install        # install dependencies
npm run build      # bundle the browser build into dist/ via esbuild
npm test           # run the unit tests (vitest)
npm run coverage   # run the tests with a coverage report
npm run lint       # lint src/ and demo/ with eslint
```

The demos under [`demo/`](demo/) are good entry points:

- [`demo/browser/`](demo/browser/) — open `index.html` in a browser.
- [`demo/server/native.js`](demo/server/native.js) — `https` module example.
- [`demo/server/lib-fetch.js`](demo/server/lib-fetch.js) — `node-fetch` example.

## License

[The MIT License](https://piecioshka.mit-license.org) @ 2026
