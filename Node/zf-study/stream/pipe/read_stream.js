// 编写可读流类


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

        // 当实例去监听新的事件的时候触发
        this.on('newListener', (type, listener) => {
            // 当实例监听 data 事件的时候开启流动模式
            if (type === 'data') {
                // 状态变为流动模式
                this.flowing = true
                this.read()
            }
        })
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

    read() {
        // 文件的句柄还没有获取到的时候
        if (typeof this.fd !== 'number') {
           return this.once('open', this.read)
        }

        if (this.finished) return

        let howMuchRead

        if (this.end) {
            if (this.end - this.pos >= this.highWaterMark) {
                howMuchRead = this.highWaterMark
            } else {
                howMuchRead = this.end - this.pos + 1
            }
        } else {
            howMuchRead = this.highWaterMark
        }


        fs.read(this.fd, this.buffer, 0, howMuchRead, this.pos, (err, bytesRead) => {
            if (err) {
                this.emit('error', err)
                if (this.autoClose) return this.close()
                return
            }

            // 读取到的内容的长度 如果为0 说明文件内容已经全部读完
            if (bytesRead) {
                let data = this.buffer.slice(0, bytesRead)
                if (this.encoding) data = data.toString(this.encoding)
                this.pos += bytesRead
                this.emit('data', data)
                // 如果当前状态还是流动模式的话则继续读取下面的字节
                if (this.flowing) this.read()
            } else {
                this.emit('end')
                this.close()
                this.finished = true
            }
        })
    }

    // 暂停流的读取
    pause() {
        console.log('pause')
        this.flowing = false
    }

    // 恢复流的读取
    resume() {
        console.log('resume')
        this.flowing = true
        this.read()
    }

    // 管道方法
    pipe(ws) {
        this.on('data', data => {
            console.log('data', data)
            let flag = ws.write(data)
            if (!flag) this.pause()
        })

        ws.on('drain', () => {
            if (this.finished) {
                return ws.emit('close')
            } 
            this.resume()
        })
    }
}


module.exports = ReadStream