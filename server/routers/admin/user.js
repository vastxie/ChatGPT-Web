"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const utils_1 = require("../../utils");
const models_1 = require("../../models");
const router = express_1.default.Router();
router.get('/user', async function (req, res, next) {
    const { page, page_size } = (0, utils_1.pagingData)({
        page: req.query.page,
        page_size: req.query.page_size
    });
    const carmis = await models_1.userModel.getUsers({ page, page_size });
    res.json((0, utils_1.httpBody)(0, carmis));
});
router.delete('/user/:id', async function (req, res, next) {
    const { id } = req.params;
    if (!id) {
        res.json((0, utils_1.httpBody)(-1, '缺少必要参数'));
        return;
    }
    const delRes = await models_1.userModel.delUser(id);
    res.json((0, utils_1.httpBody)(0, delRes));
});
router.put('/user', async function (req, res, next) {
    const { id, account, avatar, integral, nickname, role, vip_expire_time, svip_expire_time } = req.body;
    if (!id) {
        res.json((0, utils_1.httpBody)(-1, '缺少必要参数'));
        return;
    }
    // 修改用户
    const editRes = await models_1.userModel.editUser((0, utils_1.filterObjectNull)({
        id,
        account,
        avatar,
        integral,
        nickname,
        role,
        vip_expire_time,
        svip_expire_time
    }));
    res.json((0, utils_1.httpBody)(0, editRes));
});
exports.default = router;
//# sourceMappingURL=user.js.map