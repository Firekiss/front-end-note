// 写入流测试

const WriteStream = require('./write_stream')


const ws = new WriteStream('./ws.txt', {
    // start: 2,
    end: 7,
    highWaterMark: 3
})

let flag = true
let i = 0
const l = 10

ws.on('open', () => {
    console.log('open')
})

ws.on('close', () => {
    console.log('close')
})

ws.on('end', () => {
    console.log('end')
})

ws.on('error', err => {
    console.log('err')
})

const write = () => {
    while(i < l && flag) {
        console.log('当前写入的值 ', i)
        flag = ws.write(String(i), () => {
            console.log(`成功地写入`)
        })
        i++
        if (i === l) {
            ws.close()
        }
    }

    ws.once('drain', () => {
        console.log('继续写入')
        flag = true
        write()
    })
}


write()
