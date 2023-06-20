"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const utils_1 = require("../../utils");
const models_1 = require("../../models");
const router = express_1.default.Router();
router.get('/notification', async function (req, res, next) {
    const { page, page_size } = (0, utils_1.pagingData)({
        page: req.query.page,
        page_size: req.query.page_size
    });
    const tokens = await models_1.notificationModel.getNotification({ page, page_size });
    res.json((0, utils_1.httpBody)(0, tokens));
});
router.delete('/notification/:id', async function (req, res, next) {
    const { id } = req.params;
    if (!id) {
        res.json((0, utils_1.httpBody)(-1, '缺少必要参数'));
        return;
    }
    const delRes = await models_1.notificationModel.delNotification(id);
    res.json((0, utils_1.httpBody)(0, delRes));
});
router.post('/notification', async function (req, res, next) {
    const { title, content, sort, status } = req.body;
    if (!title || !content) {
        res.json((0, utils_1.httpBody)(-1, '缺少必要参数'));
        return;
    }
    const id = (0, utils_1.generateNowflakeId)(1)();
    const addRes = await models_1.notificationModel.addNotification({
        id,
        title,
        content,
        sort,
        status
    });
    res.json((0, utils_1.httpBody)(0, addRes));
});
router.put('/notification', async function (req, res, next) {
    const { id, title, content, sort, status } = req.body;
    if (!id || !title || !content) {
        res.json((0, utils_1.httpBody)(-1, '缺少必要参数'));
        return;
    }
    const editRes = await models_1.notificationModel.editNotification(id, (0, utils_1.filterObjectNull)({
        title,
        content,
        sort,
        status
    }));
    res.json((0, utils_1.httpBody)(0, editRes));
});
exports.default = router;
//# sourceMappingURL=notification.js.map