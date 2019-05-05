var throttle = function (func, delay) {
    var timer = null;
    // 注册回调函数时的时间戳
    var startTime = Date.now();
    return function () {
        var curTime = Date.now();
        // 倒计时还剩下的时间
        var remaining = delay - (curTime - startTime);
        var context = this;
        var args = arguments;
        // 清除定时器
        clearTimeout(timer);
        // 已经超过了时间间隔
        if (remaining <= 0) {
            // 直接执行处理函数
            func.apply(context, args);
            // 执行完成时间就是新的开始时间
            startTime = Date.now();
        } else {
            timer = setTimeout(func, remaining);
        }
    }
}


function handle () {
    console.log(Math.random());
}

window.addEventListener('scroll', throttle(handle, 1000));