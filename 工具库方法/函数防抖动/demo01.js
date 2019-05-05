function debounce (fn, wait) {
    var timer = null;

    return function () {
        if (timer !== null) {
            clearTimeout(timer);
        }

        timer = setTimeout(fn, wait);
    }
}

// 处理函数
function handle () {
    console.log(Math.random());
}

// 滚动事件
window.addEventListener(
    'scroll',
    debounce(handle, 1000);
);

