const net = require('net')
const fs = require('fs')
const path = require('path')


const ws = fs.createWriteStream(path.join(__dirname, 'msg.txt'))

const server = net.createServer(socket => {
    // 客户端每一次传入了新的值
    // 服务端都会触发 data 事件
    socket.pipe(ws, { end: false})
})


server.listen(8080)