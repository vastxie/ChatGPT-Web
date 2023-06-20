"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const utils_1 = require("../../utils");
const models_1 = require("../../models");
const router = express_1.default.Router();
// 获取卡密列表
router.get('/carmi', async function (req, res, next) {
    const { page, page_size } = (0, utils_1.pagingData)({
        page: req.query.page,
        page_size: req.query.page_size
    });
    const carmis = await models_1.carmiModel.getCarmis({ page, page_size });
    res.json((0, utils_1.httpBody)(0, carmis));
});
router.delete('/carmi/:id', async function (req, res, next) {
    const { id } = req.params;
    if (!id) {
        res.json((0, utils_1.httpBody)(-1, '缺少必要参数'));
        return;
    }
    // 删除卡密
    const delRes = await models_1.carmiModel.delCarmi(id);
    res.json((0, utils_1.httpBody)(0, delRes));
});
// 生成卡密
router.post('/carmi', async function (req, res, next) {
    const { type = 'integral', end_time = '', quantity = 1, reward = 10, level = 1 } = req.body;
    const generateCarmi = (q) => {
        const keys = [];
        for (let i = 0; i < q; i++) {
            const str = `${(0, utils_1.generateUUID)()}_${(0, utils_1.generateNowflakeId)(i + 1)()}_${new Date().getTime()}`;
            const key = (0, utils_1.generateMd5)(str);
            keys.push(key);
        }
        return keys;
    };
    const carmis = generateCarmi(quantity);
    const insertData = carmis.map((carmi, index) => {
        const id = (0, utils_1.generateNowflakeId)(index)();
        return {
            id,
            key: carmi,
            type,
            end_time,
            value: reward,
            status: 0,
            level
        };
    });
    // 批量添加卡密
    const addRes = await models_1.carmiModel.addCarmis(insertData);
    res.json((0, utils_1.httpBody)(0, addRes));
});
router.get('/carmi/check', async function (req, res, next) {
    const time = (0, utils_1.formatTime)('yyyy-MM-dd');
    models_1.carmiModel.checkCarmiEndTime(time);
    res.json((0, utils_1.httpBody)(0));
});
exports.default = router;
//# sourceMappingURL=carmi.js.map