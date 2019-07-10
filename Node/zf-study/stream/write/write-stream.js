const fs = require('fs')
const EventEmitter = require('events')


/**
 * 手写可写流类
 */
class WriteStream extends EventEmitter{
    constructor(path, opts) {
        super()

        this.path = path
        this.flags = opts.flags || 'w'
        this.mode  = opts.mode || 0o666
        this.start = opts.start || 0
        this.encoding = opts.encoding || 'utf8'
        this.autoClose = opts.autoClose || true  // 当流写完之后自动关闭文件
        this.highWaterMark = opts.highWaterMark || 16 * 1024  // 默认缓冲区的大小是16k
        this.pos = this.start
        
        this.writing = false  // 文件内部正在写入数据
        this.length  = 0  // 表示缓存区字节的长度
        this.buffers = [] // 缓冲区
        this.open()
    }

    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {

            if (err) {
                if (this.autoClose) this.destory()
                return this.emit('error', err)
            }
            this.fd = fd
            this.emit('open')
        })
    }

    // 关闭文件
    destory() {
        fs.close(this.fd, err => {
            if (err) {
                return thie.emit('error', err)
            }
            this.emit('close')
        })
    }

    write(chunk, encoding, cb) {
        // 重新计算缓存区的长度
        this.length += chunk.length
        // 如果底层正在写数据 那么当前的数据便写入缓冲区之中
        if (this.writing) {
            chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, this.encoding)
            // 进行缓存
            this.buffers.push({
                chunk,
                encoding,
                cb
            })
        } else {
            // 状态改变
            this.writing = true
            // 直接调用底层的写入方法进行写入
            this._write(chunk, encoding, () => this.clearBuffer())
        }
        // 返回当前的缓冲区内的字节数是否小于最高水位
        return this.length < this.highWaterMark
    }

    _write(chunk, encoding, cb) {
        // 如果写入的时候文件还没有被打开
        if (typeof this.fd !== 'number') {
            return this.once('open', () => this._write(chunk, encoding, cb))
        }
        fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err, bytesWritten) => {
            if (err) {
                this.destory()
                this.emit('error', err)
            }
            // bytesWritten 代表被写入的字节数目 pos值的改变表示下次从接下去的位置继续写 
            this.pos += bytesWritten
            this.length -= bytesWritten
            cb && cb()
        })
    }

    clearBuffer() {
        // 取出缓存区中的第一个缓存对象
        let data = this.buffers.shift()
        if (data) {
            this._write(data.chunk, data.encoding, () => this.clearBuffer())
        } else {
            this.writing = false
            // 缓存区清空了
            this.emit('drain')
        }
    }
} 


module.exports = WriteStream