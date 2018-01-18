'use strict';

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

            console.log(window.formatter({
                method,
                status,
                url,
                duration
            }));
        });

        return send.apply(this, arguments);
    };

})(window.XMLHttpRequest);
