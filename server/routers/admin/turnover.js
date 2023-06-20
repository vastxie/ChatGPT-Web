"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const utils_1 = require("../../utils");
const models_1 = require("../../models");
const router = express_1.default.Router();
router.get('/turnover', async function (req, res, next) {
    const { page, page_size } = (0, utils_1.pagingData)({
        page: req.query.page,
        page_size: req.query.page_size
    });
    const carmis = await models_1.turnoverModel.getTurnovers({ page, page_size });
    res.json((0, utils_1.httpBody)(0, carmis));
});
router.delete('/turnover/:id', async function (req, res, next) {
    const { id } = req.params;
    if (!id) {
        res.json((0, utils_1.httpBody)(-1, '缺少必要参数'));
        return;
    }
    const delRes = await models_1.turnoverModel.delTurnover(id);
    res.json((0, utils_1.httpBody)(0, delRes));
});
router.put('/turnover', async function (req, res, next) {
    const { id, user_id, value, describe } = req.body;
    if (!id || !value || !describe || !user_id) {
        res.json((0, utils_1.httpBody)(-1, '缺少必要参数'));
        return;
    }
    const delRes = await models_1.turnoverModel.editTurnover({
        id,
        value,
        describe,
        user_id
    });
    res.json((0, utils_1.httpBody)(0, delRes));
});
exports.default = router;
//# sourceMappingURL=turnover.js.map