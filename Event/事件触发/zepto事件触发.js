$.fn.trigger = function(event, data){
	if(typeof event === 'string' || $.isPlainObject(event)) {
		// 创建自定义对象 
		event = $.Event(event);
		fix(event)
		event.data = data;
		return this.each(function(){
			if('dispatchEvent' in this) {
				// 所以,其实主动触发事件的本质就是 dom元素调用自己的 dispatchEvent 方法去触发事件
				// 将事件对象当做参数传递给 dispatchEvent 方法
				this.dispatchEvent(event);
			}
		})
	}
}

var specialEvents = {};
specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents';

// 根据参数创建一个event对象
$.Event = function(type, props){
	// 当type是个对象的时候
	if (typeof type !== 'string') {
		props = type;
		type = props.type;
	}
	// 创建一个event对象, 如果是click, mouseover, mouseout时, 
	var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true;

	if(props){
		for(var name in props){
			(name === 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name]);
		}
	}
	event.initEvent(type, bubbles, true);
	// 添加 isDefaultPrevented 方法,返回一个布尔值,表明当前事件的默认动作是否被取消
	event.isDefaultPrevented = function(){
		return this.defaultPrevented;
	}
	return event;
}
