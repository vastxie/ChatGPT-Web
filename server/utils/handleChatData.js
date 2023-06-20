"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const formatTime_1 = tslib_1.__importDefault(require("./formatTime"));
function handleOpenChatData(chunk, parentMessageId) {
    // 将字符串按照连续的两个换行符进行分割
    let chunks = chunk.toString().split(/\n{2}/g);
    // 过滤掉空白的消息
    chunks = chunks.filter((item) => item.trim());
    const contents = [];
    for (let i = 0; i < chunks.length; i++) {
        const message = chunks[i];
        let payload = message.replace(/^data: /, '');
        if (payload === '[DONE]') {
            contents.push(JSON.stringify({
                id: '',
                role: 'assistant',
                segment: 'stop',
                dateTime: (0, formatTime_1.default)(),
                content: '',
                parentMessageId
            }));
        }
        try {
            payload = JSON.parse(payload);
        }
        catch (e) {
            // 忽略无法解析为 JSON 的消息
            continue;
        }
        const payloadContent = payload.choices?.[0]?.delta?.content || '';
        const payloadRole = payload.choices?.[0]?.delta?.role;
        const segment = payload === '[DONE]' ? 'stop' : payloadRole === 'assistant' ? 'start' : 'text';
        contents.push(JSON.stringify({
            id: payload.id,
            role: 'assistant',
            segment,
            dateTime: (0, formatTime_1.default)(),
            content: payloadContent,
            parentMessageId
        }) + '\n\n');
    }
    return contents.join('');
}
exports.default = handleOpenChatData;
//# sourceMappingURL=handleChatData.js.map