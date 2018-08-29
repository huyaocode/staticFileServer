/**
 * 范围请求
 * @param {*} totleSize 总的范围
 * @param {*} req 
 * @param {*} res 
 */
module.exports = (totleSize, req, res) => {
    const range = req.headers['range'];
    if (!range) {
        return {code: 200};
    }
    const sizes = range.match(/(\d*)-(\d*)/);
    const end = sizes[2] || totleSize - 1;
    const start = sizes[1] || totleSize - end;
    //不规范的范围，是要直接一起返回，所以设置状态码200
    if(start > end || start < 0 || end > totleSize) {
        return {code: 200};
    }
    res.setHeader('Accept-Ranges', 'bytes');    //【格式】
    res.setHeader('Content_Range', `bytes ${start}-${end}/${totleSize}`);   //表示这次返回的起始和终止
    res.setHeader('Content_Length', end-start);     //【附加】表示这次返回的长度
    res.setHeader('start', start);     //【附加】表示这次返回的长度
    return {
        code: 206,
        start: parseInt(start),
        end: parseInt(end)
    };
};