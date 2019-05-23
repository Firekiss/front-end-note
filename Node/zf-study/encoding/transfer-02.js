// Unicode编码的表现形式是十六进制
// utf-8编码 的表现形式是二进制的

// 将一个 Unicode 编码数字转成 utf-8编码
// 万 4E07
// 0100 1110 0000 0111
//  ||
//  || utf-8 的二进制
//  ||
// 11100100 10111000 10000111
// e4 b8 87
//console.log(0b11100100.toString(16), 0b10111000.toString(16), 0b10000111.toString(16));
//console.log(Object.keys(global));

// 全局对象上的 Buffer 的from方法可以直接把 Unicode 转为 utf-8
console.log(Buffer.from('万'));