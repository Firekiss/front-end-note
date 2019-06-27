

// 行读取器编写
// 写一个类 然后传入一个文件的路径得到类的实例
// 可以监听它的newLine事件,当这个行读取器每次读到一行的时候，就会向外发射newLine事件，当读到结束的时候就会发射end事件


const EventEmitter = require('events')
const util = require('util')
const fs = require('fs')


const NEW_LINE = 0x0A  // 代表 \n
const RETURN = 0x0D    // 代表 \r


// 自定义的单行发射类
function ReadLine(filePath, opts) {
    EventEmitter.call(this)

    // 单行字节数组
    this.buffers = []
    this.encoding = opts.encoding
    this.on('newListener', (eventName, listener) => {
        if (eventName === 'newLine') {
            console.log('start listen newLine event')
            // 生成一个 pause 的可读流
            this._reader = fs.createReadStream(filePath)
            // 绑定可读流全部读取完毕的事件
            this._reader.on('end', () => {
                this.emit('newLine', Buffer.from(this.buffers).toString(this.encoding))
                this.emit('end')
            })
            this._reader.on('readable', () => {
                // 读取一个字节
                let ret;
                // 如果文本内容全部都读完了，再往下读就会读到 null
                while (null !== (ret = this._reader.read(1))) {
                    // windows 平台下面的换行是 \r\n
                    // unix    平台下面的换行是 \n
                    // maxOs   平台下面的换行是 \r
                    // 单次读到的是一个 buffer 所以具体的值要通过 buffer[0]来获取第一个值
                    if (ret[0] === RETURN) {
                        this.emit('newLine', Buffer.from(this.buffers).toString(this.encoding))
                        // 使用这种方法可以快速的清空数组
                        this.buffers.length = 0
                        const nextChar = this._reader.read(1)
                        if (nextChar[0] !== NEW_LINE) this.buffers.push(nextChar[0])
                    } else if (ret[0] === NEW_LINE) {
                        this.emit('newLine', Buffer.from(this.buffers).toString(this.encoding))
                        this.buffers.length = 0
                    } else {
                        this.buffers.push(ret[0])
                    }
                }
            })
        }
    })
}

// 单行发射类继承自事件类
util.inherits(ReadLine, EventEmitter)

// 导出模块
module.exports = ReadLine