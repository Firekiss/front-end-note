const fs = require('fs')


const rs = fs.createReadStream('./r.txt', {
    highWaterMark: 3,
    encoding: 'utf8'
})


const ws = fs.createWriteStream('./w.txt', {
    flags: 'w',
    mode: 0o666,
    start: 0,
    encoding: 'utf8',
    highWaterMark: 3
})


rs.on('data', data => {
    let flag = ws.write(data)
    // 当写入流的缓冲区已经满了 暂停读取
    if (!flag) {
        rs.pause()
    }
})

ws.on('drain', () => {
    console.log('drain')
    rs.resume()
})

