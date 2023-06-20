"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const db_1 = require("../db");
const mysql_1 = tslib_1.__importDefault(require("../user/mysql"));
const mysql_2 = tslib_1.__importDefault(require("./mysql"));
async function addSignin(data) {
    const create = await mysql_2.default.create({
        ...data
    });
    return create;
}
async function getUserDaySignin(user_id, time) {
    const create = await mysql_2.default.findOne({
        where: {
            user_id,
            create_time: {
                [db_1.sequelize.Op.gte]: time
            }
        }
    });
    return create;
}
async function getSignins({ page, page_size }, where) {
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
async function getUserSigninList(user_id, { start_time, end_time }) {
    const list = await mysql_2.default.findAll({
        where: {
            user_id,
            status: 1,
            create_time: {
                [db_1.sequelize.Op.gte]: start_time,
                [db_1.sequelize.Op.lt]: end_time,
            }
        }
    });
    return list;
}
exports.default = {
    addSignin,
    getUserDaySignin,
    getSignins,
    getUserSigninList
};
//# sourceMappingURL=index.js.map