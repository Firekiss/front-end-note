## 车300前端业务代码改进实践与设想

目的: 提高代码的可读性  提高代码的复用性

### 为什么一定要使用 === 而非使用 == 

* 弱类型语言的弊端
  
  1. 减弱了大家阅读代码与使用代码时对数据类型的直观感受
  
  ```js
  function getPersonName(id) {}
  ```

  ```java
  public static String getPersonName(int id) {}
  ```

  2. 同样是脚本语言, js的自动隐式转换大大增加了代码出错的概率
  
  ```js
  1 == '1'  // true
  ```

  ```python
  1 == '1'  // False
  ```

  ```js
  1 == ['1'] // true  what!!??
  ```

* 暂时还没有对js进行强类型的检测实践
  
  1. 使用TS  有一定的学习成本
  2. flow检查  FB的项目,对react的支持比较好,vue则几乎没有用
   

### 思考如何编写优雅的异步代码(代码的混乱很多时候是由于嵌套的异步所导致的)

* [js异步函数执行顺序与轮询](https://segmentfault.com/a/1190000015891460)
  大异步 : setTimeout  setInterval
  小异步 : promise的then

  ```js
  setTimeout(() => {
    console.log(1);
  }, 0);

  new Promise((resolve, reject) => {
    console.log(2);
    resolve()
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(4);
  })

  console.log(5);
  ```

* 常用的异步解决方案

  回调函数  (×) 

  Promise  (√)

  ES6+ Generator 和 async/await (?)


### vue中何组件与工具库的封装

* 将于dom打交道的内容封装成 vue组件
* 将纯碎的数据处理封装成工具类(反面教材 simple-h5)
* 多多使用一些类似与lodash的库,简化数据处理的过程,提高的代码可读性

原则: 非组件的业务代码页面如app.vue不能够有任何的dom操作,所有的dom操作都是应该放在component里面的, 业务代码只做一件事情,处理数据.
(反面教材: unit-h5projs: wheel)

### cp后台的封装实践(非单页面)

* scss封装实践
* mixin封装实践
  


  
