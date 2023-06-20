"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const querystring_1 = tslib_1.__importDefault(require("querystring"));
const utils_1 = require("../../utils");
async function precreate(base, config, options) {
	const data = (0, utils_1.filterObjectNull)({
		device: 'pc',
		...config,
		...options
	});
	console.log(data);
	const sortedData = (0, utils_1.ksort)(data);
	const query = (0, utils_1.buildQueryString)(sortedData);
	const sign = (0, utils_1.generateMd5)(query + base.key);
	const formBody = querystring_1.default.stringify({
		sign,
		sign_type: 'MD5',
		...data
	});
	const api = base.api + '/mapi.php';
	const response = await (0, node_fetch_1.default)(api, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
		},
		body: formBody
	});
	const json = await response.json();
	console.log('支付结构', json);
	return {
		code: json.code === 1 ? 0 : json.code,
		pay_url: json.payurl || json.qrcode || json.urlscheme
	};
}
async function checkNotifySign(params, key) {
	const sign = params.sign;
	const data = (0, utils_1.filterObjectNull)({
		...params,
		channel: null,
		sign: null,
		sign_type: null
	});
	const sortedData = (0, utils_1.ksort)(data);
	const query = (0, utils_1.buildQueryString)(sortedData);
	const newSign = (0, utils_1.generateMd5)(query + key);
	return sign === newSign;
}
exports.default = {
	precreate,
	checkNotifySign
};
//# sourceMappingURL=index.js.map
