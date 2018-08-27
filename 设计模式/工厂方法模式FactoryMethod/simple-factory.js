var Factory = function(type) {
    var o = {}
    o.age = '13'
    o.color = 'red'

    if (type === '1') {

    }
    return o
}

// 这样的工厂模式 一旦添加了新的类
// 需要添加一个构造函数
// 还需要在工厂模式的主函数中添加相应的代码  比较的麻烦
var PHP = function(content) {

}

var JavaScript = function(content) {

}

function JobFactory(type, content) {
    switch(type) {
        case 'java':
            return new PHP(content);
        case 'php':
            return new JavaScript(content);
    }
}



// 工厂方法模式
// 安全模式创建的工厂类
// 所谓的安全就是防止调用者忘记使用new关键字 直接执行构造函数
var Factory = function(type, content) {
    if(this instanceof Factory){
        return new this[type](content)
    } else {
        return new Factory(type, content)
    }
}

// 将构造函数放到原型对象上面, 变成了对象的原型方法
// 这样添加新的构造函数只要在原型对象上添加属性方法
Factory.prototype = {
    Java: function(content) {

    },
    JavaScript: function(content){

    },
    UI: function(content){

    },
    php: function(content){

    }
}
