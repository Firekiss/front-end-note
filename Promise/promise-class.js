var PENDING = 0; // 进行中
var FULFILLED = 1; // 已经完成
var REJECTED = 2; // 失败了

// PENDING => FULFILLED
// PENDING => REJECTED

/**
 * promise构造函数
 * @param {Function} callback
 */
function Promise(callback) {
	// 默认状态是 PENDING
	this.status = PENDING;
	// value保存着当 PENDING => FULFILLED 或者 REJECTED 的时候
	// 内部所保存的值
	this.value = null;
	this.defferd = [];
	// 将callback放入异步列队
	// 强制绑定 callback 的上下文是 promise 实例
	// 将 promise 实例的 resolve 和 reject 方法注入到 callback 方法中
	setTimeout(callback.bind(this, this.resolve.bind(this), this.reject.bind(this)), 0);
}

Promise.prototype = {
	constructor: Promise,
	resolve: function (result) {
		// 修改不可逆的状态
		this.status = FULFILLED;
		// 将调用resolve方法的时候传的值赋给实例的value属性
		this.value = result;
		// 执行完毕
		this.done();
	},
	reject: function (error) {
		this.status = REJECTED;
		this.value = error;
		this.done();
	},
	then: function (success, fail) {
		var o = {
			onfulfiled: success,
			onrejected: fail
		};
		// 获取当前的 promise 的状态
		var status = this.status;
		// 产生一个新的 promise 对象
		o.promise = new this.constructor(function() {});

		// 如果状态是 PENDING, 表示实例内容还未执行完毕
		// 说明then方法指定的某种状态要执行的事件是未来发生的现在并不执行
		// 所以将 o 放入 defferd订阅列表中
		// 所以当promise实例内容还未完成就要把未来执行的方法放入订阅列表
		if (status === PENDING) {
			this.defferd.push(o);
		} else if (status === FULFILLED || status === REJECTED) {
			this.handle(o);
		}
		// 这个返回的 promise 对象内的 defferd 可能保存着后续then中需要执行的任务
		return o.promise;
	},
	// done方法是在resolve, reject方法中执行的,表示 resolve和reject方法执行完毕了
	// 这个完毕是一种信号,那就是之前说好的状态变成 FUIFILLED 我要做的那些事情
	done: function () {
		var status = this.status;
		// 为了保险起见
		if (status === PENDING) return;
		// 订阅列表
		var defferd = this.defferd;
		// 循环执行列表任务
		for (let i = 0; i < defferd.length; i++) {
			this.handle(defferd[i]);
		}
	},
	// handle 方法用来执行 o, o里面放着我们要执行的内容
	handle: function (fn) {
		if (!fn) return;

		var value = this.value;
		var t = this.status;
		var p;

		if (t === PENDING) {
			this.defferd.push(fn);
		} else {
			if (t === FULFILLED && typeof fn.onfulfiled === 'function') {
				p = fn.onfulfiled(value);
			}

			if (t === REJECTED && typeof fn.onrejected === 'function') {
				p = fn.onrejected(value);
			}
		}

		var promise = fn.promise;
		if (promise) {
			// 如果 then 中传入的函数的返回值是一个 promise 对象
			if (p && p.constructor === Promise) {
				// 当这个p是一个promise对象 将 o.promise中保存的后续 then 中需要执行的任务 赋值给 p.defferd
				p.defferd = promise.defferd;
			} else {
				// 将非promise实例的p的值赋值给 this.value
				this.value = p;
				p = this;
				p.defferd = promise.defferd;
				this.done();
			}
		}
	}
}
