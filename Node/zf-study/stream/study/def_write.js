const { Writable } = require('stream')


const writeOneMillionTimes = (writer, data, encoding, callback) => {
    let i = 10000
    
    const write = () => {
        let ok = true
        while(i-- && ok) {
            ok = writer.write(data, encoding, i === 0 ? callback : null)
        }
        if (i > 0) {
            console.log('drain', i)
            writer.once('drain', write)
        }
    }

    write()
}


const writer = new Writable({
    write(chunk, encoding, callback) {
        setTimeout(() => {
            callback && callback()
        })
    }
})

writeOneMillionTimes(writer, 'simple', 'utf8', () => {
    console.log('end')
})