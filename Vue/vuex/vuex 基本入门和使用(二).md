### 关于state
每个vuex应用只有一个store实例，所以使用起来不会太复杂，对于定位错误状态和操作会很方便。

#### 简单用法：在vuex的计算属性中返回vuex的状态
最基本的使用方式，通过在vue文件里面初始化vuex的store来进行操作vuex的数据：如下例子：

```js
// 在组件里面使用 vuex
// 初始化 vuex 实例
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment: state => state.count++,
        decrement: state => state.count--
    }
})

// 创建一个 Counter 组件
const Counter = {
    template: `<div>{{ count }}</div>`,
    computed: {
        count () {
            // 直接返回 state
            return store.state.count
        }
    }
}

// 初始化 vue 实例
const app = new Vue(
    { 
        el: '#app', 
        components: { Counter }, 
        template: ` <div class="app"> <button @click="increment">+</button> <button @click="decrement">-</button> <counter></counter> </div> ` ,
        methods: { 
            increment () { store.commit('increment') }, 
            decrement () { store.commit('decrement') } 
        }
    })
```

* 每当store.state.count变化的时候，都会重新求取计算属性，并且触发更新相关联的DOM

* 然而，这种模式导致组件依赖全局状态单例。在模块化的构建系统中，在每个需要使用state的组件中需要频繁地导入，并且在测试组件时需要模拟状态。

> 我以为，当项目发展到多个模块，多个组件和子组件混合的时候，在这种场合，单纯的值传递方式很麻烦，因为组件或者模块之间的变量是独立的，对于一些全局使用的属性类似token，cookie之类的东西，或者是一些多个模块之间共享的属性。

所以vuex提供一个新的方式来将vuex的store存放到根组件下，通过store选项，将store从根组件"注入"到每一个子组件中(Vue.use(Vuex))
