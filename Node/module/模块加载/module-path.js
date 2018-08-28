
console.log(module.paths)
// 第一次 会按照 路径分析 文件查找 编译运行的顺序执行
// 第二次会直接从缓存中获取编译运行好的对象
let mod1 = require('./module-a')
let mod2 = require('./module-a')
console.log(mod1 === mod2)
console.log(require.main)
console.log(require.resolve('./module-a'))