var throttle = function (func, delay) {
    // 获取当前的时间戳
    var prev = Date.now();

    return function () {
        // 触发事件的对象
        var context = this;
        // 传给事件处理函数的参数
        var args = arguments;
        // 事件触发的时的时间戳
        var now = Date.now();
        
        if (now - prev >= delay) {
            func.apply(context, args);
            prev = Date.now();
        }
    }
}

function handle () {
    console.log(Math.random());
}

window.addEventListener(
    'scroll',
    throttle(handle, 1000)
);