// 对象继承
function create(obj){
    var F = function(){}
    F.prototype = obj;
    return new F();
}

// 将子类的原型对象指向父类实例(不包含父类构造函数里面的属性)
function inheritObj(subClass, superClass) {
    var p = create(superClass.prototype);
    p.cons = subClass;
    subClass.prototype = p;
}

function Book(bookType, num) {
    this.bookType = bookType
    this.num = num;
}

Book.prototype.getBookType = function(){
    console.log(this.bookType);
}

function SubBook(bookType,num, isNew){
    Book.call(this, bookType, num)
    this.isNew = isNew
}

inheritObj(SubBook, Book)

SubBook.prototype.getIsNew = function(){
    console.log(this.isNew)
}

var sb = new SubBook('game', 10, false)
console.log(sb)
sb.getBookType();
sb.getIsNew();