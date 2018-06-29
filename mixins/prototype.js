var obj = {};

Object.defineProperty(obj, "a", {
    value: "aValue",
    writable: false
});

var myObj = Object.create(obj);

console.log(myObj.a);

Object.defineProperty(myObj, "a",{
    value: "bb"
});

console.log(myObj.a);

function bind(fn){
    return function(){
        fn.call(a, arguments);
    }
}

