let EventEmitter = require('events');
let util = require('util')

function Bell() {
    // 执行一遍父类构造函数
    // 父类 this 上面的属性会赋值给子类实例
    EventEmitter.call(this);
}

// Object.setPrototypeOf()
util.inherits(Bell, EventEmitter);
