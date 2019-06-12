let str = '南通';
let fs = require('fs');

fs.open('./1.txt', 'w', (err, fd) => {
    if (err) {
        console.error(`打开操作文件的时候发生错误${err}`);
    } else {
        fs.write(fd, Buffer.from(str), 0, 6, null, (err, written) => {
            if (err) {
                console.error(`写入缓存的时候发生错误${err}`);
            } else {
                fs.fsync(fd, err => {
                    if (err) {
                        console.error(`将缓存数据写入文件的时候发生错误${err}`);
                    } else {
                        fs.close(fd, err => {
                            if (err) console.error(`关闭写入文件的时候发生错误${err}`)
                        });
                    }
                })
            }
        });
    }  
});