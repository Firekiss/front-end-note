const http = require('http')


// 可写流
req = http.request({
    method: 'POST',
    host: 'localhost',
    port: 8080,
    path: '/index.html',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

req.on('response', res => {
    const chunks = []

    res.on('data', chunk => {
        chunks.push(chunk)
    })

    res.on('end', () => {
        const bufs = Buffer.concat(chunks)
        console.log(bufs.toString())
    })
})


// req.write('name=alex&age=23')
req.end()