## 2-1 Entry

`entry`是配置模块的入口，可以抽象成输入， Webpack执行构建的第一步将从入口开始搜寻及递归解析出所有入口依赖的模块。

必填配置

### context

Webpack在寻找**相对路径**的文件时会以`context`为根目录，`context`默认为执行启动Webpack时所在的当前工作目录。如果想修改`context`的默认配置，则可以在配置文件这里设置它:

```js
module.export = {
  context: path.resolve(__dirname, 'app')
}
```

注意，`context`必须是一个绝对路径的字符串。除此之外，还可以在启动Webpack时带上参数`webpack --context`来设置`context`

之所以在这里先介绍`context`，是因为Entry的路径和其依赖的模块的路径可能采用相对于`context`的路径来描述，`context`会影响到这些相对路径所指向的真实文件。

### Entry类型

Entry 类型可以是以下三种中的一种或者相互结合:

类型|例子|含义
| :--------:   | :-----:   | :----: |
string | `'./app/entry'` | 入口模块的文件路径，可以是相对路径。
array | ['./app/entry1', './app/entry2'] | 入口模块的文件路径，可以是相对路径。
object | {a: ./app/entry-a', b: ['./app/entry-b1', './app/entry-b2']} | 配置多个入口,每个入口生成一个Chunk

如果是`array`类型，则搭配`output.library`配置项使用时，只有数组里的最后一个入口文件的模块会被导出。

将多个不相关的文件打包在一起常常会使用数组的形式,比如导报vendor第三方等等.

### Chunk名称

Webpack 会为每个生成的Chunk取一个名称，Chunk的名称和Entry的配置有关：

* 如果`entry`是一个`string`或`array`,就只会生成一个Chunk，这时Chunk的名称是`main`;

* 如果`entry`是一个`object`,就可能会出现多个Chunk，这时Chunk的名称就是`object`键值对里键的名称。

字符串类型和数组类型都是 key-value对象类型的简化形式

**key可以是路径字符串**.此时webpack会自动生成路径,并且将路径的最后作为[name].


### 配置动态Entry

假如项目里有多个页面需要为每个页面的入口配置一个Entry，但这些页面的数量可能会不断增长，则这时Entry 的配置会受到其他因素的影响导致不能写成静态的值。其解决方法是把Entry设置成一个函数去动态返回上面所说的配置。

```js
// 同步函数
entry: () => {
  return {
    a: './pages/a',
    b: './pages/b'
  }
};

// 异步函数
entry: () => {
  return new Promise((resolve) => {
    resolve({
      a: './pages/a',
      b: './pages/b',
    })
  })
}
```

相关博文

[webpack解惑：多入口文件打包策略](https://www.cnblogs.com/lvdabao/p/5944420.html)

