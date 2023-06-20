"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const utils_1 = require("../../utils");
const models_1 = require("../../models");
const router = express_1.default.Router();
// 获取卡密列表
router.get('/action', async function (req, res, next) {
    const { page, page_size } = (0, utils_1.pagingData)({
        page: req.query.page,
        page_size: req.query.page_size
    });
    const actions = await models_1.actionModel.getActions({ page, page_size });
    res.json((0, utils_1.httpBody)(0, actions));
});
exports.default = router;
//# sourceMappingURL=action.js.map