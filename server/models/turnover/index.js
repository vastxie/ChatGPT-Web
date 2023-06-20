"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mysql_1 = tslib_1.__importDefault(require("../user/mysql"));
const mysql_2 = tslib_1.__importDefault(require("./mysql"));
async function addTurnover(data) {
    const create = await mysql_2.default.create(data);
    return create;
}
async function getUserTurnovers({ page, page_size }, where) {
    const finds = await mysql_2.default.findAndCountAll({
        where,
        order: [['create_time', 'DESC']],
        offset: page * page_size,
        limit: page_size
    });
    return finds;
}
async function getTurnovers({ page, page_size }, where) {
    mysql_2.default.belongsTo(mysql_1.default, { foreignKey: 'user_id', targetKey: 'id' });
    const find = await mysql_2.default.findAndCountAll({
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
    return find;
}
async function delTurnover(id) {
    const del = await mysql_2.default.destroy({
        where: {
            id
        }
    });
    return del;
}
async function editTurnover(data) {
    const res = await mysql_2.default.upsert({
        ...data
    });
    return res;
}
exports.default = {
    addTurnover,
    getUserTurnovers,
    delTurnover,
    getTurnovers,
    editTurnover
};
//# sourceMappingURL=index.js.map