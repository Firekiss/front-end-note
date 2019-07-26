const HashMap = require('../hash_map/better_hash_map')


class MySet {
    constructor() {
        this.hashMap = new HashMap()
    }

    add(value) {
        return this.hashMap.set(value)
    }

    getSize() {
        return this.hashMap.size
    }

    delete(value) {
        return this.hashMap.delete(value)
    }

    has(value) {

    }

    entries() {
        return this.hashMap.keys.reduce((acc, key) => {
            if (key !== undefined) {
                acc.push(key.content)
            }
            return acc
        }, [])
    }
}