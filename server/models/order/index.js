"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mysql_1 = tslib_1.__importDefault(require("../user/mysql"));
const mysql_2 = tslib_1.__importDefault(require("./mysql"));
async function getOrders({ page, page_size }, where) {
    mysql_2.default.belongsTo(mysql_1.default, { foreignKey: 'user_id', targetKey: 'id' });
    const finds = await mysql_2.default.findAndCountAll({
        where,
        include: [
            {
                model: mysql_1.default,
                required: false,
            }
        ],
        order: [['create_time', 'DESC']],
        offset: page * page_size,
        limit: page_size
    });
    return finds;
}
async function getOrderInfo(id) {
    const find = await mysql_2.default.findByPk(id);
    if (!find)
        return null;
    return find.toJSON();
}
async function delOrder(id) {
    const del = await mysql_2.default.destroy({
        where: {
            id
        }
    });
    return del;
}
async function addOrder(data) {
    const add = await mysql_2.default.create(data);
    return add;
}
async function editOrder(data) {
    const edit = await mysql_2.default.upsert(data);
    return edit;
}
exports.default = {
    getOrders,
    delOrder,
    addOrder,
    editOrder,
    getOrderInfo
};
//# sourceMappingURL=index.js.map