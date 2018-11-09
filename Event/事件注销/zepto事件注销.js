$.fn.off = function (event, selector, callback) {
	return !selector || $.isFunction(selector) ? this.unbind(event, selector || callback) : this.undelegate(selector, event, callback);
}

$.fn.unbind = function (event, callback) {
	return this.each(function(){
		remove(this, event, callback);
	})
}

function remove(element, events, fn, selector, capture) {
    var id = zid(element)
    eachEvent(events || '', fn, function (event, fn) {
        findHandlers(element, event, fn, selector).forEach(function (handler) {
            delete handlers[id][handler.i]
            element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
        })
    })
}