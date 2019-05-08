// 将数组的值分配给多个变量
// 如果左边的数值少于右边数组的项数, 右边多余的内容将会被忽略
let [a, b, c] = [1, 2, 3];

let [a, ...b] = [1, 2, 3, 4, 5, 6];

let {name: x, age: y} = {name: 'John', age: 23};

function func ({a, b, c = 'alex'} = {}) {
    console.log(a, b, c)
}