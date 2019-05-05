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
		<i-form-item label="年级" prop="grads">
			<i-checkbox-group v-model="models.grads">
				<i-checkbox label="1年级">1</i-checkbox>
				<i-checkbox label="2年级">2</i-checkbox>
			</i-checkbox-group>
		</i-form-item>
	</i-form>
	<button @click="handleSubmit">提交</button>
    <button @click="handleReset">重置</button>
  </div>
</template>

<script>
import Vue from 'vue'
import iForm from '../components/form/form.vue'
import iFormItem from '../components/form/form-item.vue'
import iInput from '../components/input/input.vue'
import iCheckbox from '../components/checkbox/checkbox'
import iCheckboxGroup from '../components/checkbox/checkbox-group'

const alertComponent = Vue.extend({
	template: '<div>重置了</div>'
})



export default {
  name: 'App',
  components: { iForm, iFormItem, iInput, iCheckbox, iCheckboxGroup },
  data () {
	  return {
		  models: {
			  name: '',
				mail: '',
				grads: [],
		  },
		  rules: {
			  name: [
				  { required: true, message: '用户姓名不能为空', trigger: 'blur'}
			  ],
			  mail: [
				  { required: true, message: '邮箱不能为空', trigger: 'blur' },
				  { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
				],
				grads: [
					{ required: true },
					{ type: 'array', max: 1, message: '最多只能选择一个年级' }
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
			// 手动去渲染组件 获得 vm 实例
			const component = (new alertComponent()).$mount()
			document.body.appendChild(component.$el)
	  }
  },
}
</script>
