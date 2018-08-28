class Person {
    constructor (name) {
        this.name = name
    }

    sayName() {
        console.log(this.name)
    }
}

let person = new Person('tony')
person.sayName()

console.log(person)