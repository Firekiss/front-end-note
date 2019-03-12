var promise = new Promise((resolve, reject) => {
    reject(1)
})

// promise.catch(error => {
//     /* 此处 return 的值会作为下一个 then 的 res */
//     return error
// }).then(res => {
//     console.log(res)
// })

// promise.then(res => {
//     console.log('then1')
// }).then(res => {
//     console.log('then2')
// }).catch(error => {
//     /* 一旦发生错误, 中间的 then 就不会执行, 直接执行下面最近的一个catch */
//     console.log(error)
// })

promise.then(res => {
    console.log('then1')
}, error => {
    console.log(error)
}).then(res => {
    console.log('then2')
}, error => {
    console.log('error2')
})