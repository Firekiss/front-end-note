const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')
const { promisify } = require('util')
const mime = require('mime')


const port = 8080
const host = 'localhost'
const server = http.createServer()
// 将检查用户对文件处理权限的方法从异步改为使用promise处理
const access = promisify(fs.access)

// 服务端监听客户端连接的处理函数
async function requestHandler(req, res) {
    const { pathname } = url.parse(req.url)
    const filename = path.join(__dirname, pathname)
    try {
        await access(filename, fs.constants.F_OK)
        res.statusCode = 200
        res.setHeader('Content-Type', mime.getType(filename))
        const rs = fs.createReadStream(filename)
        rs.pipe(res)
    } catch (e) {
        res.statusCode = 404
        res.end('Not Found')
    }
}

server.on('request', requestHandler)
server.listen(port, host, () => {
    console.log(`服务器启动于${host}:${port}`)
})