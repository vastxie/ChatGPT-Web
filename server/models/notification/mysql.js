"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationMysql = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.notificationMysql = db_1.sequelizeExample.define('notification', {
    title: {
        type: sequelize_1.DataTypes.STRING
    },
    content: {
        type: sequelize_1.DataTypes.STRING
    },
    sort: {
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
exports.default = exports.notificationMysql;
//# sourceMappingURL=mysql.js.map