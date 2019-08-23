const http = require('http')


const server = http.createServer()

server.on('request', (req, res) => {
    res.end('ok')
})

server.listen(8080)