(function($){
	var touch = {};
	// 定时器
	var touchTimeout, tapTimeout, swipeTimeout, longTapDelay = 750, longTapTimeout;

	// 如果一个元素时文本元素,就返回它的父元素
	function parentIfText(node){
		return 'tagName' in node ? node : node.parentNode;
	}

	// 判断滑动的大致方向
	function swipeDirection(x1, x2, y1, y2){
		var xDelta = Math.abs(x1 - x2), yDelta = Math.abs(y1 - y2)
		return xDelta >= yDelta ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down'); 
	}

	// 长按执行函数
	function longTap(){
		// 这里难道不需要清除定时器吗??
		// 这样做只是将指向定时器的变量指向了null
		longTapTimeout = null;
		// 如果之前有点击过
		if(touch.last){
			// 触发长按元素的 longTap 事件
			touch.el.trigger('longTap');
			// 重置touch对象 ???
			touch = {};
		}
	}

	// 取消长按方法
	function cancelLongTap(){
		if(longTapTimeout) clearTimeout(longTapTimeout)
		longTapTimeout = null;
	}

	function cancelAll() {
		if(touchTimeout) clearTimeout(touchTimeout);
		if(tapTimeout) clearTimeout(tapTimeout);
		if(swipeTimeout) clearTimeout(swipeTimeout);
		if(longTapTimeout) clearTimeout(longTapTimeout);
		touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
		touch = {}
	}

	$(document).ready(function(){
		var now, delta;

		$(document.body)
		// 绑定 touchstart 方法
		.bind('touchstart', function(e){
			// 获取 touchstart 响应时的时间戳
			now = Date.now();
			// 计算与上次触摸的时间差
			delta = now - (touch.last || now);
			// 拿到点击元素(如果它是文本则获取它的父元素)
			touch.el = $(parentIfText(e.touches[0].target));
			// 如果存在定时器, 则清除触摸定时器
			touchTimeout && clearTimeout(touchTimeout);
			// x1属性记录记录收支触摸点距离屏幕左侧的距离
			touch.x1 = e.touches[0].pageX;
			touch.y1 = e.touches[0].pageY;
			// 如果两次触摸的间隔时间小于250毫秒
			// 可以认为是双击操作
			if(delta > 0 && delta <= 250) touch.isDoubleTap = true;
			touch.last = now;
			// 启动定时器, 过一段时间之后执行 longTap 方法
			longTapTimeout = setTimeout(longTap, longTapDelay);
		})
		.bind('touchmove', function(e){
			cancelLongTap();
			touch.x2 = e.touches[0].pageX;
			touch.y2 = e.touches[0].pageY;
			// 横向偏移超过10像素就阻止页面滚动
			if(Math.abs(touch.x1 - touch.x2) > 10){
				e.preventDefault();
			}
		})
		.bind('touchend', function(e){
			cancelLongTap();

			// 水平竖直方向拖动大于30像素
			if((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) || 
				(touch.y2 && Math.abs(touch.y1 - touch.y2) > 30)){
				
				swipeTimeout = setTimeout(function(){
					// 等主任务完成之后再触发元素的 swipe 事件
					touch.el.trigger('swipe');
					touch.el.trigger('swipe' + swipeDirection(x1, x2, y1, y2));
					touch = {};
				}, 0);
			// 常规tap 长按和滑动都会将touch对象重置
			} else if ('last' in touch) {
				// delay by one trick so we can cancel the 'tap' event if 'scroll' fires
				tapTimeout = setTimeout(function(){
					// trigger universal 'tap' with the option to cancelTouch()
					// (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
					var event = $.Event('tap');
					// 事件对象挂载cancelTouch方法
					event.cancelTouch = cancelAll;
					// 点击元素触发事件
					touch.el.trigger(event);

					// trigger double tap immediately
					if(touch.isDoubleTap) {
						touch.el.trigger('doubleTap');
						touch = {};
					}
					else{
						touchTimeout = setTimeout(function(){
							touchTimeout = null;
							touch.el.trigger('singleTap');
							touch = {};
						}, 250);
					}
				}, 0);
			}
		})
		.bind('touchcancel', cancelAll)

		$(window).bind('scroll', cancelAll);
	});

	['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'doubleTap', 'tap', 'singleTap', 'longTap']
	.forEach(function(m){
		// 绑定在原型链上
		$.fn[m] = function(callback){
			return this.bind(m, callback);
		}
	});
})(Zepto);