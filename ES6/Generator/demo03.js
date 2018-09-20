function* G() {
    yield 1;
    return 2;
}

let g1 = G()
console.log( g1.next() )
console.log( g1.next() )
console.log( g1.next() )

let g2 = G()
for (let v of g2) {
    console.log(v); // 只打印出 1。
}