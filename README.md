# xhr-sniffer

<!-- prettier-ignore-start -->
[![node version](https://img.shields.io/node/v/xhr-sniffer.svg)](https://www.npmjs.com/package/xhr-sniffer)
[![npm version](https://badge.fury.io/js/xhr-sniffer.svg)](https://badge.fury.io/js/xhr-sniffer)
[![downloads count](https://img.shields.io/npm/dt/xhr-sniffer.svg)](https://www.npmjs.com/package/xhr-sniffer)
[![size](https://packagephobia.com/badge?p=xhr-sniffer)](https://packagephobia.com/result?p=xhr-sniffer)
[![license](https://img.shields.io/npm/l/xhr-sniffer.svg)](https://piecioshka.mit-license.org)
[![github-ci](https://github.com/piecioshka/xhr-sniffer/actions/workflows/testing.yml/badge.svg)](https://github.com/piecioshka/xhr-sniffer/actions/workflows/testing.yml)
<!-- prettier-ignore-end -->


🔨 Sniff HTTP requests making by XHR in the browser or HTTP module in Node.js

## Preview 🎉

<https://piecioshka.github.io/xhr-sniffer/demo/browser/>

## Features

- ✅ Display logs of `XMLHttpRequests` in DevTools Console
- ✅ Display logs of `http` module in `Node.js`
- ✅ Sniffing `Fetch API`

## Usage

Installation:

```bash
npm install xhr-sniffer
```

### Sniff requests in `Node.js`

```javascript
const xhrSniffer = require('xhr-sniffer');

xhrSniffer.install();

// do XHR requests

xhrSniffer.uninstall();
```

### Sniff requests in `browser`

Attach the bundled file in `<head>` tag:

```html
<script src="xhr-sniffer/dist/xhr-sniffer.browser.js"></script>
```

Next, make some XMLHttpRequests requests.

## License

[The MIT License](https://piecioshka.mit-license.org) @ 2026
