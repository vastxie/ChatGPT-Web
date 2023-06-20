"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentMysql = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.paymentMysql = db_1.sequelizeExample.define('payment', {
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    channel: {
        type: sequelize_1.DataTypes.STRING
    },
    types: {
        type: sequelize_1.DataTypes.STRING
    },
    params: {
        type: sequelize_1.DataTypes.STRING
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
exports.default = exports.paymentMysql;
//# sourceMappingURL=mysql.js.map