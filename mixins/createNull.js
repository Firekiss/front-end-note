var a = Object.create(null);

console.log(a instanceof Object);

var b = {
    name: 'tom'
};

Object.setPrototypeOf(a, b);

console.log(a.name);