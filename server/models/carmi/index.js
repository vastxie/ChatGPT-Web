"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const db_1 = require("../db");
const mysql_1 = tslib_1.__importDefault(require("./mysql"));
const mysql_2 = tslib_1.__importDefault(require("../user/mysql"));
async function getCarmiInfo(where) {
    const find = await mysql_1.default.findOne({
        where
    });
    return find;
}
async function updateCarmiInfo(data, where) {
    const update = await mysql_1.default.update(data, {
        where: {
            ...where
        }
    });
    return update;
}
// 获取卡密列表
async function getCarmis({ page, page_size }, where) {
    mysql_1.default.belongsTo(mysql_2.default, { foreignKey: 'user_id', targetKey: 'id' });
    const find = await mysql_1.default.findAndCountAll({
        where,
        include: [
            {
                model: mysql_2.default,
                required: false,
            }
        ],
        order: [['create_time', 'DESC']],
        offset: page * page_size,
        limit: page_size
    });
    return find;
}
async function delCarmi(id) {
    const del = await mysql_1.default.destroy({
        where: {
            id
        }
    });
    return del;
}
async function addCarmis(datas) {
    const captains = await mysql_1.default.bulkCreate([...datas]);
    return captains;
}
// 清理过期的卡密
async function checkCarmiEndTime(time) {
    const captains = await mysql_1.default.update({
        status: 2
    }, {
        where: {
            end_time: {
                [db_1.sequelize.Op.lt]: time,
                [db_1.sequelize.Op.ne]: ''
            },
            status: 0
        }
    });
    return captains;
}
exports.default = {
    getCarmiInfo,
    updateCarmiInfo,
    getCarmis,
    delCarmi,
    addCarmis,
    checkCarmiEndTime
};
//# sourceMappingURL=index.js.map