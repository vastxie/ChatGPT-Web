"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const utils_1 = require("../../utils");
async function scheduleCarmi() {
    const time = (0, utils_1.formatTime)('yyyy-MM-dd');
    models_1.carmiModel.checkCarmiEndTime(time);
}
exports.default = scheduleCarmi;
//# sourceMappingURL=scheduleCarmi.js.map