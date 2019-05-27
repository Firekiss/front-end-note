// 当我们需要操作的文件比较大的时候 不能够整个读取文件到内存之中
// 需要精确的控制读取的字节数

// console.log => process.stdout.write
// process.stdout.write('i can write \n');
// // console.error => process.stderr.write
// process.stderr.write('error write');

// process.stdin.on('data', function(data){
//     console.log(data);
// })

const fs = require('fs');

fs.open('./1.txt', 'r', function(err, fd){
    let buff = Buffer.alloc(10);
    fs.read(fd, buff, 0, 6, 0, function(err, bytesRead, buffer) {
        console.log(buff.toString());
    });
});