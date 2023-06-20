'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const express_1 = tslib_1.__importDefault(require('express'));
require('express-async-errors');
// const path_1 = tslib_1.__importDefault(require('path'));
const cors_1 = tslib_1.__importDefault(require('cors'));
const routers_1 = tslib_1.__importDefault(require('./routers'));
const db_1 = tslib_1.__importDefault(require('./models/db'));
const config_1 = tslib_1.__importDefault(require('./config'));
const verify_1 = tslib_1.__importDefault(require('./middlewares/verify'));
const schedule_1 = require('./helpers/schedule');
const catch_error_1 = tslib_1.__importDefault(require('./middlewares/catch_error'));
const app = (0, express_1.default)();
// 错误处理
app.use(catch_error_1.default);
app.use((0, cors_1.default)());
// 校验Token
app.use(verify_1.default);
// 链接mysql
(0, db_1.default)();
// 获取静态目录
// app.use(express_1.default.static(path_1.default.join(__dirname, '../dist')))
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// 初始化路由
(0, routers_1.default)(app);
// 系统级别的定时任务
(0, schedule_1.globalScheduleJobs)();
app.all('/api/*', (req, res) => {
    res.status(404).json({ code: -1, data: [], message: 'The current access API address does not exist' });
});
// 渲染页面
// app.get('*', (req, res) => {
//   res.sendFile(path_1.default.join(__dirname, '../dist', 'index.html'))
// })
// 错误处理
app.use(catch_error_1.default);
// 启动服务器
app.listen(config_1.default.getConfig('port'), () => {
    console.log(`Server is running on port ${config_1.default.getConfig('port')}`);
});
//# sourceMappingURL=index.js.map