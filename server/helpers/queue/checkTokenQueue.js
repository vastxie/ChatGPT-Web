"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// 检查key 是否正常
// import { payModels } from '../../models';
// import { wxPayClose } from '../request/wx_api';
const models_1 = require("../../models");
const utils_1 = require("../../utils");
const function_1 = tslib_1.__importDefault(require("./function"));
const CheckTokenQueue = (0, function_1.default)('CheckTokenQueue');
// 向队列新增
async function addTask(data, options) {
	const res = await CheckTokenQueue.add(data, options);
	return res;
}
// 消费
CheckTokenQueue.process(async (job) => {
	const { id, key, host } = job.data;
	const check = await (0, utils_1.getKeyUsage)(host, key);
	let status = 1;
	const limit = Number(check.hard_limit_usd);
	const usage = Number(check.total_usage);
	console.log(limit, usage);
	if (check.status) {
		status = 0;
	}
	if (limit <= usage) {
		status = 0;
	}
	await models_1.tokenModel.editToken(id, {
		limit,
		usage,
		status
	});
	return;
});
exports.default = {
	addTask
};
//# sourceMappingURL=checkTokenQueue.js.map
