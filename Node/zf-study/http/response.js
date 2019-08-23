const http = require('http')


const server = http.createServer((req, res) => {
    // 设置一个响应码
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html;charset=utf8')
    console.log(res.getHeader('Content-Type'))
    res.write('hello')
    res.write('world')
    res.end()
})

server.listen(8080)