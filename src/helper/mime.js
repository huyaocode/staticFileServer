const path = require('path');

const mimeTypes = {
    'css': 'text/css',
    'gif': 'image/gif',
    'html': 'text/html',
    'ico': 'image/x-icon',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'txt': 'text/plain; charset=utf-8'
};

module.exports = (filePath) => {
    let ext = path.extname(filePath).toLowerCase();
    //path.extname() 方法返回 path 的扩展名，即从 path 的最后一部分中的最后一个 .（句号）字符到字符串结束。 
    //如果 path 的最后一部分没有 . 或 path 的文件名（见 path.basename()）的第一个字符是 .，则返回一个空字符串。
    if(!ext) {
        ext = filePath;
    }
    return mimeTypes[ext] || mimeTypes['txt'];
};