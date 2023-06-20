"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bull_1 = tslib_1.__importDefault(require("bull"));
const config_1 = tslib_1.__importDefault(require("../../config"));
function createQueue(queueName) {
    return new bull_1.default(queueName, {
        redis: {
            ...config_1.default.getConfig('redis_config'),
            db: 11
        },
        defaultJobOptions: {
            removeOnComplete: false,
            removeOnFail: false,
        }
    });
}
exports.default = createQueue;
//# sourceMappingURL=function.js.map