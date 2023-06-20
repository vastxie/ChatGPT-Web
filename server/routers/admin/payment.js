"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const utils_1 = require("../../utils");
const models_1 = require("../../models");
const router = express_1.default.Router();
router.get('/payment', async function (req, res, next) {
    const { page, page_size } = (0, utils_1.pagingData)({
        page: req.query.page,
        page_size: req.query.page_size
    });
    const all = await models_1.paymentModel.getPayments({ page, page_size });
    res.json((0, utils_1.httpBody)(0, all));
});
router.delete('/payment/:id', async function (req, res, next) {
    const { id } = req.params;
    if (!id) {
        res.json((0, utils_1.httpBody)(-1, '缺少必要参数'));
        return;
    }
    const delRes = await models_1.paymentModel.delPayment(id);
    res.json((0, utils_1.httpBody)(0, delRes));
});
router.post('/payment', async function (req, res, next) {
    const { channel, name, params, types, status = 1 } = req.body;
    if (!channel || !name || !params || !types) {
        res.json((0, utils_1.httpBody)(-1, '缺少必要参数'));
        return;
    }
    const id = (0, utils_1.generateNowflakeId)(1)();
    const addRes = await models_1.paymentModel.addPayment((0, utils_1.filterObjectNull)({
        id,
        channel,
        name,
        params,
        types,
        status
    }));
    res.json((0, utils_1.httpBody)(0, addRes));
});
router.put('/payment', async function (req, res, next) {
    const { id, channel, name, params, types, status } = req.body;
    if (!id || !channel || !name || !params || !types) {
        res.json((0, utils_1.httpBody)(-1, '缺少必要参数'));
        return;
    }
    const editRes = await models_1.paymentModel.editPayment((0, utils_1.filterObjectNull)({
        id,
        channel,
        name,
        params,
        types,
        status
    }));
    res.json((0, utils_1.httpBody)(0, editRes));
});
exports.default = router;
//# sourceMappingURL=payment.js.map