module.exports = {
    hostname: '127.0.0.1',
    port: 9527,
    root: process.cwd(),//返回 Node.js 进程当前工作的目录。
    compress: /\.(html|js|css|md|json)/,    //配置服务器支持的压缩方式
    cache: {    //配置服务器支持的缓存情况
        maxAge: 600,    //服务器认为自己文件有效的秒数，也就是说10分钟内这个文件就用本地缓存的
        expires: true,  //Expires 响应头包含日期/时间， 即在此时候之后，响应过期。如果在Cache-Control响应头设置了 "max-age" 或者 "s-max-age" 指令，那么 Expires 头会被忽略。
        cacheControl: true,  //是否支持CacheControl  
        lastModified: true, //是否支持last modified
        etag: true  //是否支持etag
    }
};