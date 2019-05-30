const fs = require('fs');


// 递归删除一个目录下的所有文件
const rmFilep = function(dirName) {
    fs.readdir(dirName, function(err, files) {
        if(err) {
            console.error(`读取 ${dirName} 目录下的文件的时候发生错我 ${err}`);
        } else {
            if(files.length) {
                files.forEach(fileItem => {
                    const filePath = dirName + '/' + fileItem;
                    fs.stat(filePath, function(err, stats) {
                        if(err) {
                            console.error(`读取文件 ${filePath} 状态发生错误 ${err}`)
                        } else {
                            if(stats.isDirectory()) {
                                rmFilep(filePath);
                            } else {
                                fs.unlink(filePath, function(err) {
                                    if(err) console.error(`删除文件 ${filePath} 发生错误 ${err}`);
                                });
                            }
                        }
                    });
                });
            } else {
                fs.mkdir(dirName, function(err) {
                    if(err) console.error(`删除文件夹 ${dirName} 发生错误 ${err}`);
                });
            }
        }
    });
}

rmFilep('./dir')