"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/common.js
  var require_common = __commonJS({
    "src/common.js"(exports, module) {
      "use strict";
      function now(d = /* @__PURE__ */ new Date()) {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const hours = String(d.getHours()).padStart(2, "0");
        const minutes = String(d.getMinutes()).padStart(2, "0");
        const seconds = String(d.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${d.getMilliseconds()}`;
      }
      function formatter2({ label, method, status, url, duration }) {
        return `[${now()}] ${label} ${method} ${status} ${url} [${duration}ms]`;
      }
      module.exports = {
        formatter: formatter2
      };
    }
  });

  // src/browser.js
  var { formatter } = require_common();
  (function(XMLHttpRequest) {
    const MAX_HTTP_METHOD_NAME = 6;
    const send = XMLHttpRequest.prototype.send;
    const open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
      const [method, url] = arguments;
      this.method = method;
      this.requestURL = url;
      return open.apply(this, arguments);
    };
    XMLHttpRequest.prototype.send = function() {
      const self = this;
      const startRequestTime = Date.now();
      this.addEventListener("error", (err) => {
        console.error(err);
      });
      this.addEventListener("loadend", () => {
        const duration = Date.now() - startRequestTime;
        const url = self.requestURL;
        const status = self.statusText;
        const method = self.method.padEnd(MAX_HTTP_METHOD_NAME);
        console.log(formatter({
          label: "XMLHttpRequest",
          method,
          status,
          url,
          duration
        }));
      });
      return send.apply(this, arguments);
    };
  })(window.XMLHttpRequest);
})();
