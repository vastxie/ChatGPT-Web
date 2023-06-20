"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carmiMysql = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.carmiMysql = db_1.sequelizeExample.define('carmi', {
    user_id: {
        type: sequelize_1.DataTypes.STRING
    },
    ip: {
        type: sequelize_1.DataTypes.STRING
    },
    key: {
        type: sequelize_1.DataTypes.STRING
    },
    value: {
        type: sequelize_1.DataTypes.STRING
    },
    type: {
        type: sequelize_1.DataTypes.STRING
    },
    level: {
        type: sequelize_1.DataTypes.NUMBER
    },
    end_time: {
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
exports.default = exports.carmiMysql;
//# sourceMappingURL=mysql.js.map