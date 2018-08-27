module.exports = (totleSize, req, res) => {
    const range = req.headers['range'];
    if (!range) {
        return {code: 200};
    }

    const sizes = range.match(/bytes=(\d*)-(\d*)/);
    const end = sizes[2] || totleSize - 1;
    const start = sizes[1] || totleSize - end;
    //不规范的范围，是要直接一起返回，所以设置状态码200
    if(start > end || start < 0 || end > totleSize) {
        return {code: 200};
    }
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Content_Range', `bytes ${start}-${end}/${totleSize}`);
    res.setHeader('Content_Length', end-start);
    return {
        code: 206,
        start: parseInt(start),
        end: parseInt(end)
    }
};