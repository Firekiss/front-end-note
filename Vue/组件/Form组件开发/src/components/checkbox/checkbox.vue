<template>
    <label>
        <span>
            <input
                v-if="group"
                type="checkbox"
                :disabled="disabled"
                :value="label"
                v-model="model"
                @change="change"
            >
            <input
                v-else
                type="checkbox"
                :disabled="disabled"
                :checked="currentValue"
                @change="change"
            >
        </span>
        <slot></slot>
    </label>
</template>

<script>
import Emitter from '../../../../../派发与广播/emitter.js';
import { findComponentUpward } from '../../utils/assist.js';


export default {
    name: 'iCheckbox',
    mixins: [ Emitter ],
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: [String, Number, Boolean],
            default: false
        },
        trueValue: {
            type: [String, Number, Boolean],
            default: true
        },
        falseValue: {
            type: [String, Number, Boolean],
            default: false
        },
        label: {
            type: [String, Number, Boolean],
        }
    },
    data () {
        return {
            /* currentValue 的值始终为 Boolean 值 */
            currentValue: this.value === this.trueValue,
            model: [],
            group: false,
            parent: null
        }
    },
    watch: {
        value (val) {
            if (val === this.trueValue || val === this.falseValue) {
                this.updateModel();
            } else {
                throw 'Value should be trueValue or falseValue'
            }
        }
    },
    methods: {
        change (event) {
            if (this.disabled) {
                return false;
            }
            
            /* 当前是否选中的Boolean值 */
            const checked = event.target.checked;
            this.currentValue = checked;

            const value = checked ? this.trueValue : this.falseValue
            this.$emit('input', value)
            
            if (this.group) {
                this.parent.change(this.model)
            } else {
                this.$emit('on-change', value)
                this.dispatch('iFormItem', 'on-form-change', value)
            }
        },
        updateModel () {
            this.currentValue = this.value === this.trueValue
        }
    },
    mounted() {
        /* 查看父级组件中是否包含 iCheckboxGroup 组件*/
        this.parent = findComponentUpward(this, 'iCheckboxGroup')

        if (this.parent) {
            this.group = true
        }

        if (this.group) {
            this.parent.updateModel(true)
        } else {
            this.updateModel()
        }
    },
}
</script>

<style>

</style>
