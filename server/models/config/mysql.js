"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configMysql = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.configMysql = db_1.sequelizeExample.define('config', {
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    value: {
        type: sequelize_1.DataTypes.STRING
    },
    remarks: {
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
exports.default = exports.configMysql;
//# sourceMappingURL=mysql.js.map