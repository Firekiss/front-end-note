let EventEmitter = require('./events');
let util = require('util')

function Bell() {
    // 执行一遍父类构造函数
    // 使用 new 关键字实例化对象的时候 this会指向实例
    // 父类 this 上面的属性会赋值给子类实例
    EventEmitter.call(this);
}

// Object.setPrototypeOf()
util.inherits(Bell, EventEmitter);


const ringHandler = (role, thing) => {
    console.log(`${role}带着${thing}开始上课`);
};

const bell = new Bell();
bell.on('ring', ringHandler);
bell.emit('ring', '学生', 'book');