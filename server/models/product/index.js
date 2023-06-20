"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mysql_1 = tslib_1.__importDefault(require("./mysql"));
async function getProducts({ page, page_size }, where) {
    const finds = await mysql_1.default.findAndCountAll({
        where,
        order: [['create_time', 'DESC']],
        offset: page * page_size,
        limit: page_size
    });
    return finds;
}
async function getProduct(id) {
    const find = await mysql_1.default.findByPk(id);
    if (!find)
        return null;
    return find.toJSON();
}
async function delProduct(id) {
    const del = await mysql_1.default.destroy({
        where: {
            id
        }
    });
    return del;
}
async function addProduct(data) {
    const add = await mysql_1.default.create(data);
    return add;
}
async function editProduct(data) {
    const edit = await mysql_1.default.upsert(data);
    return edit;
}
exports.default = {
    getProducts,
    delProduct,
    addProduct,
    editProduct,
    getProduct
};
//# sourceMappingURL=index.js.map