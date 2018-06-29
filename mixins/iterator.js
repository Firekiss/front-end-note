let myObject = {
    a: 1,
    b: 2,
    c: 3
};

// 数据描述符
// 访问描述符
Object.defineProperty(myObject, "iterator", {
    writable: false,
    enumerable: false,
    configurable: true,
    value: function() {
        var o = this;
        var idx = 0;
        var keys = Object.keys(o);
        return {
            next: function() {
                return {
                    value: o[keys[idx++]],
                    done: idx >= keys.length,
                    idx: idx
                }
            }
        } 
    }
});

var iterator = myObject.iterator();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

function Controller() {
    this.errors = [];
}

Controller.prototype.showDialog(title, msg) = function() {
    console.log();
};

Controller.prototype.success = function(msg){
    this.showDialog("Success", msg);
};

Controller.prototype.failure = function(err) {
    this.errors.push(err);
    this.showDialog("Error", err);
};

