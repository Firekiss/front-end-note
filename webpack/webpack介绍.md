### webpack是什么

> webpack是模块化管理工具，使用webpack可以对模块进行压缩、预处理、按需打包、按需加载等。

### webpack 有哪些重要特征?

* 插件化
webpack本身非常灵活，提供了丰富的插件接口。基于这些接口，webpack开发了很多插件作为内置功能。

* 速度快
webpack使用异步IO以及多级缓存机制。所以webpack的速度是很快的，尤其是增量更新。

* 丰富的Loaders
loaders用来对文件做预处理。这样webpack就可以打包任何静态文件。

* 高适配性
webpack同时支持AMD/CommonJs/ES6模块方案。webpack会静态解析你的代码，自动帮你管理他们的依赖关系。此外，webpack对第三方库的兼容性很好。

* 代码拆分
webpack可以将你的代码分片，从而实现按需打包。这种机制可以保证页面只加载需要的JS代码，减少请求的时间。

* 优化
webpack提供了很多优化机制来减少打包输出的文件大小，不仅如此，它还提供了hash机制，来解决浏览器缓存问题。

* 开发模式友好
webpack为开发模式也提供了很多辅助功能。比如SourceMap、热更新等。

* 使用场景多：
webpack不仅适用于web应用场景，也适用与webworkers、Node.js场景。

### webpack如何最佳配置？
webpack官方提供的配置方法是通过module.exports返回一个json，但是这中场景不灵活，不能适配多种场景。

比如要解决：production模式和development模式，webpack的配置是有差异的，大致有两种思路。

1. 两份配置文件 `webpack.config.production.js/webpack.config.development.js`然后不同场景下，使用不同的配置文件。

2. 通过module.exports返回函数，该函数能接受参数。

相对来说，第一种更简单，但是重复配置多;第二种更灵活，推荐第二种方式。

