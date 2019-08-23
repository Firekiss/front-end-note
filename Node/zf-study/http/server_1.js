// http服务模块是继承自tcp服务模块的
const http = require('http')
const url = require('url')


// req
// res
// 服务器监听客户端的请求,当有请求过来的时候执行回调函数
const server = http.createServer()

server.on('connection', socket => {
    console.log('客户端连接')
})

// > POST / HTTP/1.1
// > Host: localhost:8080
// > User-Agent: curl/7.54.0
// > Accept: */*
// > Content-Length: 9
// > Content-Type: application/x-www-form-urlencoded
// >

// req代表客户端的连接, server 服务器把客户端的请求信息进行解析,然后放在req上面
// res代表响应,如果希望向客户端回应消息,需要通过 res
server.on('request', (req, res) => {
    console.log(req.method)
    const {query, pathname} = url.parse(req.url, true)
    console.log(query)
    console.log(pathname)
    console.log(req.headers)

    let result = []
    req.on('data', data => {
        result.push(data)
    })
    req.on('end', () => {
        let r = Buffer.concat(result)
        console.log(r.toString())
        res.end(r)
    })
})

server.on('close', (req, res) => {
    console.log('服务器关闭')
})

server.on('error', err => {
    console.log('服务端发生错误', err)
})

server.listen(8080, () => {
    console.log('server started at http://localhost:8080')
})