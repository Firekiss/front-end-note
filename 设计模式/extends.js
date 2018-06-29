function SuperClass() {
    this.superValue = true;
}

SuperClass.prototype.getSuperValue = function() {
    return this.superValue;
};

function SubClass() {
    this.subValue = false;
}

SubClass.prototype = new SuperClass();

SubClass.prototype.getSubValue = function() {
    return this.subValue;
};

var sub = new SubClass();
console.log(sub);
console.log(sub.superValue);



// 对象继承
function inheritObject(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

// 寄生继承
function sponger(obj) {
    var o = inheritObject(obj);
    o.getName = function() {
      console.log('hello');  
    }
    return o;
}


function inheritPrototype(subClass, superClass){
    // 其实相当于返回了superClass的一个实例
    var p = inheritObject(superClass.prototype);
    p.constructor = subClass;
    subClass.prototype = p;
}

function SuperClass(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green']
}

SuperClass.prototype.getName = function(){
    console.log(this.name);
};

function SubClass(name, time){
    SuperClass.call(this);
    this.time = time;
}

inheritPrototype(SubClass, SuperClass);
SubClass.prototype.getTime = function(){
    console.log(this.time);
}

