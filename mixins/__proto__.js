var obj = {};
var a = {
    name: "tom",
    age: '23'
}

// get方法当你访问调用对象属性的时候会调用
Object.defineProperty(obj, "__proto__", {
    get: function(){
        return Object.getPrototypeOf( this );
    },
    set: function( o ){
        Object.setPrototypeOf(this, o);
        return o;
    }
});

console.log(obj.__proto__ === Object.prototype);

var b = obj.__proto__ = a;
console.log(obj.name, obj.age, b === a);
