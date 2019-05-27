// 可以获取一个字符所占用的字节数
// Buffer.byteLength();

// 连接两个 buffer 返回一个新的buffer， 如果连接buffer只有一个，还是返回这个buffer
Buffer.concat2 = function(bufferList, len=bufferList.reduce((total, buffer) => total += buffer.length, 0)) {
    if (bufferList.length === 1) return bufferList[0];
    let retBuffer = Buffer.alloc(len);
    let i = 0;
    for(buffer of bufferList) {
        for (byte of buffer) {
            retBuffer[i] = byte;
            i++;
        }
    }
    return retBuffer;
}

ret = Buffer.concat2([Buffer.from('南通'), Buffer.from('海门')]);
console.log(ret.toString());