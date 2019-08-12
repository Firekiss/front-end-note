const net = require('net')


// 创建一个服务器, 监听客户端的连接
// 当客户端连接上来之后执行监听函数
let server = net.createServer({}, function(socket){
    // socket 是一个双工流
    // 打印客户端信息
    console.log(socket.address())
    socket.setEncoding('utf8')
    socket.on('data', function(data) {
        console.log(data)
    })
    // 服务器收到客户端发出的关闭连接请求时,会触发end事件
    // 在这个地方客户端没有真正关闭,只是开始关闭, 当真正关闭的时候还会触发一个close事件
    socket.on('end', function() {
        console.log('客户端已关闭')
    })
    socket.on('close', function() {
        console.log('客户端真正关闭')
    })

    // 获取当前有多少个客户端正在连接服务器
    server.getConnections((err, count) => {
        console.log(`当前连接的客户端数量是 ${count}个`)
    })
})

server.listen(8080, function() {
    console.log(server.address())
    console.log('服务端已经启动')
})

