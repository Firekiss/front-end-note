// var Book = function(id, name, price) {
//     // 私有属性
//     var num = 1;
//     // 私有方法
//     function checkId() {

//     }
    
//     // 特权方法 可以访问私有的属性和方法
//     this.getName = function(){};
//     // 公有属性
//     this.id = id;
// }

var Book = (function(){
    var BookNum = 0;
    function addBook(){
        BookNum++;
    }
    function reduceBook() {
        BookNum--;
    }
    return function(name, age, hasBook) {
        var userName, userAge;
        this.setName = function(name){
            userName = name;
        }

        this.getName = function(name) {
            return userName;
        }

        if (hasBook) {
            addBook();
        } else {
            reduceBook();
        }
        this.setName(name);
        console.log("BookNum", BookNum);
    };
})();

var book1 = new Book("tom", 199, true);
var book2 = new Book("jay", 99, false);
console.log(book2.name);
console.log(book2.getName());

// 构造函数 new调用生成对象的过程
// 1. 创建一个全新的对象
// 2. 这个对象会执行[[ 原型 ]] 链接  [[ prototype ]]属性指向构造函数的prototype属性对象
// 3. 这个新对象会绑定到函数调用的this this指向这个新的对象执行函数内部的语句
// 4. 如果函数没有返回其他对象, 那么new表达式中的函数会自动返回这个新对象

// 安全的构造函数利用 原型数据指向 函数的prototype的顺序优先于 this指向新构造的对象 可以是用instanceof 判断
// this instanceof 构造函数   instanceof的本质是判断一个对象的[[prototype]]链上是否有 构造函数的prototype对象

var Book = function(title, time, type) {
    if (this instanceof Book) {
        this.title = title;
        this.time = time;
        this.type = type;
    } else {
        return new Book(title, time, type);
    }
}
var book = Book('js', '2014', 'js');



