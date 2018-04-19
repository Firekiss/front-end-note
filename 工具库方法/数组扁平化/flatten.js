function flatten(arr) {
  var res = [];
  for (var i=0; i<arr.length; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(flatten(arr[i]));
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}

function flattenDepth (arr, deep = 1) {
  var res = [];
  arr.forEach(item => {
    let d = deep;
    // 遍历到的对象如果还是一个数组的话
    if (Array.isArray(item) && d > 0) {
     res.push(...(flattenDepth(item, --d)));
    } else {
     res.push(item);
    }
  });
  return res;
}

// 使用 reduce 高阶函数进行处理
function flattenReduce (arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flattenReduce(cur) : cur);
  }, []);
}

// toString 方法 如果数组的元素都是数字，那么我们可以考虑使用 toString方法，因为：
// toString会将数组中的数字以逗号形式结合起来。

// 但是这种场景只适用于数组内部全部是数字的情况, 因为中间是全部转换为字符串了。

function flattenToString (arr) {
  return arr.toString().split(',').map(function(item){
    return Number(item);
  })
}

// 使用扩展运算符号
// caoncat 方法内的每一项都剥离一层[], 而 ... 扩展运算本身也会剥离一层[]
function flattenEs6 (arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}


console.log(flattenDepth([1,[2,[3,[4]],5]], 3));
console.log(flattenReduce([1,[2,[3,[4]],5]], 3));