> 类声明以class关键字开始, 其后是类的名称;剩余部分的语法看起来就像对象字面量中的方法简写,并且在方法之间不需要使用逗号:

```js
class PersonClass {
    // 构造器 添加自有属性
    constructor(name) {
        this.name = name;
    }

    // 原型链上的方法
    sayName() {
        console.log(this.name);
    }
}
```

#### 类声明和函数声明的区别和特点

1. 类声明不会被提升, 这与函数定义不同. 类声明的行为与let相同,因此在程序的执行到达声明处之前,类会存在于暂时性四区内
2. 类声明中的所有代码会自动运行在严格模式下, 并且也无法退出严格模式
3. 类的所有方法内部都没有[[Construct]], 因此使用new来调用它们会抛出错误
4. 调用类构造器时不使用new, 会抛出错误
5. 试图在类的方法内部重写类名, 会抛出错误
6. 类的所有方法都是不可枚举的,这是对于自定义类型的显著变化,后者必须用Object.defineProperty()才能将方法改变为可枚举

#### 一级公民

类可以被当做参数传递给函数

#### 访问器属性

自有属性需要在类构造器中创建, 而类还允许你在原型上定义访问器属性

```js
class Custom {
    constructor(element) {
        this.element = element
    }
    get html() {
        return this.element.innerHTML
    }
    set html(value) {
        this.element.innerHTML = value
    }
}
```

方法名称可以使用 [变量] 表达式来命名

#### 类的继承

Class之间可以通过extends关键字实现继承

```js
    class ColorPoint extends Point {
        constructor(x, y, color) {
            // 调用父类的 constructor(x, y)
            super(x, y)
            this.color = color;
        }

        toString() {
            // 调用父类的 toString()
            return this.color + ' ' + super.toString();
        }
    }
```

ES5的继承 将子类构造方法的 prototype 属性对象赋值为 父类的实例, 该实例拥有父类的属性和方法, 实例化子类的时候是先创建一个对象,然后将父类的方法赋值给对象的__proto__属性,再将this指向子类实例对象

ES6实质是先创建父类的实例对象this,所以必须先调用super方法,然后再用子类的构造函数修改this

如果子类没有定义constructor方法,这个方法会被默认添加
在子类的构造函数中,只有调用super之后,才可以使用this关键字

```js
constructor (...args) {
    super(...args)
}
```


