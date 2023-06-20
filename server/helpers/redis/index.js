"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ioredis_1 = tslib_1.__importDefault(require("ioredis"));
const config_1 = tslib_1.__importDefault(require("../../config"));
const ioredis = new ioredis_1.default({
	...config_1.default.getConfig('redis_config')
});
class Redis {
	ioredis;
	constructor(ioredis) {
		this.ioredis = ioredis;
		this.select(0);
	}
	select(index = 0) {
		this.ioredis.select(index);
		return this;
	}
	// 秒
	expire(key, time = 0) {
		if (time) {
			ioredis.expire(key, time);
		}
		return this;
	}
	// 毫秒
	pexpire(key, time = 0) {
		if (time) {
			ioredis.pexpire(key, time);
		}
		return this;
	}
	async get(key) {
		const results = await ioredis.get(key);
		return results;
	}
	set(key, value) {
		ioredis.set(key, value);
		return this;
	}
	setex(key, value, time) {
		ioredis.setex(key, time, value);
		return this;
	}
	sadd(key, value, time) {
		ioredis.sadd(key, value);
		if (time) {
			ioredis.expire(key, time);
		}
		return this;
	}
	// 删除集合中某个数据
	srem(key, value) {
		return ioredis.srem(key, value);
	}
	sismember(key, value) {
		return ioredis.sismember(key, value);
	}
	smembers(key) {
		return ioredis.smembers(key);
	}
	async del(...args) {
		const results = await ioredis.del(args);
		return results;
	}
}
exports.default = new Redis(ioredis);
//# sourceMappingURL=index.js.map
