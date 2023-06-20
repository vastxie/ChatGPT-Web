"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalScheduleJobs = void 0;
const tslib_1 = require("tslib");
const node_schedule_1 = tslib_1.__importDefault(require("node-schedule"));
const scheduleCarmi_1 = tslib_1.__importDefault(require("./scheduleCarmi"));
const scheduleToken_1 = tslib_1.__importDefault(require("./scheduleToken"));
// 每分钟的第30秒触发： '30 * * * * *'
// 每小时的1分30秒触发 ：'30 1 * * * *'
// 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
// 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
// 2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'
// 每周1的1点1分30秒触发 ：'30 1 1 * * 1'
const globalScheduleJobs = () => {
	node_schedule_1.default.scheduleJob({ second: 1, minute: 0, hour: 0 }, (date) => {
		// 这里执行相关逻辑
		(0, scheduleCarmi_1.default)();
	});
	node_schedule_1.default.scheduleJob({ second: 0, minute: 0, hour: 1 }, (date) => {
		// 这里执行相关逻辑
		(0, scheduleToken_1.default)();
	});
};
exports.globalScheduleJobs = globalScheduleJobs;
exports.default = {
	// 发布任务
	schedule(executionTime, callback) {
		return node_schedule_1.default.scheduleJob(executionTime, (date) => {
			if (typeof callback === 'function') {
				callback(date);
			}
		});
	},
	// 重新安排任务
	reschedule(job, spec) {
		return node_schedule_1.default.rescheduleJob(job, spec);
	},
	// 取消任务
	cancel(job) {
		return node_schedule_1.default.cancelJob(job);
	},
	// 取消所有任务
	cancelAll() {
		return node_schedule_1.default.gracefulShutdown();
	},
};
//# sourceMappingURL=index.js.map
