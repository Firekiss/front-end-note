1. ## H5页面中布局的实践与思考

   > 本次分享基于开发过程中的一些实例,总结一些方法

   高保真图

   <img src="/Users/zhangzhitao/front-end-note/che300%E5%88%86%E4%BA%AB/20190509/img-01.png">

   问: 图中红色框区域内的布局,我们如何能做到

   1. 具有良好的兼容性
   2. 具有良好的自适应
   3. 能否想出多种布局的方案

   第一个红色框内部的布局,是一个典型的左边定宽,右边内容自自适应并且让左右盒子都顶部对齐的布局.

   关键点:

   1. 如何做到右侧自适应, 横向自适应在css中涉及哪些知识点?
   2. 如何做到顶部对齐, 顶部对齐在css中涉及哪些知识点?

   实现

   1. [使用flex来布局](https://jsrun.net/UMXKp)
   2. [使用浮动来布局-01](https://jsrun.net/9MXKp)
   3. [使用浮动来布局-02](https://jsrun.net/QMXKp)
   4. [使用浮动来布局-03](https://jsrun.net/zMXKp)
   5. [使用浮动来布局-04](https://jsrun.net/PMXKp)
   6. [使用inline-block来布局](https://jsrun.net/EMXKp)
   7. [使用table布局来布局](https://jsrun.net/7MXKp)
   8. [使用定位来实现](https://jsrun.net/dMXKp)

   

   第二个红色框内部的布局,是一个右边定宽,左边input框自适应并且两者垂直居中的布局

   关键点:

   1. input框自适应的难点是什么?

   2. 如何垂直居中?

      

   [尝试编写的demo](https://jsrun.net/xMXKp)

   

   input这类的替换元素实现任意比例的自适应的最优布局是怎么样呢?

   本次分享涉及到的知识点罗列,方便小伙伴后面查漏补缺

   

   1. 浮动(清除浮动的原理)
   2. BFC
   3. margin:auto 与 width: auto 的特性, margin值为负数的特性
   4. inline-block的间隙问题
   5. table布局的使用
   6. vertical-align相关的知识点