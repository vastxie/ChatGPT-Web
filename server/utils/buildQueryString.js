"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buildQueryString(params) {
    return Object.keys(params)
        .map(function (key) {
        return key + '=' + params[key];
    })
        .join('&');
}
exports.default = buildQueryString;
//# sourceMappingURL=buildQueryString.js.map