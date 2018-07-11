## 如何理解Vue的render函数

render函数第一个参数是一个函数对象 该函数是用来生成vue组件模板的
render函数生成的模板内容优先级会高于 template属性指定的模板

```html
<div id="app">
    <elem></elem>
</div>

<script>
    Vue.component('elem', {
        render: function(createElement){
            return createElement('div');
        }
    })
</script>
```

第一个参数(必填) - {String | Object | Function}

* String: 就是渲染出来的标签字符
* Object: 配置组件配置对象
* Function: 一个返回HTML标签字符或组件配置对象的函数

第二个参数(可选) - {Object | Array}

```html
<div id="app">
    <elem></elem>
</div>

<script>
    Vue.component('elem', {
        render: function(createElement) {
            return createElement('div', {
                // 一个包含模板相关属性的数据对象
                class: {
                    foo: true,
                    bar: false, // value值为true的key会出现在class属性中
                },
                style: {
                    color: 'red',
                    fontSize: '14px'
                },
                domProps: {
                    innerHTML: 'baz'
                }
            });
        }
    })

    Vue.component('elem', {
        render: function(createElement){
            'div',
            // 由createElement函数构建而成的数组
            // createElement函数返回VNode对象
            // 返回的VNode对象会渲染在外层div里面
            [
                createElement('h1'),
                createElement('h2')
            ]
        }
    })
</script>
```

### Vue.component两种组件的编写方式
1. 在组件对象中使用template将所有的html代码编写好
2. 在组件对象中通过render函数配置组件的html

render函数中的this还是指向当前组件实例