"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeExample = exports.sequelize = void 0;
const tslib_1 = require("tslib");
const sequelize_1 = tslib_1.__importStar(require("sequelize"));
exports.sequelize = sequelize_1.default;
const config_1 = tslib_1.__importDefault(require("../config"));
const sequelizeExample = new sequelize_1.Sequelize({
    ...config_1.default.getConfig('mysql_config'),
    logging: (sql, timing) => {
        console.log(sql);
    }
});
exports.sequelizeExample = sequelizeExample;
const initMysql = async () => {
    try {
        await sequelizeExample.authenticate();
        console.log('MySQL database connection succeeded.');
    }
    catch (error) {
        console.log(`MySQL database link error: ${error}`);
    }
    return sequelizeExample;
};
const initDB = async () => {
    await initMysql();
};
exports.default = initDB;
//# sourceMappingURL=db.js.map