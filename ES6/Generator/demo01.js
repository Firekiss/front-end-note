function* G() {
    console.log(1)
    yield
    console.log(2)
    yield
    console.log(3)
}

let g = G()
g.next()
g.next()
g.next()