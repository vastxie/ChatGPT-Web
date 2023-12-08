module.exports = {
    apps: [{
        name: 'chatweb',            // 应用名称
        script: 'server/index.js',   // 启动脚本路径
        watch: true,                // 开启监听文件变动重启
        // 其他配置项可以在这里添加
    }]
};