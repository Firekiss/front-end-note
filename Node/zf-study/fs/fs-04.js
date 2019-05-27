// 文件拷贝方法

const fs = require('fs');

function copy(origin, target) {
    // 打开源文件
    fs.open(origin, 'r', function(err, readFd){
        if (err) {
            console.error(`打开源文件的时候异常 >>> ${err}`);
        }
        
        // 打开目标写入文件
        fs.open(target, 'w', function(err, writeFd){
            if (err) {
                console.error(`打开写入文件的时候异常 >>> ${err}`);
            }

            const unitBuffSize = 3;
            let unitBuff = Buffer.alloc(unitBuffSize);

            !(function unitCopy(){
                fs.read(readFd, unitBuff, 0, unitBuffSize, null, function(err, bytesRead){
                    if (err) {
                        console.error(`读取单位字节时发生错误 >>> ${err}`);
                    }
                    console.log(`当前写入的字符为${unitBuff}`);

                    if (bytesRead > 0) {
                        fs.write(writeFd, unitBuff, 0, bytesRead, null, function(err, written) {
                            if (err) {
                                console.error(`写入单位字节时发生错误 >>> ${err}`);
                            }

                            unitCopy();
                        })
                    } else {
                        fs.fsync(writeFd, function(err){
                            if (err) console.log(`将缓存数据写入文件发生异常 ${err}`);

                            fs.close(writeFd, function(err){
                                if (err) console.log(`将写入文件关闭发生异常 ${err}`);

                                fs.close(readFd, function(err){
                                    if (err) console.log(`将读取文件关闭发生异常 ${err}`);
                                })
                            });
                        });
                    }
                    
                })
            })();
        });
    });
}

copy('./origin.txt', './copied.txt');