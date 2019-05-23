const foo = func => {
    function wrapper(...args) {
        func();
    }
    wrapper();
}

foo(function(){
    console.log(1);
})