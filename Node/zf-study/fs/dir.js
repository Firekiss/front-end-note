const fs = require('fs')
const path = require('path')

// 递归删除一个文件夹下面所有的文件
const rmdirp = (dir) => {
    return new Promise((resolve, reject) => {
        fs.stat(dir, (err, stats) => {
            if (err) {
                return reject(`读取文件属性发生错误>>> ${err}`)
            } else {
                // 判断是不是文件夹
                if (stats.isDirectory()) {
                    fs.readdir(dir, (err, files) => {
                        if (err) {
                            return reject(`读取${dir}目录下面的文件列表的时候发生错误${err}`)
                        }

                        Promise.all(files.map(file => {
                            return rmdirp(path.join(dir, file))
                        })).then(() => {
                            fs.rmdir(dir, err => {
                                if (err) return reject(`删除文件夹${dir}时发生错误 >>> ${err}`)
                                resolve(`删除文件夹${dir}成功`);
                            })
                        })
                    })
                } else {
                    fs.unlink(dir, err => {
                        if (err) {
                            return reject(`删除文件的时候发生错误>>> ${err}`)
                        }
                        resolve(`删除文件 ${dir} 成功!`)
                    })
                }
            }
        })
    })
}

rmdirp('wjj')