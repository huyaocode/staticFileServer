const http = require('http');
const chalk = require('chalk');
const path = require('path');

const conf = require('./config/defaultConfig');
const route = require('./helper/route');
const openUrl = require('./helper/openUrl');

class Server {
    constructor(config) {
        this.conf = Object.assign({}, conf, config);
    }

    start() {
        const server = http.createServer((req, res) => {
            //使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。
            const filePath = path.join(this.conf.root, req.url);
            // fs.stat(filePath, (err, stats) => {});
            route(req,res, filePath, this.conf);
            
        });
        
        server.listen(this.conf.port, this.conf.hostname, () => {
            const addr = `http://${this.conf.hostname}:${this.conf.port}`;
            console.info(`Sever running at ${chalk.green(addr)}`);
            openUrl(addr);
        });
    }
}

module.exports = Server;