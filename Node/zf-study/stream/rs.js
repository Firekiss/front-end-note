const fs = require('fs')


// 创建一个可读流对象
const rs = fs.createReadStream('./1.txt', {
    highWaterMark: 3
})


// 打开文件的时候触发
rs.on('open', () => {
    console.log('打开文件')
})


// 从可读流中读取数据的时候触发
rs.on('data', data => {
    console.log(data)
})


// 可读流中的数据读取完毕之后触发
rs.on('end', () => {
    console.log('读取完毕')
})

// 关闭文件的时候触发
rs.on('close', () => {
    console.log('关闭文件')
})