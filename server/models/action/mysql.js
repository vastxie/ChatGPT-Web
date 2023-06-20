"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionMysql = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.actionMysql = db_1.sequelizeExample.define('action', {
    user_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    type: {
        type: sequelize_1.DataTypes.STRING
    },
    describe: {
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
exports.default = exports.actionMysql;
//# sourceMappingURL=mysql.js.map