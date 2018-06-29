
// const 定义一个对象,不代表对象的属性值不可以修改
// 而是整个对象指向内存中的地址不能够进行修改
const a = {
    name: "leo"
};

a.name = "tom";

console.log(a);