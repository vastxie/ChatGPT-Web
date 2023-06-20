"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateCode(number = 6) {
    const random = String(Math.random()).split('.')[1];
    const code = random.slice(0, number);
    return code;
}
exports.default = generateCode;
//# sourceMappingURL=generateCode.js.map