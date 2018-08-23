const http = require('http');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

const conf = require('./config/defaultConfig');

const server = http.createServer((req, res) => {

    // const filePath = path.join(conf.root, req.url);
    const filePath = 'E:\\SoftwareTestDemo';
    console.log(req.url);
    console.log(filePath);
    fs.stat(filePath, (err, stats) => {
        if(err){
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('页面不存在');
            return;
        }

        if(stats.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream(filePath).pipe(res);
        } else if(stats.isDirectory()){
            fs.readdir(filePath, (err, files) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/palin');
                res.end(files.join(','));
            });
        }

    });

    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/html');
    // var html = `
    // <html>
    //     <head>
    //         <title>nodeServer</title>
    //     </head>
    //     <body>
    //         <h1>Hello Node!<h1>
    //     </body>
    // </html>
    // `;
    // res.write(html);
    // res.end();

});

server.listen(conf.post, conf.hostname, () =>{
    const addr =  `http://${conf.hostname}:${conf.post}`;
    console.info(`Sever running at ${chalk.green(addr)}`);
});