<template>
  <div id="app">
    <h3>具有数据校验功能的表单组件--Form</h3>
	<i-form ref="form" :model="models" :rules="rules">
		<i-form-item label="用户名" prop="name">
			<i-input v-model="models.name"></i-input>
		</i-form-item>
		<i-form-item label="邮箱" prop="mail">
			<i-input v-model="models.mail"></i-input>
		</i-form-item>
	</i-form>
	<button @click="handleSubmit">提交</button>
    <button @click="handleReset">重置</button>
  </div>
</template>

<script>
import iForm from '../src/components/form/form.vue'
import iFormItem from '../src/components/form/form-item.vue'
import iInput from '../src/components/input/input.vue'

export default {
  name: 'App',
  components: { iForm, iFormItem, iInput },
  data () {
	  return {
		  models: {
			  name: '',
			  mail: '',
		  },
		  rules: {
			  name: [
				  { required: true, message: '用户姓名不能为空', trigger: 'blur'}
			  ],
			  mail: [
				  { required: true, message: '邮箱不能为空', trigger: 'blur' },
				  { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
			  ]
		  }
	  }
  },
  methods: {
	  handleSubmit () {
		  this.$refs.form.validate(valid => {
			  
			  if (valid) {
				  window.alert('提交成功');
			  }
		  })
	  },
	  handleReset () {
		  this.$refs.form.resetFields();
	  }
  },
}
</script>
