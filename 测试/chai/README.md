chai的使用

```js
const chai = require('chai');
```

```js
// equal(strictly equal: 基本类型的值需要相等,复杂类型变量指向的内存地址必须是同一个)
// eql(deep equal: 复杂类型递归到基本数据类型的值一样,不要求变量指向同一个内存地址)
// Object.is() 方法是 strictly equal 的一种方法提现,但是它存在一些特殊的情况
// +0 与 -0 是不相等的   NaN 和 NaN是相等的

```

#### .property

```js
// 判断对象里面的key是否存在,以及在提供第二个参数`val`的情况下验证该 key 对应的 value 值
expect({a: 1}).to.have.property('a');
expect({a: 1}).to.have.property('a', 1);

// .property与.deep一起使用的时候, 使用的是deep-equal而不是 strictly equal(===)
expect({x: {a: 1}}).to.have.deep.property('x', {a: 1}); // pass
expect({x: {a: 1}}).to.have.property('x', {a: 1}); // fail

// .property与.own一起使用用来排除继承的属性
Object.prototype.b = 2;

expect({a: 1}).to.have.own.property('a'); // pass
expect({a: 1}).to.have.own.property('a', 1); // pass
expect({a: 1}).to.have.property('b').but.not.have.own.property('b'); // pass

// .property可以与.nested一起使用来验证多层内嵌属性
expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]');
expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]', 'y');

// 混用
expect({x: {a: 1}}).to.have.deep.own.property('x', {a: 1});
expect({a: {b: [{c: 3}]}}).to.have.deep.nested.property('a.b[0]', {c: 3});
```

#### .include
```js
// .include(val[,msg])用来验证某种对象子集包含关系
// 当对象是字符串的时候,用来判断参数val是否是目标字符串的子集
expect('foobar').to.include('foo');

// 当对象是数组的时候,用来判断参数`val`是否是数组的一员
expect([1, 2, 3]).to.include(2);

// 当对象是字典的时候,用来判断参数`val`是否是目标对象的子集
expect({a: 1, b: 2, c: 3}.to.include({a: 1, b: 2}))
```