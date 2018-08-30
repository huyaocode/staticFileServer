//异步获取资源
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const promisify = require('util').promisify;

const mime = require('./mime');
const compress = require('./compress');
const tplPath = path.join(__dirname, '../template/dir.tpl');
const range = require('./range');
const isFresh = require('./cache');

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const source = fs.readFileSync(tplPath);  //同步方法
const template = Handlebars.compile(source.toString());

module.exports = async function (req, res, filePath, config) {
    try {
        const stats = await stat(filePath);
        if (stats.isFile()) {
            const contentType = mime(filePath);
            res.setHeader('Content-Type', contentType);//直接在这里设置utf-8

            //判断缓存是否可用
            if(isFresh(stats, req, res)) {
                res.statusCode = 304;
                res.end();
                return;
            }

            let rs;
            const { code, start, end } = range(stats.size, req, res);
            if (code === 200) {
                res.statusCode = 200;
                rs = fs.createReadStream(filePath);
            } else {
                res.statusCode = 206;//表示是部分内容
                //创建一个流读取文件, {start, end}表示文件读取的起始点和终点
                rs = fs.createReadStream(filePath, { start, end });
            }
            //一点一点的压缩
            if (filePath.match(config.compress)) {
                rs = compress(rs, req, res);
            }

            //有这个pipe就不需要再去调用end了，这样直接调用end会导致res接受不到东西，因为pipe是异步的
            rs.pipe(res);

        } else if (stats.isDirectory()) {
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            const dir = path.relative(config.root, filePath);
            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '', //加 / 表示相对于根路径开始
                files
            };
            res.end(template(data));
        }
    } catch (err) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${filePath} is not a directory or file`);
    }
}