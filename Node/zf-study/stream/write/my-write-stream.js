/**
 * 自己编写一个可写流的类模块
 * 
 * 需求点
 * 
 * 入参 @param path {String} 文件地址
 *     @param opts {Object} 配置
 * 
 * event 
 * 
 * open 打开写入文件的时候触发
 * error 执行过程中发生错误的时候触发
 * drain 缓冲区中的数据全部都写入完毕的时候触发
 * close 关闭写入文件的时候触发
 * 
 * api
 * 
 * write(buffer|string)  写入字符串或者buffer
 * @return Boolean 代表缓冲区内缓冲的值是否已经超过了 high_water_mark
 */

const fs = require('fs')
const EventEmitter = require('events')


class WriteStream extends EventEmitter {
    constructor(path, opts = {}) {
        super()
        this.path = path
        this.buffers = []  // 缓冲区数组
        this.length = 0  // 缓冲区中当前缓存的字节长度值
        this.mode = opts.mode || 0o666
        this.flags = opts.flags || 'w'
        this.start = opts.start || 0
        this.high_water_mark = opts.high_water_mark || 16 * 1024  // 默认的缓冲区的大小是16k
        this.pos = this.start
        this.encoding = opts.encoding || 'utf8'
        this.writing = false  // 底层操作系统是否正在写入的状态标识符
        this.open()
    }

    // 打开当前路径所指定的文件
    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if(err) {
                this.destory()
                return this.emit('error', err)
            }
            this.fd = fd
            this.emit('open')
        })
    }

    // 关闭当前写入流方法打开的文件
    destory() {
        fs.close(this.fd, err => {
            if (err) {
                return this.emit('error', err)
            }
            this.emit('close')
        })
    }

    // 给用户使用的write方法
    write(chunk, encoding = 'utf8', callback) {
        // 如果需要写入的内容是字符串则将其转为buffer
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding)
        // 更新缓存区内字节数的长度
        this.length += chunk.length

        if (this.writing) {
            this.buffers.push({
                chunk,
                callback
            })
        } else {
            this.writing = true
            this._write(chunk, () => {
                callback && callback()
                this.clearBuffer()
            })
        }

        // 返回缓冲区的字节是否已经被填满
        return this.length < this.high_water_mark
    }

    // 真正的调用原生方法将buffer写入文件的方法
    _write(chunk, callback) {
        // 如果用户执行write方法的时候 文件还没有被打开
        if(typeof this.fd !== 'number') {
            return this.once('open', () => this._write(chunk, callback))
        }
        console.log(this.pos)
        fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err, bytesWritten) => {
            if (err) {
                this.destory()
                return this.emit('error', err)
            }
            this.length -= bytesWritten
            // 记录当前文件已经书写到的字节位置
            this.pos += bytesWritten
            callback && callback()
        })
    }

    // 将缓存区中的数据写入到文件之中
    clearBuffer() {
        const cache = this.buffers.shift()
        if (cache) {
            this._write(cache.chunk, () => this.clearBuffer())
        } else {
            this.writing = false
            this.emit('drain')
            console.log('drain')
        }
    }
}

module.exports = WriteStream