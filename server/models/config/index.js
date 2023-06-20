"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const db_1 = require("../db");
const mysql_1 = tslib_1.__importDefault(require("./mysql"));
async function getConfig(key) {
    const findAll = await mysql_1.default.findAll();
    if (key && findAll && findAll.length > 0) {
        let value = null;
        for (const item of findAll) {
            const json = await item.toJSON();
            if (json.name === key) {
                value = json.value;
            }
        }
        return value;
    }
    return findAll;
}
async function editConfigs(updatedData) {
    return db_1.sequelizeExample.transaction(async (t) => {
        for (const data of updatedData) {
            await mysql_1.default.update({ value: data.value }, { where: { id: data.id, name: data.name }, transaction: t });
        }
    }).then((res) => {
        return { code: 0, data: res };
    }).catch(error => {
        return { code: -1, error };
    });
}
exports.default = {
    getConfig,
    editConfigs
};
//# sourceMappingURL=index.js.map