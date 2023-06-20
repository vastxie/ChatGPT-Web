"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const redis_1 = tslib_1.__importDefault(require("../helpers/redis"));
const utils_1 = require("../utils");
const verifyPath = [
    'post:/api/login',
    'get:/api/send_sms',
    'get:/api/pay/notify',
    'post:/api/pay/notify',
    'get:/api/config',
];
// 校验
async function verify(req, res, next) {
    const { token } = req.headers;
    const { path, method } = req;
    const filter = verifyPath.filter((router) => router.toUpperCase() === `${method}:${path}`.toUpperCase());
    if (filter.length || path.indexOf('/api') === -1) {
        await next();
        return;
    }
    const redisTokenKey = `token:${token}`;
    let tokenInfo = (await redis_1.default.select(1).get(redisTokenKey)) || null;
    if (tokenInfo) {
        // 当前为前端用户登陆
        try {
            tokenInfo = JSON.parse(tokenInfo);
        }
        catch (e) {
            redis_1.default.select(1).del(redisTokenKey);
            res.status(401).json((0, utils_1.httpBody)(-1, 'token失效'));
            return;
        }
    }
    else {
        res.status(401).json((0, utils_1.httpBody)(-1, '请登陆'));
        return;
    }
    // 在加一层是否访问的后端接口
    if (path.indexOf('/api/admin') !== -1 && tokenInfo?.role !== 'administrator') {
        res.status(403).json((0, utils_1.httpBody)(-1, '拒绝访问'));
        return;
    }
    req.user_id = tokenInfo?.id;
    next();
}
exports.default = verify;
//# sourceMappingURL=verify.js.map