// 编写可写流类

const fs = require('fs')
const EventEmitter = require('events')


class WriteStream extends EventEmitter {
    constructor(path, opts) {
        super()
        this.path = path
        this.flags = opts.flags || 'w'
        this.mode = opts.mode || 0o666
        this.start = opts.start || 0
        this.end = opts.end
        // 当前写入的位置
        this.pos = this.start
        // 默认的一次性可写入的字节数是 16k
        this.highWaterMark = opts.highWaterMark || 16 * 1024
        this.encoding = opts.encoding || 'utf8'
        // 当前可写流是否正在调用系统层进行写入
        this.writing = false
        // 缓存区
        this.cache = []
        // 缓存区所有字节的长度
        this.length = 0
        // 当发生异常的时候是否自动关闭当前的写入文件
        this.autoClose = opts.autoClose || true

        this.open()
    }

    // 打开需要写入的文件
    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) {
                return this.emit('error', err)
            }

            this.fd = fd
            this.emit('open')
        })
    }

    // 关闭已经打开的文件
    close() {
        fs.close(this.fd, err => {
            if (err) {
                return this.emit('error', err)
            }
            this.emit('close')
        })
    }

    write(chunk, cb) {
        let buffer

        // 确保即将写入的数据是 字节数组
        if (Buffer.isBuffer(chunk)) {
            buffer = chunk
        } else {
            buffer = Buffer.from(chunk, this.encoding)
        }

        if (!buffer.length) return
        // 防止需要写入的超过 end 指定的位置
        if (this.end && buffer.length + this.pos - 1 > this.end) {
            buffer = buffer.slice(0, this.end - this.pos + 1)
        }

        this.length += buffer.length

        // 可写流正在调用底层的方法写入数据
        if (this.writing) {
            // 将需要写入的数据存放在缓冲区之中
            this.cache.push({
                buffer,
                cb
            })
        } else {
            // 开始调用底层方法写入
            this.writing = true
            this._write(buffer, () => {
                cb && cb()
            })
        }

        // 已经缓存的字节数目是否已经大于最高水位线字节数
        return this.length < this.highWaterMark
    }

    // 真正的写入buffer的方法
    _write(buffer, cb) {
        // 如果文件还没有打开
        if (typeof this.fd !== 'number') {
            return this.once('open', () => {
                this._write(buffer, cb)
            })
        }

        fs.write(this.fd, buffer, 0, buffer.length, this.pos, (err, bytesWritten) => {
            if (err) {
                if (this.autoClose) this.close()
                return this.emit('error', err)
            }

            // 写入位置右移
            this.pos += bytesWritten
            // 减少缓存字节数
            this.length -= bytesWritten

            cb && cb()
            // 已经写到了结束位置
            if (this.end && this.pos >= this.end) {
                this.emit('end')
                return this.close()
            }

            this.clearCache()
        })
    }

    // 清除缓存区中的需要写入的数据
    clearCache() {
        let c = this.cache.shift()
        if (c) {
            this._write(c.buffer, c.cb)
        } else {
            this.writing = false
            this.emit('drain')
        }
    }
}


module.exports = WriteStream