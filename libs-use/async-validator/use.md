## async-validator 使用

异步的表单验证

### API

以下内容是从早起的 [async-validate](https://github.com/tmpfs/async-validate) 更新过来的

### Usage

#### 基本的使用

定义一个 descriptor(描述), 将 descriptor 传递给验证模块并且进行实例化, 然后调用验证实例的`validate`的方法,将需要验证的对象和一个回调函数传入:

```js
var schema = require('async-validator');
var descriptor = {
	name: {type: "string", required: true}
}
var validator = new schema(descriptor);

validator.validate({name: "muji"}, (errors, fields) => {
  if(errors) {
	// 如果验证失败, errors参数代表包含所有错误的数组
	// fields是一个人以验证字段名称为key的对象, 
	// key所对应的value值是包含该字段所有验证错误的数组
    return handleErrors(errors, fields);
  }
});
```

### Validate

```js
function(source, [options], callback)
```

- `source`: 需要验证的object(必填)
- `options`: 一个对验证项流程进格外配置的object(选填)
- `callback`: 当验证结束的时候调用的回调函数(必填)

### Options

- `first`: Boolean, 当验证过程中产生第一个错误,不再验证后面的规则,直接执行`callback`回调.如果你的验证对象包含多个需要验证的字段,并且你只需要第一个验证错误的时候就可以启用这个选项.
- `firstFields`: Boolean|String[], 当指定的验证字段产生一个错误的时候,执行`callback`回调,同一个验证字段后续规则不会再进行验证. `true`代表了所有的字段都这样.

### Rules

Rules可以是执行验证的函数们

```js
function(rule, value, callback, source, options)
```

- `rule`: 


