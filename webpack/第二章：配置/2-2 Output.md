## 2-2 Output

`output` 配置如何输出最终想要的代码。`output`是一个`object`,里面包含一系列配置项，下面分别介绍它们。

### filename

`output.filename`配置输出文件的名称，为string类型。如果只有一个输出文件，则可以把它写成静态不变的：

`filename: 'bundle.js'`

但是在有多个Chunk要输出时，就需要借助模板和变量了。前面说道Webpack会为每个Chunk取一个名称，可以根据Chunk的名称来区分输出的文件名：

`filename: '[name].js'`

代码里的`[name]`代表用内置的`name`变量去替换`[name]`,这时你可以把它看作一个字符串模板块函数,每个要输出的Chunk都会通过这个函数去拼接出输出的文件名称。

内置变量除了`name`还包括：

变量名   |含义
|:------:|:-----:|
id|Chunk的唯一标识，从0开始
name|Chunk的名称
hash|Chunk的唯一标识的Hash值
chunkhash|Chunk内容的Hash值

其中`hash`和`chunkhash`的长度是可指定的，`[hash:8]`代表取8位Hash值，默认是20位。

> 注意ExtractWebpackPlugin插件是使用`contenthash`来代表哈希值而不是`chunkhash`,原因在于ExtractWebpackPlugin提取出来的内容是代码内容本身而不是由一组模块组成的Chunk。

### chunkFilename

`output.chunkFilename`配置无入口的Chunk在输出时的文件名称。chunkFilename和上面的filename非常类似，但chunkFilename只用于指定在运行过程中生成的Chunk在输出时的文件名称。常见的会在运行时生成Chunk场景有在使用CommonChunkPlugin、使用`import('path/to/module')`动态加载等时。

chunkFilename支持和filename一致的内置变量。

### path

`output.path`配置输出文件存放在本地的目录，必须是string类型的绝对路径。通常通过Node.js的`path`模块去获取绝对路径:

`path: path.resolve(__dirname, 'dist_[hash]')`

### publicPath

在复杂的项目里可能会有一些构建出的资源需要异步加载，加载这些异步资源需要对应的URL地址。

`output.publicPath`配置发布到线上资源的URL前缀，为string类型。默认值是空字符串'',即使用相对路径。

```js
filename: '[name]_[chunkhash:8].js'
// 线上cdn地址
publicPath: 'https://cdn.example.com/assets/'
```

这时发布到线上的HTML在引入Javascript文件时就需要：

```js
<script src='https://cnd.exapmle.com/assets/a_123445.js'></script>
```

使用该配置项时要小心，稍有不慎将导致资源加载404错误。

`output.path`和`output.publicPath`都支持字符串模板，内置变量只有一个: `hash`代表一次编译操作的Hash值。

### crossOriginLoading

Webpack输出的部分代码块可能需要异步加载，而异步加载是通过JSONP方式实现的。JSONP的原理是动态地向HTML中插入一个`<script src="url"></script>`标签去加载异步资源。

`output.crossOriginLoading`则是用于配置这个异步插入的标签的`crossOrigin`值。

script标签的crossorigin属性可以取以下值：

* `anonymous`(默认)在加载此脚本资源时不会带上用户的Cookies;
* `use-credentials`在加载此脚本资源时会带上用户的Cookies。

通常用设置crossorigin来获取异步加载的脚本执行时的详细错误信息。

### libraryTarget和library

当用Webpack去构建一个可以被其他模块导入使用的库时需要用到它们。

* `output.libraryTarget`配置以何种方式导出库。
* `output.library`配置导出库的名称。

它们通常倒赔在一起使用。

`output.libraryTarget`是字符串的枚举类型，支持以下配置。

