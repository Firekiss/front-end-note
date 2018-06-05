# ES6模块之export和import详解

导出模块(export)

ES6只支持静态导入和导出, 你只可以在模块的**最外层作用域**使用import和export,不可以在条件语句中使用,也不可以在函数作用域中使用import

如下是错误的

```js
function squre() {};
if(true) {
  export {squre};
}
```

1. 名字导出(name export)

名字导出可以在模块中导出多个声明.

```js
//------------ lib.js ------------
export const sqrt = Math.sqrt;
export function square(x) {
  return x * x;
}
export function add(x, y) {
  return x + y;
}

//--------------- main.js ---------
import { square, add } from 'lib';
console.log(square(10)); // 100
console.log(add(2, 4)); // 6
```

这样导入的变量名必须和导出的名字一致.以上对于每一个要导出的变量都加了export,我们也可以直接导出一个列表

```js
//-------------- lib.js ----------------
const sqrt = Math.sqrt;
function square(x){
  return x * x;
}
function add(x, y){
  return x + y;
}
export {sqrt, square, add}
```

export列表可以在模块文件最外层作用域的每一处声明,不一定非要把它放在文件的末尾.

```js
//------------ main.js --------------
import * as lib from 'lib';
console.log(lib.square(10)); //100  
console.log(lib.add(2,4));  //6 
```

2. 默认导出(default export)
一个模块只能有一个默认导出,对于默认导出,导入的名称可以和导出的名称不一致,这对于导出匿名函数或类非常有用.

```js
//---------- myFunc.js ----------
export default function(){...};

//---------- main.js ------------
import myFunc from 'myFunc';
myFunc();
```

注意这里默认导出不需要用{}.
当然也可以使用混合的导出.

```js
//--------- lib.js ----------------
export default function(){...};
export function each(){...};

//--------- main.js ---------------
import _,{ each } from 'lib';
```

## 重名export和import

为了解决导出命名冲突的问题, ES6为你提供了重命名的方法解决了这个问题

```js
// 这两个模块都会导出以`flip`命名的东西.
// 要同时导入两个, 我们至少要将其中一个的命名改掉.
import { flip as flipOmelet } from "eggs.js";
import { flip as flipHouse } from "real-estate.js";
```

导出的时候也可以使用别名

```js
export {
  v1 as streamV1,
  v2 as streamV2
}

import { default as foo } from 'lib';
import foo from 'lib';

const D = 123;
export { D as default };
```

3. 作为中转模块导出

有的时候为了避免上层模块导入的太多的模块,我们可以使用底层模块作为中转,直接导出另一个模块的内容如下:

```js
//------------- myFunc.js --------------
export default function(){...}

//------------- lib.js -----------------
export * from 'myFunc';
export function each(){...};

//------------- main.js ----------------
import myFunc, { each } from 'lib';
```

这样main.js只需要导入lib模块即可,虽然myFunc模块从lib模块导出,但是lib却不能使用myFunc模块的内容.