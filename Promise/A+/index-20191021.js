
function Promise (executor) {
  var self = this
  self.status = 'pending'
  self.data = undefined
  self.onResolvedCallback = []
  self.onRejectedCallback = []

  function resolve (value) {
    if (self.status === 'pending') {
      self.status = 'fulfilled'
      self.data = value
      self.onResolvedCallback.forEach(callback => callback(value))
    }
  }

  function reject (reason) {
    if (self.status === 'pending') {
      self.status = 'rejected'
      self.data = reason
      self.onRejectedCallback.forEach(callback => callback(reason))
    }
  }

  // 可能会执行出错
  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }

}

Promise.prototype.then = function (onResolve, onReject) {
  let self = this
  let promise2

  // 确保传入的正确与错误回调都是函数
  onResolve = typeof onResolve === 'function' ? onResolve : function (value) {
    return value
  }
  onReject  = typeof onReject  === 'function' ? onReject  : function (reason) {
    return reason
  }

  if (self.status === 'pending') {
    return promise2 = new Promise(function (resolve, reject) {
      self.onResolvedCallback.push(function (value) {
        try {
          const x = onResolve(value)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          } else {
            resolve(x)
          }
        }
        catch (e) {
          reject(e)
        }
      })

      self.onRejectedCallback.push(function (reason) {
        try {
          const x = onReject(reason)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          } else {
            resolve(x)
          }
        } 
        catch (e) {
          reject(e)
        }
      })
    })
  }

  if (self.status === 'fulfilled') {
    return promise2 = new Promise(function (resolve, reject) {
      try {
        const x = onResolve(self.data)
        // 如果 onResolve 的返回值是一个 Promise 对象
        // 直接取它的结果作为 promise2 的结果
        if (x instanceof Promise) {
          x.then(resolve, reject)
        } else {
          resolve(x)
        }
      }
      catch (e) {
        // 如果出错，以捕获到的错误作为promise2的结果
        reject(e)
      }
    })
  }

  if (self.status === 'rejected') {
    return promise2 = new Promise(function (resolve, reject) {
      try {
        const x = onReject(self.data)
        if (x instanceof Promise) {
          x.then(resolve, reject)
        } else {
          resolve(x)
        }
      }
      catch (e) {
        reject(e)
      }
    })
  }
}

// 做一些兼容或者异常的处理
function resolvePromise (promise2, x, resolve, reject) {
  let then
  let thenCalledOrThrow = false

  // promise2 是当前then返回出去的新的promise对象 它要执行注册在它内部的回调函数，必须是
  // 生成它的then函数里面onResolved onRejected 函数执行有不为promise的结果或者 promise
  // 结果内部 resolve 或者 reject 执行驱动 then 里面的 resolve 或者 reject 执行
  // 从而驱动 promise2 内注册的 onResolved onRejected 函数执行
  // 但是现在如果 x 也是 promise2 说明 x 是一个 promise 实例 它要执行then必须是自身内执
  // 行了resolve 和 reject 这样和 promise2就一样需要等待被驱动，结果就是没有机会驱动一直等待
  if (promise2 === x) {
    return reject(new TypeError('chaining cycle detected for promise!'))
  }

  if (x instanceof Promise) {
    
  }
}

//catch 方法发本质还是给当前promise实例调用了then方法，只是then里面只传入了错误处理函数
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

