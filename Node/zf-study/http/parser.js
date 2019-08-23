const fs = require('fs')
const path = require('path')
const { StringDecoder } = require('string_decoder')

// 把buffer转成字符串 可以保证不乱码
const decoder = new StringDecoder()
// 将请求头数据转成对象
const parseHeader = headerStr => {
    let lines = headerStr.split(/\n/)
    let startLine = lines.shift()
    let starts = startLine.split(' ')
    console.log(starts)
    let method = starts[0]
    let url = starts[1]
    let protocal = starts[2]
    let protocalName = protocal.split('/')[0]
    let protocalVersion = protocal.split('/')[1]
    let headers = {}

    lines.forEach(line => {
        let row = line.split(': ')
        headers[row[0]] = row[1]
    })
    return { headers, method, url, protocalName, protocalVersion }
}
// parser 方法解析请求对象, 其实就是请求信息,解析出请求头,再传给我们的请求监听函数
const parser = (requestStream, requestListener) => {
    requestStream.on('readable', () => {
        let buf
        
        while (null != (buf = requestStream.read())) {
            let str = decoder.write(buf)

            // 匹配连续空两行
            if (str.match(/\n\n/)) {
                let vals = str.split(/\n\n/)
                let headers = vals.shift()
                let headerObj = parseHeader(headers)
                Object.assign(requestStream, headerObj)
                let body = vals.join('\n\n')
                requestListener && requestListener(requestStream)
            } else {
                
            }
        }
    })
}

let rs = fs.createReadStream(path.join(__dirname, 'req.txt'))
parser(rs, req => {
    console.log(req.method)
    console.log(req.url)
    console.log(req.headers)

    req.on('data', data => {
        console.log(data)
    })

    req.on('end', () => {
        console.log('请求处理结束, 开始响应 res.end()')
    })
})