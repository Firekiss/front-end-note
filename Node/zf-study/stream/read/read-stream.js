/**
 * 手动实现 readStream 的学习代码
 */


const EventEmitter = require('events')


class ReadStream extends EventEmitter {
    constructor(path, opts){
        super()
        this.path = path
        this.flags = opts.flags || 'r'
        this.mode = opts.mode || 0o666
        this.highWaterMark = opts.highWaterMark || 64 * 1024  // 最高水位线时64k
        this.start = opts.start || 0
        this.end = opts.end
        this.pos = this.start
        this.encoding = opts.encoding
        this.open()
    }
}