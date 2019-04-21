'use strict';

require('../../src/server').install();

// const request = require('http').request;
// const PORT = 80;
const request = require('https').request;
const PORT = 443;

function makeRequest() {
    const options = {
        hostname: 'example.org',
        port: PORT,
        method: 'GET',
        path: '/'
    };

    const req = request(options, (res) => {
        res.on('data', () => null);
    });

    req.end();
}

makeRequest();
