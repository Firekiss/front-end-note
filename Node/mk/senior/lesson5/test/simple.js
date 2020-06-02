const {expect} = require('chai')
const {add, mul} = require('../math')

describe('#match', () => {
  describe('add', () => {
    it('should return 5 when 2 + 3', () => {
      expect(add(2,3)).to.be.equal(5)
    })
  })

  describe('mul', () => {
    it('should return 6 when 2 * 3', () => {
      expect(mul(2,3)).to.be.equal(6)
    })
  })
})