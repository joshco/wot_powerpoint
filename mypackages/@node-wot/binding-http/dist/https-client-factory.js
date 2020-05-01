"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_client_1 = require("./http-client");
var HttpsClientFactory = (function () {
    function HttpsClientFactory(config) {
        if (config === void 0) { config = null; }
        this.scheme = "https";
        this.config = null;
        this.config = config;
    }
    HttpsClientFactory.prototype.getClient = function () {
        if (this.config.proxy && this.config.proxy.href && this.config.proxy.href.startsWith("http:")) {
            console.warn("HttpsClientFactory creating client for 'http' due to insecure proxy configuration");
            return new http_client_1.default(this.config);
        }
        else {
            console.log("HttpsClientFactory creating client for '" + this.scheme + "'");
            return new http_client_1.default(this.config, true);
        }
    };
    HttpsClientFactory.prototype.init = function () {
        return true;
    };
    HttpsClientFactory.prototype.destroy = function () {
        return true;
    };
    return HttpsClientFactory;
}());
exports.default = HttpsClientFactory;
//# sourceMappingURL=https-client-factory.js.map