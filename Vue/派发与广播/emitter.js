/**
 * 
 * @param {String} componentName 需要广播的组件的名称
 * @param {String} eventName 		 广播的事件名称
 * @param {*} params 			 广播传递的参数
 */
function broadcast(componentName, eventName, params) {
	this.$children.forEach(child => {
		// 获取每个子组件的名称
		const name = child.$options.name;

		if (name === componentName) {
			// 触发子组件的事件
			child.$emit.apply(child, [componentName, eventName].concat([params]));
		} else {
			broadcast.apply(child, [componentName, eventName].concat([params]));
		}
	});
}

export default {
	methods: {
		dispatch(componentName, eventName, params) {
			let parent = this.$parent || this.$root;
			let name = parent.$options.name;

			while (parent && (!name || name !== componentName)) {
				parent = parent.$parent;

				if (parent) {
					name = parent.$options.name;
				}
			}

			if (parent) {
				parent.$emit.apply(parent, [eventName].concat(params));
			}
		},
		broadcast(componentName, eventName, params) {
			broadcast.call(this, componentName, eventName, params);
		}
	},
}