## 2-5 Plugin

组件扩展,扩展Webpack功能

### 配置Plugin

Plugin的配置很简单, `plugins`配置项接受一个数组,数组里每一项都是一个要使用的Plugin的实例,Plugin需要的参数通过构造函数传入.

```js

const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
  plugins: [
    // 所有页面都会用到的公共代码提取到 common 代码中
    new CommonsChunkPlugin({
      name: 'common',
      chunks: ['a', 'b']
    })
  ]
}

```

使用Plugin的难点在于掌握Plugin本身提供的配置项,而不是如何在Webpack中接入Plugin.

