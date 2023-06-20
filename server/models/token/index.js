"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const db_1 = require("../db");
const mysql_1 = tslib_1.__importDefault(require("./mysql"));
async function getOneToken({ model }) {
    const find = await mysql_1.default
        .findOne({
        where: {
            status: 1,
            [db_1.sequelize.Op.or]: [
                { models: { [db_1.sequelize.Op.like]: `${model},%` } },
                { models: { [db_1.sequelize.Op.like]: `%,${model}` } },
                { models: { [db_1.sequelize.Op.like]: `%,${model},%` } },
                { models: { [db_1.sequelize.Op.eq]: model } }
            ]
        },
        order: db_1.sequelize.literal('RAND()')
    })
        .then((info) => info?.toJSON());
    return find;
}
async function getTokens({ page, page_size }, where) {
    const finds = await mysql_1.default.findAndCountAll({
        where,
        order: [['create_time', 'DESC']],
        offset: page * page_size,
        limit: page_size
    });
    return finds;
}
async function delToken(id) {
    const del = await mysql_1.default.destroy({
        where: {
            id
        }
    });
    return del;
}
async function addToken(data) {
    const add = await mysql_1.default.create(data);
    return add;
}
async function editToken(id, data) {
    const edit = await mysql_1.default.update(data, {
        where: {
            id
        }
    });
    return edit;
}
exports.default = {
    getOneToken,
    getTokens,
    delToken,
    addToken,
    editToken
};
//# sourceMappingURL=index.js.map