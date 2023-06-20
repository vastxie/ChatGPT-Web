"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ksort(obj) {
    const keys = Object.keys(obj).sort();
    const sortedObj = {};
    for (let i = 0; i < keys.length; i++) {
        sortedObj[keys[i]] = obj[keys[i]];
    }
    return sortedObj;
}
exports.default = ksort;
//# sourceMappingURL=ksort.js.map