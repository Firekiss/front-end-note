function* G(n) {
    let a = yield n
    console.log(a)
    console.log(n)
    let b = yield n
    console.log(b)
    console.log(n)
}

let g = G(10)
let n1 = g.next()
let n2 = g.next(100)
let n3 = g.next(200)