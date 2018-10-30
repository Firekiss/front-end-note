let node = {
  type: 'Identifier',
  name: 'foo'
};

// let { type, name } = node;

let type = 'Literal';
let name = 5;

({ type, name } = node);

