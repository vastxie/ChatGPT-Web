"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function filterObjectNull(obj) {
    const params = Object.keys(obj)
        .filter((key) => obj[key] !== '' && obj[key] !== null && obj[key] !== undefined)
        .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});
    return { ...params };
}
exports.default = filterObjectNull;
//# sourceMappingURL=filterObjectNull.js.map