const ReadStream = require('./read-stream')


const rs = new ReadStream('1.txt',{
    highWaterMark: 2,
    start: 1,
    end: 7,
    encoding: 'utf8'
})


rs.on('open', () => {
    console.log('open')
})

rs.on('close', () => {
    console.log('close')
})

rs.on('error', err => {
    console.log('error', err)
})

rs.on('end', () => {
    console.log('end')
})

rs.on('data', data => {
    console.log('data', data)
})


