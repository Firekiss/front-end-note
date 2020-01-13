module.exports.val = 'B'

const modA = require('./modA')
console.log(modA.val)

module.exports.val = 'BB'