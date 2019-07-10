const WriteStream = require('./my-write-stream')


let v = 9
let flag = true
const ws = new WriteStream('./1.txt', {
    high_water_mark: 3
})

ws.on('open', () => {
    console.log('open success!')
})

ws.on('error', err => {
    console.log(`err exception >>> ${err}`)
})

ws.on('close', () => {
    console.log('close success!')
})


function write() {
    while(flag && v) {
        flag = ws.write(String(v))
        console.log('flag >>> ', flag)
        v--
    }
    ws.once('drain', () => {
        flag = true
        write()
    })
}

write()




