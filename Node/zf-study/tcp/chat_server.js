const net = require('net')


const userMap = {}
const server = net.createServer({})

// 广播方法
const broadcast = (exceptUsername, data) => {
    for (let username in userMap) {
        if (username !== exceptUsername) {
            userMap[username].write(data)
        }
    }
}

server.on('connection', socket => {
    let username = ''

    // 异步获取当前总共连接的客户端的数目
    server.getConnections((err, count) => {
        if (err) {
            console.error('获取总连接客户端数目的时候发生错误 >>> ', err)
        }
        socket.write(`欢迎进入聊天室, 当前聊天室有${count}人\n`)
        socket.write('请输入你的用户姓名: ')
    })
    socket.setEncoding('utf8')

    socket.on('data', data => {
        if (username) {
            broadcast(username, data)
        } else if (userMap[username]){
            socket.write('当前用户名称已经存在,请重新输入用户名: ')
        } else {
            username = data.replace('\r\n', '')
            userMap[username] = socket
            broadcast(username, `欢迎 ${username} 加入聊天室`)
        }
    })

    socket.on('end', () => {
        broadcast(username, `${username} 离开了聊天室`)
        socket.destroy()
        delete userMap[username]
    })
})

server.listen(8080, () => {
    console.log('服务器启动成功')
})