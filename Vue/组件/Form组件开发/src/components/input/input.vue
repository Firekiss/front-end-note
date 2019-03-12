<template>
    <input
        type="text"
        :value="currentValue"
        @input="handleInput"
        @blur="handleBlur"
    />
</template>

<script>
    import Emitter from '../../../../../派发与广播/emitter.js';

    export default {
        name: 'iInput',
        mixins: [ Emitter ],
        props: {
            value: {
                type: String,
                default: ''
            },
        },
        data () {
            return {
                /* 这里重新在 data 上定义一个属性是因为后面 input 的值改变之后会马上将 input的值同步到model层
                   如果直接使用 prop 属性 value 的话会违背单向数据流的原则
                */
                currentValue: this.value
            }
        },
        watch: {
            value (val) {
                this.currentValue = val
            }
        },
        methods: {
            handleInput (event) {
                const value = event.target.value
                this.currentValue = value
                /* 触发父级元素的自定义 input 事件,并传值 value */
                this.$emit('input', value)
                this.dispatch('iFormItem', 'on-form-change', value)
            },
            handleBlur () {
                this.dispatch('iFormItem', 'on-form-blur', this.currentValue)
            }
        }
    }
</script>
