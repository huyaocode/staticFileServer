const {cache} = require('../config/defaultConfig');

//根据stat生成ETag
function generateETag(stat) {
    const mtime = stat.mtime.getTime().toString(16);
    const size = stat.size.toString(16);
    return `W/"${size}-${mtime}"`;
}

function refreshRes(stats, res) {
    const {maxAge, expires, cacheControl, lastModified, etag} = cache;

    if(expires) {
        // Expires 响应头包含日期/时间， 即在此时候之后，响应过期。
        // 无效的日期，比如 0, 代表着过去的日期，即该资源已经过期。
        res.setHeader('Expires', (new Date(Date.now() + maxAge*1000)).toUTCString());
    }

    if(cacheControl) {
        res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
    }

    if(lastModified) {
        //stats.mtime表示修改时间
        res.setHeader('Last-Modified', stats.mtime.toUTCString());
    }
    if(etag) {  //添加etag
        res.setHeader('ETag', generateETag(stats));
    }
}
module.exports = function isFresh(stats, req, res) {

    //为返回的结果【res】添加缓存信息
    refreshRes(stats, res);

    //判断请求【req】是否让客户端继续使用缓存
    const lastModified = req.headers['if-modified-since'];
    const etag = req.headers['if-none-match'];
    //如果这两个信息都没有，说明他很有可能是第一次请求
    if(!lastModified && !etag) {
        return false;
    }
    // 如果有lastModified,并且宇设置的lastModified不一样，说明也过期了
    if(lastModified && lastModified !== res.getHeader('Last-Modified')) {
        return false;
    }
    //检测etag
    if(etag && etag !== res.getHeader('ETag')) {
        return false;
    }

    return true;    //表示让客户端继续用缓存
};