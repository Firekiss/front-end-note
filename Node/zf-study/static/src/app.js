// 创建一个服务器
const config = require('./config')
const http = require('http')
const chalk = require('chalk')
const url = require('url')
const path = require('path')
// 控制台输出模块
// 名称一般有两部分组成 第一部分是项目名称 第二部分是模块名称
const debug = require('debug')('static:app')
const util = require('util')
const { promisify } = require('util')
const fs = require('fs')
const mime = require('mime')

const stat = promisify(fs.stat)

class Server {
    constructor() {

    }

    start() {
        let server = http.createServer()
        server.on('request', this.request.bind(this))
        server.listen(config.port, () => {
            const url = `${config.host}:${config.port}`
            debug(`server started at ${chalk.green(url)}`)
        })
    }

    async request (req, res) {
        // 先获取到客户端想要获取的静态文件名称
        const { pathname } = url.parse(req.url)
        const filepath = path.join(config.root, pathname)
        try {
            const statObj = await stat(filepath)
            if (statObj.isDirectory()) {

            } else {
                this.sendFile(res, filepath)
            }
        } catch (e) {
            debug(util.inspect(e))
            this.sendError(res)
        }
    }

    sendError(res) {
        res.statusCode = 500
        res.end('some thing wrong in server')
    }

    sendFile(res, filepath) {
        res.setHeader('Content-Type', mime.getType(filepath))
        fs.createReadStream(filepath).pipe(res)
    }
}


const server = new Server()
server.start()


