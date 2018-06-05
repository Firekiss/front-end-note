## 2-6 devServer

注意只有在通过DevServer去启动Webpack时配置文件里`devServer`才会生效,因为这些参数所对应的功能都是DevServer提供的.

### hot

`devServer.hot`配置是否启用模块热替换功能.DevServer默认的行为是在发现源代码被更新后会自动刷新整个页面来做到实时预览,开启模块热替换功能之后将在不刷新整个页面的情况下通过新模块替换老模块来做到实时预览.

### inline

DevServer的实时预览功能依赖一个注入到页面里的代理客户端去接受来自DevServer的命令和负责刷新网页的工作.

* 如果你开启`inline`,DevServer会在构建完变化后的代码时通过代理客户端控制网页刷新.
* 如果关闭`inline`, DevServer将无法直接控制要开发的网页.