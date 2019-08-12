const { Readable } = require('stream')


const dataSource = {
    data: new Array(10).fill('1'),
    makeData() {
        if (!dataSource.data.length) return
        return dataSource.data.pop()
    }
}

class MyReadable extends Readable {
    constructor(dataSource, options) {
        super(options)
        this.dataSource = dataSource
    }

    _read() {
        const data = this.dataSource.makeData()
        this.push(data)
    }
}

const myReadable = new MyReadable(dataSource)
myReadable.setEncoding('utf8')
// data 事件的回调函数在可读流执行了 read 方法 && 有数据返回的时候触发
// myReadable.on('data', chunk => {
//     console.log(chunk)
// })


let once = false
// readable当有数据可以读或者当数据读完的时候都回去触发
// 缓冲池子最多可以读 highwatermark 个字节的数据
myReadable.on('readable', () => {
    let chunk
    // console.log('------')
    // while (null !== (chunk = myReadable.read())) {
    //     console.log(`Received ${chunk.length} bytes of data`)
    // }

    console.log(myReadable._readableState.buffer.length)
    console.log(myReadable.read())
})