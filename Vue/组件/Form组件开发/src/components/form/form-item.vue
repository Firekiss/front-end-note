<template>
	<div>
		<label v-if="label" :class="{ 'i-form-item-label-required': isRequired }">{{ label }}</label>
		<div>
			<slot></slot>
			<div v-if="validateState === 'error'" class="i-form-item-message">{{ validateMessage }}</div>
		</div>
	</div>
</template>

<script>
import Emitter from '../../../../../派发与广播/emitter.js';
import AsyncValidator from 'async-validator';

export default {
	name: 'iFormItem',
	mixins: [ Emitter ],
	inject: ['form'],
	props: {
		label: {
			type: String,
			default: ''
		},
		prop: {
			type: String
		}
	},
	data () {
		return {
			isRequired: false,  /* 是否为必填 */
			validateState: '',  /* 校验状态 */
			validateMessage: '',  /* 校验不通过时的提示信息 */
		}
	},
	computed: {
		fieldValue () {
			/* 从 Form 的 model 中动态得到当前表单组件的数据 */
			return this.form.model[this.prop];
		}
	},
	methods: {
		setRules () {
			/* 获取所有验证规则的列表 */
			let rules = this.getRules();
			if (rules.length) {
				rules.every(rule => {
					if (rule.required) {
						this.isRequired = rule.required;
						return false
					}
				})
			}
			/* 
				当 on-form-blur 和 on-form-change 事件触发的时候 分别调用句柄函数 onFieldBlur 和 onFieldChange
			*/
			this.$on('on-form-blur', this.onFieldBlur);
			this.$on('on-form-change', this.onFieldChange);
		},
		getRules () {
			/* 从 Form 的 rules 属性中, 获取当前FormItem 的校验规则 */
			let formRules = this.form.rules;

			/* 获取到当前 item 对应的验证的字段的规则列表 */
			formRules = formRules ? formRules[this.prop] : [];
			return [].concat(formRules || []);
		},
		getFilteredRule (trigger) {
			const rules = this.getRules();
			/* 从验证当前字段所有的规则之中过滤出 符合 trigger 触发事件的规则们 */
			return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
		},
		/* 校验数据
			@param trigger 校验类型
			@param callback 回调函数 默认是空函数
		*/
		validate (trigger, callback = function () {}) {
			let rules = this.getFilteredRule(trigger)

			if (!rules || rules.length === 0) {
				return true;
			}
			// 设置状态为校验中
			this.validateState = 'validating';
			
			// 以下是 async-validator 库的调用方法
			let descriptor = {};
			descriptor[this.prop] = rules;
			/* 将 descriptor 实例化验证类 */
			const validator = new AsyncValidator(descriptor);

			let model = {};
			model[this.prop] = this.fieldValue;
			/* 开始验证, 并且设置当第一次发现规则验证错误的时候, 就不再验证同一个字段后面的规则 */
			validator.validate(model, { firstFields: true }, errors => {
				this.validateState = !errors ? 'success' : 'error';
				/* 通过错误列表中 第一个对象的 message 属性来获取错误的文案 */
				this.validateMessage = errors ? errors[0].message : '';
				/* 这里注意一下箭头函数保存 this 关键字指向的使用 */
				/* 这里将 validateMessage 的值通过回调传给调用者 */
				callback(this.validateMessage);
			})
		},
		resetField () {
			this.validateState = '';
			this.validateMessage = '';
			/* 复原为缓存的原始值 */
			this.form.model[this.prop] = this.initialValue
		},
		onFieldBlur () {
			this.validate('blur');
		},
		onFieldChange () {
			this.validate('change');
		}
	},
    mounted () {
        if (this.prop) {
            /* 将当前组件的实例上传到父组件 , this指向当前组件的实例对象*/
			this.dispatch('iForm', 'on-form-item-add', this)
			/* 设置初始值, 以便在重置时恢复默认值 */
			this.initialValue = this.fieldValue
			this.setRules()
        }
    },
    beforeDestory () {
        this.dispatch('iForm', 'on-form-item-remove', this)
    }
}
</script>
<style>
  .i-form-item-label-required:before {
    content: '*';
    color: red;
  }
  .i-form-item-message {
    color: red;
  }
</style>

