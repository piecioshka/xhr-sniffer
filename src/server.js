'use strict';

const { formatter } = require('./common');

const MAX_HTTP_METHOD_NAME = 6;
const http = require('http');
const ORIGINAL_REQUEST = http.request;

// WARNING: https module use http

function sniffMethod(label, fn) {
    return function (opts, callback) {
        const self = this;
        const req = fn.call(self, opts, function (res) {
            const startRequestTime = Date.now();

            res.on('end', () => {
                const duration = Date.now() - startRequestTime;
                const url = res.req.path;
                const status = res.statusMessage;
                const method = res.req.method.padEnd(MAX_HTTP_METHOD_NAME);

                console.log(formatter({
                    method,
                    status,
                    url,
                    duration
                }));


                if (callback) {
                    return callback.apply(self, arguments);
                }
            });

        });

        req.on('error', (err) => {
            console.error(err);
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
