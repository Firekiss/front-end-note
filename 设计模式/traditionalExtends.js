function SuperClass(name) {
    this.name = name;
    this.books = ['html', 'css', 'javascript'];
}

SuperClass.prototype.getName = function() {
    return this.name;
}

function SubClass(name, time){
    SuperClass.call(this, name);
    this.time = time;
}

SubClass.prototype = new SuperClass();
SubClass.prototype.getTime = function(){
    return this.time;
};

var Book1 = new SubClass('tom', 12);
var Book2 = new SubClass('jay', 10);

Book1.books.push('fuck');

console.log(Book1.books);
console.log(Book2.books);

// createES5 polyfill
function create(obj){
    function F() {};
    F.prototype = obj;
    return new F();
}                                                                                                                   