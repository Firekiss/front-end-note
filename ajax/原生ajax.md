## XMLHttpRequest对象

XMLHttpRequest对象是ajax的基础, XMLHttpRequest用于在后台与服务器交换数据.

|方法|描述|
|:-|:-|
|abort|停止当前请求|
|getAllResponseHeaders()|吧HTTP请求的所有响应首部作为键/值返回|
|getResponseHeader("header")|返回指定首部的串值|
|open("method", "URL", [asyncFlag],["userName"],["password"])|建立对服务器的调用.method参数可以是GET,POST或PUT.url参数可以是相对URL或绝对URL.这个方法还包括3个可选参数,是否异步,用户名,密码|
|send(content)|向服务器发送请求|
|setRequestHeader("header", "value")|把指定首部设置为所提供的值.在设置任何首部之前不许先调用open().设置header并和请求一起发送('post'方法一定要)|

### 五步使用法:

1. 创建XMLHttpRequest对象
2. 使用open方法设置和服务器的交互信息
3. 设置发送的数据,开始和服务器交互
4. 注册事件
5. 更新界面

```js
// get

// 创建异步对象
var ajax = new XMLHttpRequest();
// 设置请求的url参数,参数一是请求的类型,参数而是请求的url,可以带参数,动态的传递参数starName到服务端
ajax.open('get', 'getStar.php?starName='+name);
// 发送请求
ajax.send();
// 
ajax.onreadystatechange = function(){
  if(ajax.readyState == 4 && ajax.status == 200){
    console.log(ajax.response);
  }
}
```

```js
// post

var xhr = new XMLHttpRequest();
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.open("post", "02.post.php");
xhr.send("name=fox&age=18");
xhr.onreadystatechange = function(){
  if(xhr.readyState == 4 && xhr.status == 200) {
    console.log(xhr.responseText);
  }
}
```