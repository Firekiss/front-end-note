// 安全模式创建的工厂类
var Factory = function(type, content) {
    if(this instanceof Factory){
        return new this[type](content)
    } else {
        return new Factory(type, content)
    }
}

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