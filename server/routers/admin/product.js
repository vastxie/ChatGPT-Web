"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const utils_1 = require("../../utils");
const models_1 = require("../../models");
const router = express_1.default.Router();
router.get('/products', async function (req, res, next) {
    const { page, page_size } = (0, utils_1.pagingData)({
        page: req.query.page,
        page_size: req.query.page_size
    });
    const signins = await models_1.productModel.getProducts({ page, page_size });
    res.json((0, utils_1.httpBody)(0, signins));
});
router.delete('/products/:id', async function (req, res, next) {
    const { id } = req.params;
    if (!id) {
        res.json((0, utils_1.httpBody)(-1, '缺少必要参数'));
        return;
    }
    const delRes = await models_1.productModel.delProduct(id);
    res.json((0, utils_1.httpBody)(0, delRes));
});
router.post('/products', async function (req, res, next) {
    const { title, price, original_price, value, badge, type, level, status } = req.body;
    if (!title || !price || !value || !type) {
        res.json((0, utils_1.httpBody)(-1, '缺少必要参数'));
        return;
    }
    const id = (0, utils_1.generateNowflakeId)(1)();
    const addRes = await models_1.productModel.addProduct((0, utils_1.filterObjectNull)({
        id,
        title, price, original_price, value, type, badge, level, status
    }));
    res.json((0, utils_1.httpBody)(0, addRes));
});
router.put('/products', async function (req, res, next) {
    const { id, title, price, original_price, value, badge, type, level, status } = req.body;
    console.log(req.body);
    if (!id || !title || !price || !value || !type) {
        res.json((0, utils_1.httpBody)(-1, '缺少必要参数'));
        return;
    }
    const editRes = await models_1.productModel.editProduct((0, utils_1.filterObjectNull)({
        id,
        title, price, original_price, value, badge, type, level, status
    }));
    res.json((0, utils_1.httpBody)(0, editRes));
});
exports.default = router;
//# sourceMappingURL=product.js.map