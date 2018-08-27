function Safe() {
    if (!(this instanceof Safe)) {
        return new Safe()
    }

    this.name = 'tom'
}

Safe.prototype.show = function() {
    console.log(this.name)
}