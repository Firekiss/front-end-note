class Father {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    say() {
        console.log('my name is ' + this.name)
    }
}

class Son extends Father {
    constructor(name, age, sex) {
        super(name, age)
        this.sex = sex
    }

    say() {
        console.log('overWrite my name is ' + this.name + ' and i am a ' + this.sex)
    }
}

let g = new Son('LiLi', 10, 'girl')
g.say()