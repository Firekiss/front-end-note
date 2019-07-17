# 如何编写出更加容易维护的代码


身边做前端的小伙伴，很多实用react的公司都已经开始强制实用的TS,但是这个不是我们今天要探讨的问题
今天我们讨论的是在现有的JS的基础上提高代码的可维护性


## 1、 变量命名

```js
function getPage(url) {
    // 爬虫的时候抓取页面的数据
}

downloadPage  fetchPage


class Player {
    // 开始播放
    start() {}
    // 暂停播放
    stop() {}
    // 继续播放
    continue() {}
}


class Player {
    // 暂停
    pause() {}
    // 继续
    resume() {}
}
```


### 把信息装到名字里面

|  单词  | 更多选择  |
|  ---- | ----  |
| send  | deliver、dispatch、announce、distribute、route |
| find  | search、extract、locate、recover |
| start | launch、create、begin、open |
| make  | create、set up、build、generate、compose、add、new |


### 带单位的命名

|  参数或变量	  | 带单位的命名  |
|  ---- | ----  |
| start(int delay)	  | delay -> delaySecs |
| createCache(int size)  | size -> sizeMB |
| throttleDownload(float limit) | limit -> maxKB |
| setHeight(float height) | height -> heightCM |

### 给名字附加额外信息

|  场景	  | 变量名  | 更好的名字 |
|  ---- | ----  | ---- |
| 一个纯文本的密码，需要加密后才可以使用 | password | plaintextPassword |
| 一条用户评论，需要转义后显示  | comment | unescapedComment |
| 已转化为UTF-8的HTML文本 | html | htmlUtf8 |
| 以"URL"方式编码的输入数据 | data | dataURLEncode |

### 让人不会误解的名字

表示上限和下限：max min
表示包含的范围：first last
表示包含、排除某个范围：begin end

命名一个 bool 类型的值，应该使用 is 、 has 这样的词来明确它所表达的含义。 避免使用反义的词，比如 disable。

要小心用户对特定词的期望。例如用户会认为 get 或 size 是一个轻量的方法。


## 2、 流程简化

写一个比较时，把改变的值放在左边，把稳定的值放在右边

```js
if (ID === item.id) {}
if (item.id === ID) {}
```

可以重新排列 if else 代码块，优先处理正确的、简单的逻辑。 有时这些准则会冲突，当不冲突时，遵循这些经验法则。

```js
    if (a == b) {
        console.log("有钱人");
    } else {
        console.log("没钱的肥宅");
    }
    
    if (a != b) {
        console.log("没钱的肥宅");
    } else {
        console.log("有钱人");
    }
```


像三目运算符、do while循环经常会导致代码可读性变差。最好不要使用它们， 因为总是有更整洁的方式。


```js
    timeString = (hour >= 12) ? "pm" : "am";

    if(hour >= 12){
        timeString = "pm";
    } else {
        timeString = "am";
    }
```

嵌套的代码块需要花一些时间去理解。每层新的嵌套都会给读者“思维栈” push 一条数据。应该让它们变得“线性”，来避免深层嵌套。提早返回可以让代码更整洁。

```js
    if (a === 0) {
        return 
    }

     c = a + b


    if (a !== 0) {
        c = a + b
    }
```


## 3、什么样的注释是好的?写出言简意赅的注释

当像 “这里” 和 “it” 这样的代词可能指代多个事物时，避免使用它们

尽量精确的描述方法行为

在注释中用精心挑选的输入/输出例子进行说明
```js

// 从 src 中移除以 chars 开头/结尾的字符
// strip("abba/a/ba", "ab") return "/a/"

```

声明代码的高层次意图，而非明显的细节
用含义丰富的词来使注释更加简洁

```js
// 从高到低的显示每个商品的价格
// 根据我们是否已经爬过这个URL，给它一个不同的优先级。
// 优先考虑之前从未爬过的网址
// 返回此文件中有多少换行("\n")
```

## 4、拆分又臭又长的表达式

引入“解释变量”代替较长的子表达式，有三个好处：

它把巨大的表达式拆分成一个小段
通过简单的名字来描述一个子表达式，让代码文档化
它帮助读者识别代码中重要的概念

```js
line = "hello : world";
if ("hello".equals(line.split(":")[0].trim())) {
    // TODO
}

line  = "hello : world";
hello = line.split(":")[0].trim();
if ("hello".equals(hello)) {
    // TODO
}
```

## 5、抽取无关的代码

```js
// 返回 'array' 中哪个位置最接近给定的经纬度
// 将地球塑造成一个完美的球体。
var findClosestLocation = function (lat, lng, array) {
    var closest;
    var closest_dist = Number.MAX_VALUE;
    for (var i = 0; i < array.length; i++) {

        var dist = spherical_distance(lat, lng, array[i].latitude, array[i].longitude);
        if (dist < closest_dist) {
            closest = array[i];
            closest_dist = dist;
        }
    }
    return closest;
};

function spherical_distance(lat, lng, latitude, longitude) {
    // 将两个点转换为弧度
    var lat_rad = radians(lat);
    var lng_rad = radians(lng);
    var lat2_rad = radians(latitude);
    var lng2_rad = radians(longitude);

    // 使用'球面三角形的余弦定理'公式
    return Math.acos(Math.sin(lat_rad) * Math.sin(lat2_rad) +
        Math.cos(lat_rad) * Math.cos(lat2_rad) +
        Math.cos(lng2_rad - lng_rad));
}

function radians(point) {
    return 1;
}
```


