const fs = require('fs')
const path = require('path')


const rs_path = path.join(__dirname, 'req.txt')
const rs = fs.createReadStream(rs_path, {
    highWaterMark: 3
})

rs.on('readable', () => {
    console.log('当前有可读的数据了')
    console.log(rs.read())
})

rs.on('end', () => {
    console.log('读到了数据的尽头')
})