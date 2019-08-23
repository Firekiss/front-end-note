const dgram = require('dgram')


const socket = dgram.createSocket('udp4')

// 收消息
socket.bind(41234, 'localhost')
// 监听对方发来的消息
socket.on('message', (err, rinfo) => {
    console.log(rinfo)
})
