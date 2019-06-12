const fs = require('fs')
const path = require('path')


// 先序深度优先的递归
const preDeep = (dir, cb) => {
    fs.stat(dir, (err, stats) => {
        if (err) {
            console.error(`读取文件 ${dir} 的状态发生错误 ${err}`)
        } else {
            // 判断当前读取的文件是否是文件夹
            if (stats.isDirectory()) {
                fs.readdir(dir, (err, files) => {
                    if (err) {
                        console.error(`读取文件目录 ${dir} 下的文件列表的时候发生错误 ${err}`)
                    } else {
                        // 执行同级树的下一个节点的方法
                        !function next(i) {
                            // 当前节点下的子节点都已经遍历完毕 执行cb
                            if (i >= files.length) return cb()
                            // 当前子节点的路径
                            const curPath = path.join(dir, files[i])
                            fs.stat(curPath, (err, stats) => {
                                if (err) {
                                    console.error(`获取 ${curPath} 的状态发生错误 ${err}`)
                                } else {
                                    console.log(curPath)
                                    if (stats.isDirectory()) {
                                        preDeep(curPath, () => {
                                            next(i + 1)
                                        })
                                    } else {
                                        next(i + 1)
                                    }
                                }
                            })
                        }(0)
                    }
                })
            } else {
                console.log(dir)
            }
        }
    })
}

preDeep('a', () => {
    console.log('完成递归')
})