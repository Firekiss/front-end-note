## Node环境变量

首先，咋们在做react、vue的单页应用开发的时候，相信大家对配置文件里的process.env并不眼生。

从字面上看，就是这个env属性，在development和production不同环境上，配置会有些不同。

那下面我们开始看看这个所谓的process到底是个什么东西。

官方解释：process对象是一个global（全局变量），提供有关信息，控制当前Node.js进程。作为一个对象，它对于Node.js应用程序始终是可用的，故无需使用require()。

process(进程)其实就是存在nodejs中的一个全局变量。

然后，咋们可以通过这个所谓的进程能拿到一些有意思的东西。

不过我们今天主要是讲讲 process.env。

### process.env

这是啥？

官方： process.env属性返回一个包含用户环境信息的对象。

很明显的一个使用场景，依靠这个我们就可以给服务器打上一个标签。这样的话，我们就能根据不同的环境，做一些配置上的处理。
比如开启sourceMap，后端接口的域名切换等等。

> 你是 dev 环境
> 他是 uat 环境
> 她是 product 环境

### 如何配置环境变量

下面讲讲如何配置各个环境的环境变量。

临时配置

```
# node中常用到的环境变量是NODE_ENV，首先查看是否存在
set NODE_ENV
# 如果不存在则添加环境变量
set NODE_ENV=production
# 环境变量追加值 set 变量名=%变量名%;变量内容
set path=%path%;C:\web;C:\Tools
# 某些时候需要删除环境变量
set NODE_ENV=
```

永久配置

右键(此电脑) -> 属性(R) -> 高级系统设置 -> 环境变量(N)...

### 解决环境导致后端接口变换问题

搞清楚这个问题后，我们就可以在不同环境的机器上设置不同的 NODE_ENV, 当然这个字段也不一定。你也可以换成其他的NODE_ENV_NI等等，反正是自定义的。

#### 解决步骤

1. 修改代码里的后端地址配置

很简单，就是利用 `process.env.NODE_ENV`这个字段来判断。

```js
api: {
    serverUrl: 
        process.env.NODE_ENV == 'dev' ? 
            'http://m-dev.meinstech.com/' :
        process.env.NODE_ENV == 'uat' ?
            'http://m-uat.meinstech.com' :
        process.env.NODE_ENV == 'product' ?
            'http://m.meinstech.com/':
            `http://localhost:${process.env.PORT || 3000}`    

}
```