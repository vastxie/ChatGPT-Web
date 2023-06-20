"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const __1 = require("..");
const utils_1 = require("../../utils");
const mysql_1 = tslib_1.__importDefault(require("./mysql"));
async function getUserInfo(where) {
    const findUser = await mysql_1.default.findOne({
        where
    });
    if (!findUser)
        return null;
    return findUser?.toJSON();
}
async function addUserInfo(data) {
    const addUser = await mysql_1.default.create(data).then((info) => info.toJSON());
    return addUser;
}
async function updataUserVIP(data) {
    const user = await mysql_1.default.findByPk(data.id);
    const userInfo = await user?.toJSON();
    if (data.type === 'integral') {
        if (data.operate === 'decrement') {
            user?.decrement('integral', {
                by: data.value
            });
        }
        else if (data.operate === 'increment') {
            user?.increment('integral', {
                by: data.value
            });
        }
    }
    else if (data.type === 'day') {
        const vipTime = Date.parse(userInfo.vip_expire_time);
        const svipTime = Date.parse(userInfo.svip_expire_time);
        const todayTime = new Date().setHours(0, 0, 0, 0);
        const addTime = data.value * 86400000;
        let vipResultTime = 0;
        let svipResultTime = svipTime;
        if (vipTime < todayTime) {
            // 这里是否减去1毫秒
            vipResultTime = todayTime + addTime - 1;
        }
        else {
            vipResultTime = vipTime + addTime;
        }
        if (data.level && data.level === 2) {
            if (svipTime < todayTime) {
                // 这里是否减去1毫秒
                svipResultTime = todayTime + addTime - 1;
            }
            else {
                svipResultTime = svipTime + addTime;
            }
        }
        const vip_expire_time = (0, utils_1.formatTime)('yyyy-MM-dd', new Date(vipResultTime));
        const svip_expire_time = (0, utils_1.formatTime)('yyyy-MM-dd', new Date(svipResultTime));
        await mysql_1.default.update({ vip_expire_time, svip_expire_time }, {
            where: {
                id: data.id
            }
        });
    }
    return true;
}
// 获取用户列表
async function getUsers({ page, page_size }, where) {
    const find = await mysql_1.default.findAndCountAll({
        where,
        order: [['create_time', 'DESC']],
        offset: page * page_size,
        limit: page_size
    });
    return find;
}
async function delUser(id) {
    const del = await mysql_1.default.destroy({
        where: {
            id
        }
    });
    return del;
}
async function editUser(data) {
    const edit = await mysql_1.default.upsert(data);
    return edit;
}
async function editUserInfo(id, data) {
    const edit = await mysql_1.default.update({ ...data }, {
        where: {
            id
        }
    });
    return edit;
}
// 将商品的数据加在用户身上 在创建一个 记录
async function addUserProductQuota(user_id, product_id) {
    if (product_id && user_id) {
        const productInfo = await __1.productModel.getProduct(product_id);
        if (!productInfo) {
            return (0, utils_1.httpBody)(-1, {}, '商品不存在');
        }
        let subscribeDay = 0;
        let integral = 0;
        if (productInfo.type === 'integral') {
            integral = productInfo.value;
        }
        else if (productInfo.type === 'day') {
            subscribeDay = productInfo.value;
        }
        await updataUserVIP({
            id: user_id,
            value: integral ? integral : subscribeDay,
            type: productInfo.type,
            level: productInfo.level,
            operate: 'increment'
        });
        return (0, utils_1.httpBody)(0, {
            ...productInfo,
            value: subscribeDay ? `${productInfo.value}天` : `${productInfo.value}积分`
        }, '充值成功');
    }
    return (0, utils_1.httpBody)(-1, {}, '数据错误');
}
exports.default = {
    getUserInfo,
    addUserInfo,
    updataUserVIP,
    getUsers,
    delUser,
    editUser,
    addUserProductQuota,
    editUserInfo
};
//# sourceMappingURL=index.js.map