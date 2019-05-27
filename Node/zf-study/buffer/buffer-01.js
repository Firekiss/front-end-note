// 表示分配一个长度为 6 个字节的 Buffer
// 会把所有的字节都设置为0
// let buf1 = Buffer.alloc(6);
// console.log(buf1);


// 分配一块没有初始化的内存
// let buf2 = Buffer.allocUnsafe(60);
// console.log(buf2); 


// 初始化设置内容为'前端'的二进制
let buf3 = Buffer.from('前端');
// console.log(buf3);


let buf4 = Buffer.alloc(6);
// 填充 第一个参数代表填充的数字 第二个参数代表填充的开始索引 第三个代表结束索引
buf4.fill(3, 2, 4); // <Buffer 00 03 03 00>
// console.log(buf4);


let buf5 = Buffer.alloc(6);
// 往buf5之中写入占用8个 byte (1个字节) 的整数
// 第一个参数代表往 buffer 之中写入的数字  第二个参数代表写入的索引
buf5.writeInt8(1, 0);
buf5.writeInt8(16, 1);
buf5.writeInt8(32, 2);
// <Buffer 01 10 20 00 00 00>
// console.log(buf5);


let buf6 = Buffer.alloc(4);
// BE 大头在前
// LE 小头在前
buf6.writeInt16BE(256, 0);
// console.log(buf6);

let buf7 = Buffer.from('你好');
console.log(buf7.length);