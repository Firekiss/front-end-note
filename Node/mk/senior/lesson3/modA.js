module.exports.val = 'A'

const modB = require('./modB')
console.log(modB.val)

module.exports.val = 'AA'