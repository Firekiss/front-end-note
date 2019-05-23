// 表示分配一个长度为 6 个字节的 Buffer
// 会把所有的字节都设置为0
let buf1 = Buffer.alloc(6);
console.log(buf1);

// 分配一块没有初始化的内存
let buf2 = Buffer.allocUnsafe(60);
console.log(buf2); 

// 初始化设置内容为'前端'的二进制
let buf3 = Buffer.from('前端');
console.log(buf3);

let buf4 = Buffer.alloc(6);
// 填充 第一个参数代表填充的数字 第二个参数代表填充的开始索引 第三个代表结束索引
buf4.fill(3, 2, 4); // <Buffer 00 03 03 00>
console.log(buf4);