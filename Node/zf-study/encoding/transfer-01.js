
let a = 0b10010;
let b = 0o111;
let c = 0x11;

// 任意进制值转为10进制
// parseInt(需要转换的值, 按照什么什么进制进行计算)
console.log(parseInt(0b10010));
console.log(parseInt(0o111));
console.log(parseInt(0x11));
console.log(parseInt(17, 16));

// 任意进制之间的转换
// (需要被转换的值).toString(转换成的进制数)
console.log(0b10010.toString(8));
