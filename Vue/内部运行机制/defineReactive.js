function cb (val) {
    /* 渲染视图 */
    console.log("视图更新啦～");
}

function defineReactive (obj, key, val) {
	Object.defineProperty(obj, key, {
		enumerable: true,	/* 可枚举 */
		configurable: true, /* 属性可以被修改或者删除 */
		get: function reactiveGetter () {
			return val;
		}
		set: function reactiveSetter (newVal) {
			if (newVal === val) return;
			cb(newVal);
		}
	})
}

function observer (value) {
	if (!value || (typeof value !== 'object')) {
		return;
	}

	Object.keys(value).forEach((key) => {
		defineReactive(value, key, value[key]);
	});
}