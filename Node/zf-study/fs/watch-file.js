const fs = require('fs')

// 监视一个文件的改变

fs.watchFile('watch.txt', (curr, prev) => {
    console.log(curr.ctimeMs, prev.ctimeMs)
    let curTimeStamp = curr.ctimeMs;
    let preTimeStamp = prev.ctimeMs;

    if (preTimeStamp === 0) {
        console.log('文件是新创建的')
    } else if (curTimeStamp === 0) {
        console.log('文件被删除')
    } else {
        console.log(`文件更新时间 ${curTimeStamp}`)
    }
})