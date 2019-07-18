/**
 * 手动实现 readStream 的学习代码
 */


const EventEmitter = require('events')
const fs = require('fs')


class ReadStream extends EventEmitter {

    constructor(path, opts) {
        super()
        this.path = path
        this.flags = opts.flags || 'r'
        this.mode = opts.mode || 0o666
        this.highWaterMark = opts.highWaterMark || 64 * 1024  // 最高水位线时64k
        this.start = opts.start || 0
        this.end = opts.end
        this.pos = this.start
        this.encoding = opts.encoding
        this.autoClose = opts.autoClose
        this.flowing = null
        this.buffer = Buffer.alloc(this.highWaterMark)
        this.open()
        // 当实例绑定新的监听事件的时候触发
        this.on('newListener', (type, handler) => {
            if (type === 'data') {
                this.flowing = true
                this.read()
            }
        })
    }

    read() {
        if (typeof this.fd !== 'number') {
            return this.once('open', this.read)
        }

        // 当前此处阅读多少个字节
        let howMuchRead
        if (this.end) {
            // 可读字节数小于 最高水位 说明快读到 end 位置了
            howMuchRead = Math.min(this.end - this.pos + 1, this.highWaterMark)
        } else {
            howMuchRead = this.highWaterMark
        }

        fs.read(this.fd, this.buffer, 0, howMuchRead, this.pos, (err, bytesRead) => {
            if (err) {
                this.destory()
                return this.emit('error', err)
            }
            if (bytesRead) {
                let data = this.buffer.slice(0, bytesRead)
                data = this.encoding ? data.toString(this.encoding) : data
                this.emit('data', data)
                this.pos += bytesRead
                // 阅读结束
                if (this.end && this.pos > this.end) {
                    this.emit('end')
                    return this.destory()
                } else {
                    if (this.flowing) this.read()
                }
            } else {
                this.emit('end')
                return this.destory()
            }
        })
    }

    // 打开需要被读取的文件
    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) {
                return this.emit('error', err)
            }
            this.fd = fd
            this.emit('open')
        })
    }


    destory() {
        fs.close(this.fd, err => {
            if (err) {
                return this.emit('error', err)
            }
            this.emit('close')
        })
        
    }

    pipe(ws) {
        this.on('data', data => {
            let flag = ws.write(data)
            // 写入的缓冲区已经满了
            if (!flag) {
                this.pause()
            }
        })

        ws.on('drain', () => {
            this.resume()
        })
    }

    pause() {
        this.flowing = false
    }

    resume() {
        this.flowing = true
        this.read()
    }
}


module.exports = ReadStream