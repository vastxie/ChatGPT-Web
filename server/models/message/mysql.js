"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageMysql = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.messageMysql = db_1.sequelizeExample.define('message', {
    content: {
        type: sequelize_1.DataTypes.STRING
    },
    user_id: {
        type: sequelize_1.DataTypes.NUMBER
    },
    role: {
        type: sequelize_1.DataTypes.STRING
    },
    frequency_penalty: {
        type: sequelize_1.DataTypes.NUMBER
    },
    max_tokens: {
        type: sequelize_1.DataTypes.NUMBER
    },
    model: {
        type: sequelize_1.DataTypes.STRING
    },
    presence_penalty: {
        type: sequelize_1.DataTypes.NUMBER
    },
    temperature: {
        type: sequelize_1.DataTypes.NUMBER
    },
    parent_message_id: {
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
exports.default = exports.messageMysql;
//# sourceMappingURL=mysql.js.map