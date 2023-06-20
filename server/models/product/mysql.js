"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productMysql = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.productMysql = db_1.sequelizeExample.define('product', {
    title: {
        type: sequelize_1.DataTypes.STRING
    },
    price: {
        type: sequelize_1.DataTypes.NUMBER
    },
    original_price: {
        type: sequelize_1.DataTypes.NUMBER
    },
    value: {
        type: sequelize_1.DataTypes.NUMBER
    },
    badge: {
        type: sequelize_1.DataTypes.STRING
    },
    type: {
        type: sequelize_1.DataTypes.STRING
    },
    level: {
        type: sequelize_1.DataTypes.NUMBER
    },
    status: {
        type: sequelize_1.DataTypes.NUMBER
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
exports.default = exports.productMysql;
//# sourceMappingURL=mysql.js.map