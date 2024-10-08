# xhr-sniffer

[![node version](https://img.shields.io/node/v/xhr-sniffer.svg)](https://www.npmjs.com/package/xhr-sniffer)
[![npm version](https://badge.fury.io/js/xhr-sniffer.svg)](https://badge.fury.io/js/xhr-sniffer)
[![downloads count](https://img.shields.io/npm/dt/xhr-sniffer.svg)](https://www.npmjs.com/package/xhr-sniffer)
[![license](https://img.shields.io/npm/l/xhr-sniffer.svg)](https://www.npmjs.com/package/xhr-sniffer)
[![github-ci](https://github.com/piecioshka/xhr-sniffer/actions/workflows/testing.yml/badge.svg)](https://github.com/piecioshka/xhr-sniffer/actions/workflows/testing.yml)

:hammer: Sniff HTTP requests making by XHR in the browser or HTTP module in Node.js

## Preview 🎉

<https://piecioshka.github.io/xhr-sniffer/demo/browser/>

## Features

* :white_check_mark: Display logs of `XMLHttpRequests` in DevTools Console
* :white_check_mark: Display logs of `http` module in `Node.js`
* :no_entry: Sniffing `Fetch API`

## Install

```bash
npm install xhr-sniffer
```

## Usage

### Sniff requests in `Node.js`

```javascript
const xhrSniffer = require('xhr-sniffer');

xhrSniffer.install();

// do XHR requests

xhrSniffer.uninstall();
```

### Sniff requests in `browser`

Attach files in `<head>` tag:

```html
<script src="xhr-sniffer/src/common.js"></script>
<script src="xhr-sniffer/src/browser.js"></script>
```

Next, make some XMLHttpRequests requests.

## Unit tests

```bash
npm test
```

## Code coverage

```bash
npm run coverage
```

## License

[The MIT License](http://piecioshka.mit-license.org) @ 2018
