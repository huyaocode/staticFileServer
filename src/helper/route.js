//异步获取资源
const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);


module.exports = async function (req, res, filePath) {
    try{
        const stats = await stat(filePath);
        if (stats.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            //创建一个流读取文件，然后通过流的方式，一点一点的吐给客户端
            fs.createReadStream(filePath).pipe(res);
            // res.end();
            //有这个pipe就不需要再去调用end了，这样直接调用end会导致res接受不到东西，因为pipe是异步的
        } else if(stats.isDirectory()){
            fs.readdir(filePath, (err, files) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end(files.join(', '));
            });
        }
    } catch(err) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${filePath} is not a directory or file`);
    }

}