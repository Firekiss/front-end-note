// 事件注册时在全局保存事件句柄 handlers = {};


// 给元素绑定监听事件,可同时绑定多个事件类型
function add(element, events, fn, selector, getDelegate, capture){
	// 为元素生成一个id,这个id其实就是查找元素事件处理函数的句柄
	var id = zid(element),
	// 元素上已绑定的所有时间处理函数
	// 如果根据元素句柄能查找到事件处理函数则赋值,查找不到就赋值为一个空数组
	set = (handlers[id] || (handlers[id] = []));
	eachEvent(events, fn, function(event, fn){
		var handler = parse(event);
		// 保存fn, 下面为了处理 mouseenter, mouseleave时, 对fn进行了修改
		handler.fn = fn;
		handler.sel = selector;
		if(handler.e in hover) fn = function(e){
			/**
			 * relatedTarget为事件相关对象, 只有在 mouseover 和 mouseout 事件时才有值
			 * mouseover时表示的是鼠标移出的那个对象, mouseout时表示的是鼠标移入的那个对象
			 * 当related不存在,表示事件不是 mouseover 或者 mouseout,
			 * mouseover时 !$.contains(this, related) 代表 related 元素节点不在 this dom节点里面
			 * 且 related !== this 相关事件不是对象时,表示鼠标已经从事件外部移入到了对象本身,这个时间是要处理函数的
			 * 当鼠标从事件对象移入到子节点的时候related就等于this了, 且!$.contains(this, related)也不成立了
			 * 这个时间是不需要处理函数的
			 */
			var related = e.relatedTarget;
			if(!related || (related !== this && !$.contains(this, related))){
				return handler.fn.apply(this, arguments);
			}
			// 其实这边问题的关键是 这两个事件 当鼠标从父元素移动到子元素的时候 会触发父元素的 out 和 over 事件
			// 然后再从子元素移动到父元素的时候 又会触发父元素的 out 和 over 事件
		}

		// 事件委托
		handler.del = getDelegate && getDelegate(fn, event);
		var callback = handler.del || fn;
		handler.proxy = function(e){
			var result = callback.apply(element, [e].concat(e.data));
			if(result === false) {
				e.preventDefault();
				e.stopPropagation();
				return result;
			}
		}
		// 设置处理函数在函数集中的位置
		handler.i = set.length;
		// 将函数存入函数集中
		set.push(handler);
		element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
	})
}