<template>
  <div id="app">
	  <p>
		  <router-link to="/display">display</router-link>
		  <router-link to="/form">form</router-link>
			<router-link to="/render">render</router-link>
	  </p>
	  <p>
		  <router-view></router-view>
	  </p>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>
