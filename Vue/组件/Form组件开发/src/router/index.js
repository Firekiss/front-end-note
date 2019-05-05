import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import displayComponent from '../views/display.vue';
import formComponent from '../views/form.vue';
import renderComponent from '../views/render.vue';

export default new Router({
	routes: [
		{ path: '/display', component: displayComponent },
		{ path: '/form', component: formComponent },
		{ path: '/render', component: renderComponent }
	]
})
