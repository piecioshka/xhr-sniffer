/* eslint-disable no-invalid-this */
'use strict';

const { formatter } = require('./common');

const MAX_HTTP_METHOD_NAME = 6;
const http = require('https');
const ORIGINAL_REQUEST = http.request;

// WARNING: https module use http

function sniffMethod(label, fn) {
    return (opts, callback) => {
        const req = fn.call(this, opts, (res) => {
            const startRequestTime = Date.now();

            res.on('end', () => {
                const duration = Date.now() - startRequestTime;
                const url = res.req.path;
                const status = res.statusMessage;
                const methodRaw = res.req.method || 'GET';
                const method = methodRaw.padEnd(MAX_HTTP_METHOD_NAME);

                console.log(formatter({
                    label,
                    method,
                    status,
                    url,
                    duration
                }));
            });

            if (callback) {
                return callback.apply(this, arguments);
            }
        });

        req.on('error', (err) => {
            console.error(err);
            throw new Error(err.message);
        });

        return req;
    };
}

module.exports = {
    install() {
        http.request = sniffMethod('http.request', http.request);
    },
    uninstall() {
        http.request = ORIGINAL_REQUEST;
    }
};
