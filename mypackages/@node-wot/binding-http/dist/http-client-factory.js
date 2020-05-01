"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_client_1 = require("./http-client");
var HttpClientFactory = (function () {
    function HttpClientFactory(config) {
        if (config === void 0) { config = null; }
        this.scheme = "http";
        this.config = null;
        this.config = config;
    }
    HttpClientFactory.prototype.getClient = function () {
        if (this.config && this.config.proxy && this.config.proxy.href && this.config.proxy.href.startsWith("https:")) {
            console.warn("HttpClientFactory creating client for 'https' due to secure proxy configuration");
            return new http_client_1.default(this.config, true);
        }
        else {
            console.log("HttpClientFactory creating client for '" + this.scheme + "'");
            return new http_client_1.default(this.config);
        }
    };
    HttpClientFactory.prototype.init = function () {
        return true;
    };
    HttpClientFactory.prototype.destroy = function () {
        return true;
    };
    return HttpClientFactory;
}());
exports.default = HttpClientFactory;
//# sourceMappingURL=http-client-factory.js.map