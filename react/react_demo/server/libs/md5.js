const baseConfig = require('../config');
const crypto = require('crypto');


// 往hash对象中添加摘要内容
// md5.update(str);

// 使用 digest 方法输出摘要内容，不使用编码格式的参数 其输出的是一个Buffer对象
// console.log(md5.digest()); 
// 输出 <Buffer 90 01 50 98 3c d2 4f b0 d6 96 3f 7d 28 e1 7f 72>

// 使用编码格式的参数，输出的是一个字符串格式的摘要内容
// console.log(md5.digest('hex')); // 输出 900150983cd24fb0d6963f7d28e17f72
module.exports = function (str) {
    // 创建一个hash对象
    const md5 = crypto.createHash('md5');
    md5.update(baseConfig.MD5_KEY + str);
    return md5.digest('hex');
}