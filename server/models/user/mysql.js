"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMysql = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.userMysql = db_1.sequelizeExample.define('user', {
    account: {
        type: sequelize_1.DataTypes.STRING
    },
    nickname: {
        type: sequelize_1.DataTypes.STRING
    },
    avatar: {
        type: sequelize_1.DataTypes.STRING
    },
    role: {
        type: sequelize_1.DataTypes.STRING
    },
    integral: {
        type: sequelize_1.DataTypes.NUMBER
    },
    vip_expire_time: {
        type: sequelize_1.DataTypes.STRING
    },
    svip_expire_time: {
        type: sequelize_1.DataTypes.STRING
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    },
    ip: {
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
exports.default = exports.userMysql;
//# sourceMappingURL=mysql.js.map