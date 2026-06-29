'use strict';

const { formatter } = require('./common');

(function (XMLHttpRequest) {
    const MAX_HTTP_METHOD_NAME = 6;
    const send = XMLHttpRequest.prototype.send;
    const open = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function () {
        const [method, url] = arguments;
        this.method = method;
        this.requestURL = url;
        return open.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function () {
        const self = this;
        const startRequestTime = Date.now();

        this.addEventListener('error', (err) => {
            console.error(err);
        });

        this.addEventListener('loadend', () => {
            const duration = Date.now() - startRequestTime;
            const url = self.requestURL;
            const status = self.statusText;
            const method = self.method.padEnd(MAX_HTTP_METHOD_NAME);

            console.log(
                formatter({
                    label: 'XMLHttpRequest',
                    method,
                    status,
                    url,
                    duration
                })
            );
        });

        return send.apply(this, arguments);
    };
})(window.XMLHttpRequest);

(function (fetch) {
    const MAX_HTTP_METHOD_NAME = 6;

    window.fetch = function (resource, init) {
        const startRequestTime = Date.now();
        const url = (resource && resource.url) || resource;
        const methodRaw =
            (init && init.method) || (resource && resource.method) || 'GET';
        const method = methodRaw.padEnd(MAX_HTTP_METHOD_NAME);

        return fetch.apply(this, arguments).then(
            (response) => {
                const duration = Date.now() - startRequestTime;

                console.log(
                    formatter({
                        label: 'Fetch',
                        method,
                        status: response.statusText,
                        url,
                        duration
                    })
                );

                return response;
            },
            (err) => {
                console.error(err);
                throw err;
            }
        );
    };
})(window.fetch);
