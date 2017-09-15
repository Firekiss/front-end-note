# Javascript图片预加载详解

## 方法一： 用CSS和JavaScript实现预加载

单纯的使用CSS，可容易、高效地预加载图片

```css
#preload-01 {background: url(http://domain.tld/image-01.png) no-repeat -9999px -9999px;}
```

将这个ID选择器应用到HTML元素中，我们便可以通过CSS的background属性将图片预加载到屏幕外的背景上。只要这些图片的路径保持不变，当它们在Web页面的其他地方被调用时，浏览器就会在渲染过程中使用预加载(缓存)的图片。

[通过css预加载图片demo](通过css预加载图片.html)