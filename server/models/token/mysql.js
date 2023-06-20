"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenMysql = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.tokenMysql = db_1.sequelizeExample.define('token', {
    key: {
        type: sequelize_1.DataTypes.STRING
    },
    host: {
        type: sequelize_1.DataTypes.STRING
    },
    remarks: {
        type: sequelize_1.DataTypes.STRING
    },
    models: {
        type: sequelize_1.DataTypes.STRING
    },
    usage: {
        type: sequelize_1.DataTypes.NUMBER
    },
    limit: {
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
exports.default = exports.tokenMysql;
//# sourceMappingURL=mysql.js.map