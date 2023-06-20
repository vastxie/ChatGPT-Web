"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mysql_1 = tslib_1.__importDefault(require("./mysql"));
async function getNotification({ page, page_size }, where) {
    const finds = await mysql_1.default.findAndCountAll({
        where,
        order: [['create_time', 'DESC']],
        offset: page * page_size,
        limit: page_size
    });
    return finds;
}
async function delNotification(id) {
    const del = await mysql_1.default.destroy({
        where: {
            id
        }
    });
    return del;
}
async function addNotification(data) {
    const add = await mysql_1.default.create(data);
    return add;
}
async function editNotification(id, data) {
    const edit = await mysql_1.default.update(data, {
        where: {
            id
        }
    });
    return edit;
}
exports.default = {
    getNotification,
    delNotification,
    addNotification,
    editNotification
};
//# sourceMappingURL=index.js.map