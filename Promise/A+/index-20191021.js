
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