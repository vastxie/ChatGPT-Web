"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const api_1 = tslib_1.__importDefault(require("./api"));
const admin_1 = tslib_1.__importDefault(require("./admin"));
exports.default = (app) => {
    // 前端用户用的一些接口
    app.use('/api', [api_1.default]);
    // 管理后台用的一些接口
    app.use('/api/admin', [...admin_1.default]);
    return app;
};
//# sourceMappingURL=index.js.map