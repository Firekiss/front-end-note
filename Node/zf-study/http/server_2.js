const http = require('http')
const querystring = require('querystring')


const port = 8080
const localhost = 'localhost'
const server = http.createServer()
server.on('request', (req, res) => {
    // 打印请求信息
    console.log(req.method)
    console.log(req.url)
    console.log(req.headers)

    const chunks = []
    req.on('data', chunk => {
        chunks.push(chunk)
    })

    req.on('end', () => {
        const bufs = Buffer.concat(chunks)
        const str = bufs.toString()
        console.log(querystring.parse(str))
    })

    res.statusCode = 200
    res.write('ok')
    res.end()
})

server.listen(8080, localhost, () => {
    console.log(`服务器已经在${localhost}:${port}启动了`)
})