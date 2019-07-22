const ReadStream = require('./read_stream')
const WriteStream = require('./write_stream')


const rs = new ReadStream('./ws.txt', {
    start: 2,
    end: 9,
    encoding: 'utf8',
    highWaterMark: 3
})

const ws = new WriteStream('./1.txt', {
    highWaterMark: 3
})

rs.on('open', () => {
    console.log('rs open')
})

rs.on('close', () => {
    console.log('rs close')
})

rs.on('error', err => {
    console.log('rs error', err)
})

rs.on('end', () => {
    console.log('rs end')
})

ws.on('open', () => {
    console.log('ws open')
})

ws.on('close', () => {
    console.log('ws close')
})

ws.on('error', err => {
    console.log('ws error', err)
})

ws.on('end', () => {
    console.log('ws end')
})

rs.pipe(ws)

