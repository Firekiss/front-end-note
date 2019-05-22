// const module1 = require('./module-01');
/**
 * require 函数对象上有4个属性
 * 'resolve': 只想知道模块的路径，而不真正的加载这个模块 可以使用 require.resolve(模块相对路径)
 * 'main': 指代入口模块的地址
 * 'extensions': 
 * 在 node 里面模块的类型有三种 
 * 第一种叫 JS 模块
 * 第二种叫 json 模块 先找文件内容， JSON.parse 转成对象返回
 * 第三种叫 node 模块 C++扩展二进制模块
 * 'cache':  
 */
// console.log(Object.keys(require));
// console.log(require.resolve('./module-01'));
