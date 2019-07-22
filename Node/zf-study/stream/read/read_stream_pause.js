// 编写可读流类 暂停模式


const fs = require('fs')
const EventEmitter = require('events')


class ReadStream extends EventEmitter {
    constructor(path, opts) {
        super()
        this.path = path
        this.flag = opts.flag || 'r'
        this.mode = opts.mode || 0o666
        this.encoding = opts.encoding || 'utf8'
        // 默认的可读流一次性可读 64k 个字节
        this.highWaterMark = opts.highWaterMark || 64 * 1024
        this.start = opts.start || 0
        this.end = opts.end
        this.pos = this.start
        this.autoClose = opts.autoClose || true
        this.buffer = Buffer.alloc(this.highWaterMark)
        this.flowing = null
        this.finished = false
        this.open()
    }

    // 打开文件
    open() {
        fs.open(this.path, this.flag, this.mode, (err, fd) => {
            if (err) {
                return this.emit('error', err)
            }

            this.fd = fd
            this.emit('open')
        })
    }

    close() {
        fs.close(this.fd, err => {
            if (err) {
                return this.emit('error', err)
            }

            this.emit('close')
        })
    }

    read(n) {
        
    }
}


module.exports = ReadStream