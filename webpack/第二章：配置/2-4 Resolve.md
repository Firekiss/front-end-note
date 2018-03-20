## 2-4 Resolve

Webpack 在启动后会从配置的入口模块出发找出所有依赖的模块，Resolve配置Webpack如姐寻找模块所对应的文件。Webpack内置Javascript模块化语法解析功能，默认会采用模块化标准里约定好的规则去寻找，但你也可以根据自己的需要修改默认的规则。

### alias

`resolve.alias` 配置项通过别名来把原导入路径映射成一个新的导入路径。例如使用一下配置:

```js
resolve: {
  alias: {
    components: './src/components/'
  }
}
```

当你通过`import Buttom from 'compnents/button'`导入时，实际上被`alias`等价替换成了 `import Buttom from './src/components/button'`

以上 alias 配置的含义是吧导入语句里的 `components`关键字替换成`./src/components`。

这样做可能会命中太多的导入语句，alias还支持`$`符号来缩小范围只命中以关键字结尾的导入语句：

```js
resolve: {
  alias: {
    'react$': '/path/to/react.min.js'
  }
}
```

`react$`只会命中以`react`结尾的导入语句，即只会把`import 'react'` 关键字替换成`import '/path/to/react.min.js'`。

### mainFields

有一些第三方模块会针对不同环境提供几分代码。例如分别提供采用ES5和ES6的两份代码，这两份代码的位置写在`package.json`文件里，如下：

```js
{
  'jsnext:main': 'es/index.js', // 采用ES6 语法的代码入口文件
  'main': 'lib/index.js' // 采用 ES5 语法的代码入口文件
}
```

Webpack会根据`mainFields`的配置去决定优先采用哪份代码，`mainFields`默认如下:

```js
mainFields: ['browser', 'main']
```

Webpack会按照数组里面的顺序去`package.json`文件里寻找，只会使用找到的第一个。

如果你想优先采用ES6那份代码，可以这样配置：

```js
mainFields: ['jsnext:main', 'browser', 'main']
```

### extensions

在导入语句没带文件后缀时，Webpack会自动带上后缀去尝试访问文件是否存在。`resolve.extensions`用于配置在尝试过程中用到的后缀列表，默认是:

```js
extensions: ['.js', '.json']
```

也就是说当遇到`require('./data')`这样的导入语句时，Webpack会先去寻找`./data.js`文件，如果该文件不存在就去寻找`./data.json`文件，如果还是找不到就报错。

假如你想让Webpack优先使用目录下的TypeScript文件，就可以这样配置：

```js
extensions: ['.ts', '.js', '.json']
```