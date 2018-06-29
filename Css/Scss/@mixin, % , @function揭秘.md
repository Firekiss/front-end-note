## sass揭秘之@mixin，%，@function

|功能|调用方式|是否可以传递参数|样式产生方式|
|:--|:--|:--|:--|
|@mixin|@include|可以|复制拷贝的方式存在|
|%|@extend|不可以|组合申明的方式存在|

@mixin 可以设置默认参数

```scss
@mixin float($float:left){
  float: $float;
  @if $lte7 {
    display: inline;
  }
}
```

**总结**

如果一个@mixin不需要任何参数的时候,最好使用%来替代使用


@mixin 传入参数的个数不确定的时候可以在参数后面加上...

### 在mixin中使用@content

一般用于css3的media-queries, animation, keyframes

```scss
// 定义media-queries的最小最大宽度
@mixin screen($res-min, $res-max){
  @media screen and ( min-width: $res-min ) and ( max-width: $res-max ){
    @content;
  }
}

#header{
  @include screen(780px, 1000px) {
    color: red;
  }
}
```

解析之后

```css
@media screen and (min-width: 780px) and (max-width: 1000px) {
  #header {
    color: red; 
  } 
}
```