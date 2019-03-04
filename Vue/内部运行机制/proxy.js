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