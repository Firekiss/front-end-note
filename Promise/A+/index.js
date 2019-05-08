const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';


class Promise {
    // 构造函数
    constructor(executor) {
        // 初始的状态为等待的状态
        this.state = PENDING;
        // 成功的值
        this.value = undefined;
        // 失败的原因
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = value => {
            // 只有当前的状态是 pending, 才可能转换为 fulfilled
            // 并且不能再转换为成其他任何状态, 且必须拥有一个不可变的值
            if (this.state === PENDING) {
                this.state = FULFILLED;
                this.value = value;
                // 遍历执行
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }

        const reject = reason => {
            if (this.state === PENDING) {
                this.state = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        // 若 executor 执行发生错误, 直接执行 reject ()
        // XXX 如果传入的 executor 里面传入的是同步代码
        // 实例还没有调用 then 方法, 此时同步处理 resolve 和 reject 会存在问题
        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }


    then(onFulfilled, onRejected) {
        // 如果 onFulfilled 不是函数, 则必须将它忽略
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };

        // 为了做链式调用, 规定每个 then 方法必须返回一个 promise2
        const promise2 = new Promise((resolve, reject) => {
            if (this.state === FULFILLED) {
                // onFulfilled 和 onRejected 必须是异步调用的,
                // 所以使用定时器, 将执行任务放到异步的任务列队里面
                // 等待主执行栈里面的函数都执行完毕之后再执行 onFulfilled 和 onRejected
                setTimeout(() => {
                    try {
                        // 执行成功的回调函数
                        const x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        // 执行成功回调方法的时候抛出异常, promise2 直接拒绝, 并返回拒绝原因
                        reject(e);
                    }

                }, 0);
            }

            if (this.state === REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }

            if (this.state === PENDING) {
                // 将执行方法添加到上一个promise对象的任务列队属性中
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            // 发布 promise2 的 reject
                            reject(e);
                        }
                    }, 0);
                });
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
            }
        });

        return promise2;
    }
}


const resolvePromise = (promise2, x, resolve, reject) => {
    if (x === promise2) {
        return reject(new TypeError('Chaing cycle detected for promise'));
    }

    // onFulfilled 和 onRejected 只能被调用一次的flag
    let isCalled = false;

    // 如果回调函数执行返回的结果是一个 非空对象或者函数的话
    // 可能这对象也是一个 promise 对象
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    


    // 如果 then 不是对象或函数 则以 X 为值发布当前 promise 对象的 resolve
    } else {
        resolve(x);
    }
}

