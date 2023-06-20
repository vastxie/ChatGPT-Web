"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.precreate = void 0;
const tslib_1 = require("tslib");
const alipay_sdk_1 = tslib_1.__importDefault(require("alipay-sdk"));
const utils_1 = require("../../utils");
async function precreate({ config, notify_url, out_trade_no, total_amount, subject, body, goods_detail }) {
	const alipaySdk = new alipay_sdk_1.default(config);
	const response = await alipaySdk.exec('alipay.trade.precreate', {
		notify_url: notify_url,
		bizContent: {
			out_trade_no,
			subject,
			goods_detail: [goods_detail],
			body,
			total_amount,
			product_code: 'FACE_TO_FACE_PAYMENT'
		} // 业务（API）参数
	});
	return {
		...response,
		code: response.code === '10000' ? 0 : response.code
	};
}
exports.precreate = precreate;
async function checkNotifySign(config, body) {
	const alipaySdk = new alipay_sdk_1.default(config);
	const data = (0, utils_1.filterObjectNull)({
		...body,
		channel: null
	});
	return alipaySdk.checkNotifySign(data);
}
exports.default = {
	precreate,
	checkNotifySign
};
//# sourceMappingURL=index.js.map
