// set 数据结构的特点
// 1. 无序  2. 唯一


function Set(arr = []) {
    // 用对象来表示集合 对象的一个键只能够指向一个值
    let items = {}
    // 记录集合中成员的数量
    this.size = 0

    this.has = function(val) {
        return items.hasOwnProperty(val)
    }

    this.add = function(val) {
        if(!this.has(val)) {
            items[val] = val
            this.size++
            return true
        }
        return false
    }

    this.delete = function(val) {
        if(this.has(val)) {
            delete items[val]
            this.size--
            return true
        }
        return false
    }

    this.clear = function() {
        items = {}
        this.size = 0
    }

    this.keys = function() {
        return Object.keys(items)
    }

    this.values = function() {
        return Object.values(items)
    }

    this.forEach = function(fn, context = this) {
        const keys = Object.keys(items)
        for(let i = 0; i < this.size; i++) {
            let item = keys[i]
            fn.call(context, item, item, items)
        }
    }

    this.union = function(other) {
        let union = new Set()
        let values = this.values()
        for (let i = 0; i < values.length; i++) {
            union.add(values[i])
        }
        values = other.values()
        for (let i = 0; i < values.length; i++) {
            union.add(values[i])
        }
        return union
    }

    this.intersect = function(other) {
        let intersect = new Set()
        let values = this.values()
        for (let i = 0; i< values.length; i++) {
            if (other.has(values[i])) {
                intersect.add(values[i])
            }
        }
        return intersect
    }

    this.difference = function(other) {
        let difference = new Set()
        let values = this.values()
        for (let i = 0; i < values.length; i++) {
            if (!other.has(values[i])) {
                difference.add(values[i])
            }
        }
        return difference
    }

    arr.forEach(val => this.add(val))
}


// test code
let set = new Set([2, 1, 3]);
console.log(set.keys());    // [ '1', '2', '3' ]
console.log(set.values());  // [ 1, 2, 3 ]
console.log(set.size);      // 3
set.delete(1);
console.log(set.values());  // [ 2, 3 ]
set.clear();
console.log(set.size);      // 0

// 并集
let a = [1, 2, 3];
let b = new Set([4, 3, 2]);
let union = new Set(a).union(b).values();
console.log(union);     // [ 1, 2, 3, 4 ]

// 交集
let c = new Set([4, 3, 2]);
let intersect = new Set([1,2,3]).intersect(c).values();
console.log(intersect); // [ 2, 3 ]

// 差集
let d = new Set([4, 3, 2]);
let difference = new Set([1,2,3]).difference(d).values();
// [1,2,3]和[4,3,2]的差集是1
console.log(difference);    // [ 1 ]



