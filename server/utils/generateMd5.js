"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
function generateMd5(str) {
    const md5 = crypto_1.default.createHash('md5').update(str).digest('hex');
    return md5;
}
exports.default = generateMd5;
//# sourceMappingURL=generateMd5.js.map