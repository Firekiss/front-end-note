// 自定义可读流
let {Readable} = require('stream')
let util = require('util')


function Counter() {
    Readable.call(this)
    this.index = 3
}

Counter.prototype._read = function() {
    if (this.index--) {
        this.push(String(this.index))
    } else {
        this.push(null)
    }
}


// Counter的prototype属性指向Readable的prototype属性
util.inherits(Counter, Readable)

let counter = new Counter()
counter.on('data', function(data) {
    console.log(data)
})

