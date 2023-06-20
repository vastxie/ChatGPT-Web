"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const formatTime_1 = tslib_1.__importDefault(require("./formatTime"));
async function getKeyUsage(url, key) {
    const subscriptionUrl = `${url}/v1/dashboard/billing/subscription`;
    const subscriptionRes = await (0, node_fetch_1.default)(subscriptionUrl, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + key
        }
    });
    if (subscriptionRes.status !== 200) {
        return {
            status: subscriptionRes.status,
            hard_limit_usd: 0,
            total_usage: 0
        };
    }
    const data = await subscriptionRes.json();
    const hard_limit_usd = data?.hard_limit_usd || 0;
    const now = new Date();
    const usageUrl = `${url}/v1/dashboard/billing/usage`;
    let startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    const endDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const subDate = new Date(now);
    subDate.setDate(1);
    if (hard_limit_usd > 20) {
        startDate = subDate;
    }
    if (data?.has_payment_method) {
        const day = now.getDate(); // 本月过去的天数
        startDate = new Date(now.getTime() - (day - 1) * 24 * 60 * 60 * 1000); // 本月第一天
    }
    const usageres = await (0, node_fetch_1.default)(`${usageUrl}?start_date=${(0, formatTime_1.default)('yyyy-MM-dd', new Date(startDate))}&end_date=${(0, formatTime_1.default)('yyyy-MM-dd', new Date(endDate))}`, {
        headers: {
            Authorization: 'Bearer ' + key
        }
    });
    let total_usage = 0;
    if (usageres.status === 200) {
        const usageData = await usageres.json();
        total_usage = usageData.total_usage ? (usageData.total_usage / 100).toFixed(2) : 0;
    }
    return {
        status: 0,
        hard_limit_usd,
        total_usage
    };
}
exports.default = getKeyUsage;
//# sourceMappingURL=getKeyUsage.js.map