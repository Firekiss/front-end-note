const fs = require('fs')


const rs = fs.createReadStream('./1.txt', {
    start: 2,
    end: 8,
    encoding: 'utf8'
})


rs.on('open', () => {
    console.log('rs open')
})

rs.on('close', () => {
    console.log('rs close')
})