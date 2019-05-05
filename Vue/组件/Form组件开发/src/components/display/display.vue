<template>
    <div>
        <div ref="display"></div>
        <button @click="handleOpen1">打开提示 1</button>
    </div>
</template>

<script>
import Vue from 'vue';
import randomStr from '../../utils/random_str.js';

export default {
    props: {
        code: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            html: '',
            js: '',
            css: '',
            component: null,
            id: randomStr()
        }
    },
    watch: {
        code () {
            this.destoryCode();
            this.renderCode();
        }
    },
    methods: {
        /* 获取到任意一段资源字符串里面 指定标签内部的字符串 */
        getSource (source, type) {
            // 可以匹配到一个类似于 <template> 这样的字符串
            const regex = new RegExp(`<${type}[^>]*>`);
            let openingTag = source.match(regex)

            // 没有匹配到标签
            if (!openingTag) return '';
            // 获取对应的标签
            else openingTag = openingTag[0];

            // 截取了整个标签里面的 html
            return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf(`</${type}>`));
        },
        splitCode () {
            const script = this.getSource(this.code, 'script').replace(/export default/, 'return ');
            const style = this.getSource(this.code, 'style');
            // 在外面套一层 div 是为了防止传入的 template 没有根节点而报错
            const template = '<div id="app">' + this.getSource(this.code, 'template') + '</div>';

            this.js = script;
            this.css = style;
            this.html = template;
        },
        renderCode () {
            this.splitCode();

            if (this.html !== '' && this.js !== '') {
                // 这就可以获取到 .vue 文件中 export default 返回的对象
                const parseStrToFunc = (new Function(this.js))();

                parseStrToFunc.template = this.html;
                const Component = Vue.extend( parseStrToFunc );
                // 进行非挂载式的渲染
                this.component = new Component().$mount();
                // 将渲染好dom对象 填充到 display 里面
                this.$refs.display.appendChild(this.component.$el);

                if (this.css !== '') {
                    const style = document.createElement('style');
                    style.type = 'text/css';
                    style.id = this.id;
                    style.innerHTML = this.css;
                    document.getElementsByTagName('head')[0].appendChild(style);
                }
            }
        },
        destoryCode () {
            // 销毁组件的时候 去除 head 标签中的 style 样式
            const $target = document.getElementById(this.id);
            if ($target) $target.parentNode.removeChild($target);

            if (this.component) {
                this.$refs.display.removeChild(this.component.$el);
                this.component.$destory();
                this.component = null;
            }
        },
        handleOpen1 () {
            this.$Alert.info({
                content: '我是提示1'
            })
        }
    },
    mounted() {
        this.renderCode();
    },
    beforeDestroy() {
        this.destoryCode();
    },
}
</script>

<style>

</style>
