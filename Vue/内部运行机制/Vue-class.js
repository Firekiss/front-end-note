function defineReactive(obj, key, val, cb) {
	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get () {
			return val
		},
		set (newVal) {
			val = newVal;
			cb(); /* 订阅者收到消息的回调 */
		}
	})
}

function observe(value, cb) {
	if (!value || !(typeof value === 'object')) return
	Object.keys(value).forEach(key => defineReactive(value, key, value[key], cb))
}

function _proxy (data) {
	const that = this;
	Object.keys(data).forEach(key => {
		Object.defineProperty(that, key, {
			enumerable: true,
			configurable: true,
			get: function proxyGetter () {
				return that._data[key];
			},
			set: function proxySetter (val) {
				that._data[key] = val;
			}
		})
	});
}

class Vue {
	constructor (options) {
		this._data = options.data;
		observe(this._data, options.render)
		_proxy.call(this, options.data)
	}
}

let app = new Vue({
	el: '#app',
	data: {
		text: 'text',
		text2: 'text2'
	},
	render () {
		console.log('render');
	}
})

