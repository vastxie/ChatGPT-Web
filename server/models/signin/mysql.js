"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinMysql = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.signinMysql = db_1.sequelizeExample.define('signin', {
    user_id: {
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
exports.default = exports.signinMysql;
//# sourceMappingURL=mysql.js.map