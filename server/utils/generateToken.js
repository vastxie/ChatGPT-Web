"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
function generateToken(info, secret = 'chatgpt') {
    const timestamp = Date.now().toString(); // 可以使用可读性更高的日期字符串
    const str = JSON.stringify(info) + timestamp + secret;
    const sha256 = crypto_1.default.createHash('sha256').update(str).digest('hex');
    const md5 = crypto_1.default.createHash('md5').update(sha256).digest('hex');
    return md5;
}
exports.default = generateToken;
//# sourceMappingURL=generateToken.js.map