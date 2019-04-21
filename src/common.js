'use strict';

function now(d = new Date()) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${d.getMilliseconds()}`;
}

function formatter({ label, method, status, url, duration }) {
    return `[${now()}] ${label} ${method} ${status} ${url} [${duration}ms]`;
}

// Exports
if (typeof module === 'object' && module.exports) {
    module.exports = {
        formatter: formatter
    };
} else if (typeof define === 'function' && define.amd) {
    define(() => {
        return {
            formatter: formatter
        };
    });
} else {
    window.formatter = formatter;
}
