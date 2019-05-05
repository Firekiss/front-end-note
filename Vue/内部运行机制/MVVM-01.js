// Mvvm 构造函数
function Mvvm (options = {}) {
    this.$options = options
    let data = this._data = options.data
    observe(data)
    _proxy(this)
    initComputed.call(this)
    Compile(this)
}


// 将一个对象上面的各个属性做数据劫持的类
function Observe (data) {
    for (let key in data) {
        // 实例化一个 Dep类 
        let dep = new Dep()
        // 获取 key 对应的 val 值
        let val = data[key]
        observe(val)

        // 使用 defineProperty 做数据劫持
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get () {
                // 这样可以保证 只有被模板使用的key才会添加订阅
                Dep.target && dep.addSub(Dep.target)  // [watcher]
                return val
            },
            set (newVal) {
                if (newVal !== val) {
                    val = newVal
                    observe(val)
                    // 让所有watcher的update方法执行
                    dep.notify()
                }
            }
        })
    }
}


function observe (data) {
    if (typeof data !== 'object') return
    // 返回类的实例
    return new Observe(data)
}


// 此方法为数据代理方法
// 将 vm._data 上的一级 key 和值 代理到 vm上面
function _proxy (vm) {
    for (let key in vm._data) {
        Object.defineProperty(vm, key, {
            configurable: true,
            enumerable: true,
            get () {
                return vm._data[key]
            },
            set (newVal) {
                vm._data[key] = newVal
            }
        })
    }
}


function replace (replaceNode, vm) {
    // 使用 Array.from 方法将类数组转为数组 得到 一个节点下面所有的一级子节点对象数组 (包括, 标签节点和文本和注释节点, children属性只返回标签节点)
    Array.from(replaceNode.childNodes).forEach(function(node) {
        // contentText 获取一个节点内的文本
        let text = node.textContent
        // 匹配 {{ abc }} 这种模板形式的正则表达式
        let reg = /\{\{(.+)\}\}/
        // 当前节点必须问本文节点 && 节点中使用了{{}}模板
        if (node.nodeType === 3 && reg.test(text)) {
            // 将匹配到的字符串分割成数组, 从左到右代表一级一级往下的key值
            let keys = RegExp.$1.split('.')
            // 将 val 指向 vm
            let val = vm
            keys.forEach(function(key) {
                // 每一次迭代 val 就指向当前 key 对应的值, 直至最后
                val = val[key]
            })
            // 新建一个被订阅者
            new Watcher(vm, RegExp.$1, function(newVal) {
                // 这里是利用了闭包
                // 这里的 node 指的是编译的时候 文本中包含 {{}} 的文本节点
                // reg 指的还是父作用域中的正则
                node.textContent = text.replace(reg, newVal)
            })
            // repalce 如果第一个参数是正则表达式, 后面值会替换前面正则匹配到的值
            node.textContent = text.replace(reg, val)
        }
        // 如果当前节点是标签节点
        if (node.nodeType === 1) {
            // 获取当前节点的所有属性 (类数组)
            let attrs = node.attributes
            Array.from(attrs).forEach(attr => {
                // 获取属性的名称
                let attrName = attr.name
                // 获取属性值
                let exp = attr.value
                // 判断属性名称之中是否有 v- 这里默认是 v-model
                if (attrName.indexOf('v-') === 0) {
                    node.value = vm[exp]
                }
                // 添加订阅
                new Watcher(vm, exp, function(newVal) {
                    node.value = newVal
                })
                node.addEventListener('input', function(e) {
                    let newVal = e.target.value
                    vm[exp] = newVal
                })
            })
        }
        // 如果当前节点还有子节点 继续做这样的操作
        if (node.childNodes) {
            replace(node, vm)
        }
    })
}


function initComputed () {
    let vm = this
    let computed = this.$options.computed

    Object.keys(computed).forEach(function(key) {
        Object.defineProperty(vm, key, {
            enumerable: true,
            configurable: true,
            // 在模板之中使用了 computed 对应的 key 字段之后 自动调用 key 所对应的函数
            // 当 key 对应函数内部的字段发生改变的时候
            get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
            set () {}
        })
    })
}


// 此方法为编译方法 编译实例选中的模板
function Compile (vm) {
    // 实例指定的 dom 对象
    this.$el = document.querySelector(vm.$options.el)
    // fragment 文档碎片对象 可以作为一个容器 它并不输入DOM结构的一部分, 所以操作它不会对DOM有影响
    // 把现有DOM上的一个节点插入给 DocumentFragment, 这个节点会从元DOM上被删除掉
    let fragment = document.createDocumentFragment()
    let child = null
    while (child = this.$el.firstChild) {
        // 将页面上的 dom 对象移动到 fragment 之中, 原本页面上的dom会被删除掉
        fragment.appendChild(child)
    }
    replace(fragment, vm)
    // 将整体替换好的文档碎片对象 添加到容器中
    this.$el.appendChild(fragment)
}


// 订阅发布类
function Dep () {
    // 任务列队
    this.subs = []
}

// 添加一个订阅
Dep.prototype.addSub = function (sub) {
    this.subs.push(sub)
}

// 发布
Dep.prototype.notify = function () {
    this.subs.forEach(sub => sub.update())
}


// 被订阅者类
function Watcher (vm, exp, fn) {
    this.fn = fn
    // 这样做是为了让 vm 和 exp 的值在update方法里面也可以使用
    this.vm = vm
    this.exp = exp
    // this 指向 watcher 实例
    Dep.target = this
    // 获取到值
    let val = vm
    exp.split('.').forEach(function(key) {
        // 在这个过程之中会触发 key 对应值的 get 方法
        val = val[key]
    })
    Dep.target = null
}

// 执行传进来的方法
Watcher.prototype.update = function () {
    let val = this.vm
    this.exp.split('.').forEach(function(key) {
        val = val[key]
    })
    this.fn(val)
}