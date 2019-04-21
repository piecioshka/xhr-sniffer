'use strict';

require('../../src/server').install();

const nFetch = require('node-fetch');

function makeRequest() {
    nFetch('https://example.org/');
}

makeRequest();
