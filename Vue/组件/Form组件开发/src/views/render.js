//  渲染的子组件
import renderChild from './render-child.vue';
import Vue from 'vue';

const littleComponent = Vue.component('little', {
    template: '<div>little</div>',
    name: 'little'
})

const component = Vue.extend({
    render(h) {
        // return h(renderChild,[
        //     h(littleComponent)
        // ])
        return h(renderChild, [h(renderChild), h(littleComponent)])
    },
})

const componentInstance = (new component()).$mount()
console.log(componentInstance, componentInstance.$children[0])

document.body.appendChild(componentInstance.$el)