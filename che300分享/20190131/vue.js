function defineReactive(obj, key, val, cb) {
	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get: function() {
			return val
		},
		set: function (newValue) {
			val = newValue
			cb()
		}
	})
}

function obverse(data, cb) {
	if (typeof data !== 'object') return
	Object.keys(data).forEach(key => {
		defineReactive(data, key, data[key], cb)
	})
}

function _proxy (data) {
	var that = this

	Object.keys(data).forEach(key => {
		Object.defineProperty(that, key, {
			configurable: true,
			enumerable: true,
			get: function get() {
				return data[key]
			},
			set(newValue) {
				data[key] = newValue
			}
		})
	})
}

class Vue{
	constructor(options) {
		this._data = options.data
		this._render = options.render
		obverse(options.data, this._render)
		_proxy.call(this, this._data)
	}
}