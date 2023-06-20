"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const utils_1 = require("../../utils");
const models_1 = require("../../models");
const queue_1 = require("../../helpers/queue");
const router = express_1.default.Router();
router.get('/token', async function (req, res, next) {
    const { page, page_size } = (0, utils_1.pagingData)({
        page: req.query.page,
        page_size: req.query.page_size
    });
    const tokens = await models_1.tokenModel.getTokens({ page, page_size });
    res.json((0, utils_1.httpBody)(0, tokens));
});
router.delete('/token/:id', async function (req, res, next) {
    const { id } = req.params;
    if (!id) {
        res.json((0, utils_1.httpBody)(-1, '缺少必要参数'));
        return;
    }
    const delRes = await models_1.tokenModel.delToken(id);
    res.json((0, utils_1.httpBody)(0, delRes));
});
router.post('/token', async function (req, res, next) {
    const { key, host, remarks, models, status } = req.body;
    if (!key || !host || !models) {
        res.json((0, utils_1.httpBody)(-1, '缺少必要参数'));
        return;
    }
    const id = (0, utils_1.generateNowflakeId)(1)();
    const addRes = await models_1.tokenModel.addToken({
        id,
        key, host, remarks, status, models
    });
    res.json((0, utils_1.httpBody)(0, addRes));
});
router.put('/token', async function (req, res, next) {
    const { id, key, host, remarks, models, status } = req.body;
    if (!id || !key || !host || !models) {
        res.json((0, utils_1.httpBody)(-1, '缺少必要参数'));
        return;
    }
    const editRes = await models_1.tokenModel.editToken(id, (0, utils_1.filterObjectNull)({
        key, host, remarks, status, models
    }));
    res.json((0, utils_1.httpBody)(0, editRes));
});
router.post('/token/check', async function (req, res, next) {
    const { key, host, all } = req.body;
    if (all) {
        const tokens = await models_1.tokenModel.getTokens({ page: 0, page_size: 100 }, {
            status: 1
        });
        const list = tokens.rows;
        list.forEach((item) => {
            queue_1.checkTokenQueue.addTask({
                ...item.toJSON()
            });
        });
        res.json((0, utils_1.httpBody)(0, '提交成功'));
        return;
    }
    if (!key || !host) {
        res.json((0, utils_1.httpBody)(-1, '缺少必要参数'));
        return;
    }
    const rese = await (0, utils_1.getKeyUsage)(host, key);
    res.json((0, utils_1.httpBody)(0, rese));
});
exports.default = router;
//# sourceMappingURL=token.js.map