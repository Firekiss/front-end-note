const fs = require('fs')


const ws = fs.createWriteStream('./2.txt', {
    flags: 'w',
    mode: 0o666,
    encoding: 'UTF8',
    highWaterMark: 3,
    start: 0
})

let flag = ws.write('1')
console.log(flag)
flag = ws.write('2')
console.log(flag)
flag = ws.write('3')
console.log(flag)
flag = ws.write('4')
console.log(flag)