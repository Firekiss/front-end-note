const fs = require('fs')
const path = require('path')
const { StringDecoder } = require('string_decoder')


// 字符转码实例
const strDecoder = new StringDecoder()
// mac空行的正则表达式
const emptyLineRegex = /\n\n/
// mac换行符正则表达式
const reRegex = /\n/
// 请求头字符串数据转成对象的方法
const headParse = (headStr) => {
    const reqLines = headStr.split(reRegex)
    const reqFirLine = reqLines.shift()
    const firLineDatas = reqFirLine.split(' ')
    const method = firLineDatas[0]
    const url = firLineDatas[1]
    const protocalDatas = firLineDatas[2].split('/')
    const protocalName = protocalDatas[0]
    const protocalVer = protocalDatas[1]
    const heads = {}

    reqLines.forEach(reqLine => {
        const reqLineDatas = reqLine.split(': ')
        heads[reqLineDatas[0]] = reqLineDatas[1]
    })

    return {
        method,
        url,
        protocalName,
        protocalVer,
        heads
    }
}
// 转换方法
const parser = (rs, parser_handler) => {
    // 字节容器
    const bufs = []
    const readableHandler = () => {
        // 读取可读流缓冲区中buffers
        const buf = rs.read()
        
        // 如果当前读到了有效数据
        if (buf !== null) {
            bufs.push(buf)
            const bufsConcated = Buffer.concat(bufs)
            const str = strDecoder.write(bufsConcated)
            if (str.match(emptyLineRegex)) {
                const reqSplits = str.split(emptyLineRegex)
                const head = reqSplits.shift()
                const body = reqSplits.join(emptyLineRegex)
                const heads = headParse(head)
                Object.assign(rs, heads)
                rs.removeListener('readable', readableHandler)
                rs.unshift(body)
                parser_handler && parser_handler(rs)
            }
        }
    }

    rs.on('readable',readableHandler)
}

// 实例化可读流
const rs = fs.createReadStream(path.join(__dirname, 'req.txt'))
// 执行转换放方法
parser(rs, req => {
    // 打印请求方法
    console.log('请求方法: ', req.method)
    // 打印请求路径
    console.log('请求路径: ', req.url)
    // 打印请求的协议名称
    console.log('请求协议: ', req.protocalName)
    // 打印请求的协议的版本号
    console.log('请求协议的版本号: ', req.protocalVer)

    req.on('data', chunk => {
        console.log('当前读到的数据: ', chunk)
    })

    req.on('end', () => {
        console.log('可读数据全部读完')
    })
})