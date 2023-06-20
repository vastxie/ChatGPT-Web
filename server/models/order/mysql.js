"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderMysql = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.orderMysql = db_1.sequelizeExample.define('order', {
    trade_no: {
        type: sequelize_1.DataTypes.STRING
    },
    pay_type: {
        type: sequelize_1.DataTypes.STRING
    },
    product_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    product_title: {
        type: sequelize_1.DataTypes.STRING
    },
    trade_status: {
        type: sequelize_1.DataTypes.STRING
    },
    user_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    product_info: {
        type: sequelize_1.DataTypes.STRING
    },
    channel: {
        type: sequelize_1.DataTypes.STRING
    },
    params: {
        type: sequelize_1.DataTypes.STRING
    },
    payment_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    payment_info: {
        type: sequelize_1.DataTypes.STRING
    },
    money: {
        type: sequelize_1.DataTypes.NUMBER
    },
    notify_info: {
        type: sequelize_1.DataTypes.STRING
    },
    pay_url: {
        type: sequelize_1.DataTypes.STRING
    },
    ip: {
        type: sequelize_1.DataTypes.STRING
    },
    create_time: {
        type: sequelize_1.DataTypes.STRING
    },
    update_time: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    timestamps: false,
    freezeTableName: true
});
exports.default = exports.orderMysql;
//# sourceMappingURL=mysql.js.map