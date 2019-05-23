/**
 * 自己手动实现一个类似于 node events的模块
 */
function EventEmitter() {
    // 会把所有的事件监听函数放在这个对象里面保存
    this.events = {};
    this.maxListeners = 10;
}

EventEmitter.prototype.on = EventEmitter.prototype.addListener = function(type, listener) {
    if (this.events[type]) {
        this.events[type].push(listener);
        // maxListeners 设置为0的时候表示不做事件监听绑定处理函数个数的限制
        if (this.maxListeners !== 0 && this.events[type].length >= this.maxListeners) {
            console.error(`${type} event listener numb er is more than ${this.maxListeners}`);
        }
    } else {
        this.events[type] = [listener];
    }
}


EventEmitter.prototype.once = function(type, listener) {
    // wrapper 函数的作用域链之中包含外层作用域的闭包
    // 用 wrapper 做中间层的目的是可以更加灵活地控制闭包之中的 listener 对象
    const wrapper = (...args) => {
        listener.apply(this, args);
        // 执行了一次之后 解绑监听
        // 用完即焚
        this.removeListener(type, wrapper);
    }
    this.on(type, wrapper);
}

// 第一个参数是事件的类型 第二个参数和以后的参数会传递给监听函数
EventEmitter.prototype.emit = function(type, ...args) {
    this.events[type] && this.events[type].forEach(listener => listener.apply(this, args));
}

EventEmitter.prototype.removeListener = function(type, listener) {
    if (this.events[type]) {
        // 使用过滤的方法直接过滤掉需要移除的时间回调
        this.events[type] = this.events[type].filter(l => l !== listener);
    }
}

EventEmitter.prototype.removeAllListeners = function(type) {
    delete this.events[type];
}

EventEmitter.prototype.setMaxListeners = function(maxListeners) {
    this.maxListeners = maxListeners;
}

EventEmitter.prototype.listeners = function(type) {
    return this.events[type];
}

module.exports = EventEmitter;