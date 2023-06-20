"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const utils_1 = require("../../utils");
const models_1 = require("../../models");
const router = express_1.default.Router();
router.get('/config', async function (req, res, next) {
    const configs = await models_1.configModel.getConfig();
    res.json((0, utils_1.httpBody)(0, configs));
});
router.put('/config', async function (req, res, next) {
    const { body } = req;
    const configs = await models_1.configModel.getConfig();
    if (!body || !configs || configs.length <= 0) {
        res.json((0, utils_1.httpBody)(-1, '缺少必要参数'));
        return;
    }
    const insert = [];
    for (const config of configs) {
        const json = config.toJSON();
        if (body[json.name] || body[json.name] === 0) {
            insert.push((0, utils_1.filterObjectNull)({
                ...json,
                value: body[json.name].toString(),
                create_time: null,
                update_time: null
            }));
        }
    }
    console.log(insert);
    if (insert.length < 0) {
        res.json((0, utils_1.httpBody)(-1, '无内容需要修改'));
        return;
    }
    const editRes = await models_1.configModel.editConfigs(insert);
    res.json((0, utils_1.httpBody)(editRes.code, '修改成功'));
});
exports.default = router;
//# sourceMappingURL=config.js.map