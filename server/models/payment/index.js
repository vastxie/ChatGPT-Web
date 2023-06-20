"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const db_1 = require("../db");
const mysql_1 = tslib_1.__importDefault(require("./mysql"));
async function getOnePayment(type) {
    const find = await mysql_1.default
        .findOne({
        where: {
            status: 1,
            [db_1.sequelize.Op.or]: [
                { types: { [db_1.sequelize.Op.like]: `${type},%` } },
                { types: { [db_1.sequelize.Op.like]: `%,${type}` } },
                { types: { [db_1.sequelize.Op.like]: `%,${type},%` } },
                { types: { [db_1.sequelize.Op.eq]: type } } // 匹配完全等于 "alipay" 的值
            ]
        },
        order: db_1.sequelize.literal('RAND()')
    })
        .then((info) => info?.toJSON());
    return find;
}
async function getPayments({ page, page_size }, where) {
    const finds = await mysql_1.default.findAndCountAll({
        where,
        order: [['create_time', 'DESC']],
        offset: page * page_size,
        limit: page_size
    });
    return finds;
}
async function delPayment(id) {
    const del = await mysql_1.default.destroy({
        where: {
            id
        }
    });
    return del;
}
async function addPayment(data) {
    const add = await mysql_1.default.create(data);
    return add;
}
async function editPayment(data) {
    const edit = await mysql_1.default.upsert(data);
    return edit;
}
async function getPaymentInfo(id) {
    const find = await mysql_1.default.findByPk(id);
    if (!find)
        return null;
    return find.toJSON();
}
async function getPaymentTypes() {
    const payments = await mysql_1.default.findAll({
        where: {
            status: 1
        }
    });
    let payTypes = [];
    for (const payment of payments) {
        const json = payment.toJSON();
        const types = json.types.split(',');
        payTypes = payTypes.concat(types);
    }
    return [...new Set([...payTypes])];
}
exports.default = {
    getOnePayment,
    getPayments,
    delPayment,
    addPayment,
    editPayment,
    getPaymentInfo,
    getPaymentTypes
};
//# sourceMappingURL=index.js.map