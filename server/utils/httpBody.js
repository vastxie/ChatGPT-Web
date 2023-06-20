"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function httpBody(code, ...rest) {
    const body = {
        code,
        data: [],
        message: ''
    };
    if (rest.length === 1 && typeof rest[0] === 'string') {
        body.message = rest[0];
    }
    else if (rest.length === 2 && typeof rest[0] !== 'string' && typeof rest[1] === 'string') {
        body.data = rest[0];
        body.message = rest[1];
    }
    else if (rest.length === 1 && typeof rest[0] !== 'string') {
        body.data = rest[0];
    }
    return body;
}
exports.default = httpBody;
//# sourceMappingURL=httpBody.js.map