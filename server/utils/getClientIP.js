"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getClientIP(req) {
    let ip = req.headers['x-forwarded-for'] ||
        req.headers['x-real-ip'] ||
        req.headers['remote-host'] ||
        req.socket.remoteAddress || // 判断后端的 socket 的 IP
        req.ip ||
        '';
    if (ip) {
        ip = ip.replace('::ffff:', '');
    }
    return ip;
}
exports.default = getClientIP;
//# sourceMappingURL=getClientIP.js.map