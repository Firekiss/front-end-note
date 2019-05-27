const fs = require('fs');

// flag 
// r 读文件，文件不存在报错
// r+ 读并写入，文件不存在报错
// rs 同步读取文件并忽略缓存
// w 写入文件，不存在则创建，存在则清空
// wx 排它写入文件
// w+ 读取并写入文件，不存在则创建，存在则清空
// wx+ 和w+类似,排它方式打开
// a 追加写入
// ax 排它方式追加写入
// a+ 读取并追加写入，不存在则创建
// ax+ 与a+相似，但是排它

fs.readFile('./1.txt', {
    flag: 'r',
    encoding: 'utf-8',
}, function(err, data) {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
});