"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.turnoverMysql = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.turnoverMysql = db_1.sequelizeExample.define('turnover', {
    user_id: {
        type: sequelize_1.DataTypes.STRING
    },
    value: {
        type: sequelize_1.DataTypes.NUMBER
    },
    describe: {
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
exports.default = exports.turnoverMysql;
//# sourceMappingURL=mysql.js.map