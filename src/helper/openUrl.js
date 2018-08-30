/**
 * 自动在浏览器中打开页面
 */
const { exec } = require('child_process');

module.exports = url => {
    switch (process.platform) {
    case 'darwin':
        exec(`open ${url}`);
        break;
    case 'win32':
        exec(`start ${url}`);
        break;
    }
};