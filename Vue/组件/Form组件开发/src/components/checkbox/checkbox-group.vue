<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import Emitter from '../../../../../派发与广播/emitter.js';
import { findComponentsDownward } from '../../utils/assist.js';


export default {
    name: 'iCheckboxGroup',
    mixins: [ Emitter ],
    props: {
        value: {
            type: Array,
            default () {
                return []
            }
        },
    },
    data () {
        return {
            currentValue: this.value,
            childrens: []
        }
    },
    watch: {
        value () {
            this.updateModel(true);
        }
    },
    methods: {
        updateModel (update) {
            /* 获取所有的 iCheckbox 子组件实例列表 */
            this.childrens = findComponentsDownward(this, 'iCheckbox')
            if (this.childrens) {
                const { value } = this
                this.childrens.forEach(child => {
                    child.model = value

                    if (update) {
                        // 赋值 currentValue 表示当前子组件复选框是否被选中了
                        child.currentValue = value.indexOf(child.label) >= 0;
                        child.group = true
                    }
                })
            }
        },
        change (data) {
            this.currentValue = data
            this.$emit('input', data)
            this.$emit('on-change', data)
            this.dispatch('iFormItem', 'on-form-change', data)
        }
    },
    mounted() {
        this.updateModel(true)
    }
}
</script>

<style>

</style>
