"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const utils_1 = require("../../utils");
const models_1 = require("../../models");
const router = express_1.default.Router();
router.get('/signin', async function (req, res, next) {
    const { page, page_size } = (0, utils_1.pagingData)({
        page: req.query.page,
        page_size: req.query.page_size
    });
    const signins = await models_1.signinModel.getSignins({ page, page_size });
    res.json((0, utils_1.httpBody)(0, signins));
});
exports.default = router;
//# sourceMappingURL=signin.js.map