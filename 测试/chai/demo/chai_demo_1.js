var chai = require('chai');

const expect = chai.expect;

expect(1).to.equal(1);
// expect({a: 1}).to.equal({a: 1}, 'this is error msg');

expect({a: 1}).to.eql({a: 1}).but.not.equal({a: 1});

// include
expect('foobar').to.include('oob');
