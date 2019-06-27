const ReadLine = require('./ReadLine')


const readLiner = new ReadLine('./1.txt', {
    encoding: 'utf8'
})
readLiner.on('newLine', data => {
    console.log(data)
})

readLiner.on('end', () => {
    console.log('over')
})