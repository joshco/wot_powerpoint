"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var TD = require("@node-wot/td-tools");
var http_server_1 = require("./http-server");
exports.HttpServer = http_server_1.default;
var http_client_1 = require("./http-client");
exports.HttpClient = http_client_1.default;
var http_client_factory_1 = require("./http-client-factory");
exports.HttpClientFactory = http_client_factory_1.default;
var https_client_factory_1 = require("./https-client-factory");
exports.HttpsClientFactory = https_client_factory_1.default;
__export(require("./http-server"));
__export(require("./http-client"));
__export(require("./http-client-factory"));
__export(require("./https-client-factory"));
var HttpForm = (function (_super) {
    __extends(HttpForm, _super);
    function HttpForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HttpForm;
}(TD.Form));
exports.HttpForm = HttpForm;
var HttpHeader = (function () {
    function HttpHeader() {
    }
    return HttpHeader;
}());
exports.HttpHeader = HttpHeader;
//# sourceMappingURL=http.js.map