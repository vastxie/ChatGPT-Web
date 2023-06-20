"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatTime(fmt = 'yyyy-MM-dd HH:mm:ss', timeDate) {
    const date = timeDate ? timeDate : new Date();
    const add0 = (num) => num < 10 ? `0${num}` : num;
    const o = {
        'yyyy': date.getFullYear(),
        'MM': add0(date.getMonth() + 1),
        'dd': add0(date.getDate()),
        'HH': add0(date.getHours()),
        'mm': add0(date.getMinutes()),
        'ss': add0(date.getSeconds()),
        'qq': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds() //毫秒
    };
    Object.keys(o).forEach((i) => {
        if (fmt.includes(i)) {
            fmt = fmt?.replace(i, o[i]);
        }
    });
    return fmt;
}
exports.default = formatTime;
//# sourceMappingURL=formatTime.js.map