"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const queue_1 = require("../queue");
async function scheduleToken() {
	const tokens = await models_1.tokenModel.getTokens({ page: 0, page_size: 100 }, {
		status: 1
	});
	const list = tokens.rows;
	list.forEach((item) => {
		queue_1.checkTokenQueue.addTask({
			...item.toJSON()
		});
	});
}
exports.default = scheduleToken;
//# sourceMappingURL=scheduleToken.js.map
