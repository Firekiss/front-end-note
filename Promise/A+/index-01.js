const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';


function Promise (excutor) {
    let that = this;
    that.status = PENDING;  // 初始状态
    that.value = undefined;  // fulfilled状态时 返回的信息
    that.reason = undefined;  // rejected状态时 拒绝的原因
    that.onFulfilledCallbacks = [];
    that.onRejectedCallbacks = [];
    

    function resolve(value) {
        // 如果传入的值时 Promise 的实例
        if (value instanceof Promise) {
            
        }

        // 保证异步 then里面的方法可以添加进任务列队
        setTimeout(() => {
            if (that.status === PENDING) {
                // 状态只能由 pending => fulfilled
                that.status = FULFILLED;
                that.value = value;
                that.onFulfilledCallbacks.forEach(cb => cb(that.value));
            }
        }, 0);
    }


    function reject(reason) {
        setTimeout(() => {
            if (that.status === PENDING) {
                that.status = REJECTED;
                that.reason = reason;
                that.onRejectedCallbacks.forEach(cb => cb(that.reason));
            }
        }, 0);
    }


    try {
        excutor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}


/**
 * resolve 中的值几种情况
 * 1. 普通值
 * 2. promise对象
 * 3. thenable对象/函数
 */


function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('循环引用'));
    }

    let called = false;  // 避免多次调用

    // 如果 x 也是一个promise对象
    if (x instanceof Promise) {
        if (x.status === PENDING) {
            // 帮助它注册 执行和拒绝方法
            x.then(y => {
                resolvePromise(promise2, y, resolve, reject);
            }, reason => {
                reject(reason);
            });
        } else {
            // 如果 x 已经处于执行状态/拒绝状态，
            // 执行传递下去
            // x.then(resolve, reject);
            if (x.status === FULFILLED) {
                resolve(x.value);
            } else {
                reject(x.reason)
            }
        }
    } else {
        resolve(x);
    }
}



/**
 * [注册fulfilled状态/rejected状态对应的回调函数]
 */

Promise.prototype.then = function(onFulfilled, onRejected) {
    const that = this;
    let newPromise;

    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };


    if (that.status === FULFILLED) {
        return newPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onFulfilled(that.value);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            }, 0);
        })
    }

    if (that.status === REJECTED) {
        return newPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(that.reason);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            }, 0);
        });
    }

    if (that.status === PENDING) { // 等待态
        // 当异步调用resolve/rejected时 将onFulfilled/onRejected收集暂存到集合中
        return newPromise = new Promise((resolve, reject) => {
            that.onFulfilledCallbacks.push((value) => {
                try {
                    let x = onFulfilled(value);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            });
            that.onRejectedCallbacks.push((reason) => {
                try {
                    let x = onRejected(reason);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            });
        });
    }
}

Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
}