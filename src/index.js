const http = require('http');
const chalk = require('chalk');
const path = require('path');

const conf = require('./config/defaultConfig');
const route = require('./helper/route');

const server = http.createServer((req, res) => {
    //使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。
    const filePath = path.join(conf.root, req.url);
    // fs.stat(filePath, (err, stats) => {});
    route(req,res, filePath);
    
});

server.listen(conf.post, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.post}`;
    console.info(`Sever running at ${chalk.green(addr)}`);
});