function test1() {
  const a = parseInt(Math.random() * 10)
  const b = parseInt(Math.random() * 10)

  test2(a, b)
}

function test2(a, b) {
  if (a > b) {
    console.log('a比较的大 ', a)
  } else {
    console.log('b比较的大 ', b)
  }

  return a + b
}

test1()