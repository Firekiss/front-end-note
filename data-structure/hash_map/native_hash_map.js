class NativeHashMap {
    
    constructor(initialCapacity) {
        this.buckets = new Array(initialCapacity)
    }

    set(key, val) {
        const index = this.getIndex(key)
        this.buckets[index] = val
    }

    get(key) {
        const index = this.getIndex(key)
        return this.buckets[index]
    }

    hash(key) {
        let hashValue = 0
        const stringKey = key.toString()
        for (let index = 0; index < stringKey.length; index++) {
            const charCode = stringKey.charCodeAt(index)
            hashValue += charCode << (index * 8)
        }
        return hashValue
    }

    getIndex(key) {
        const indexHash = this.hash(key)
        const index = indexHash % this.buckets.length
        return index
    }
}



class DecentHashMap {

    constructor(initialCapacity = 2) {
        this.buckets = new Array(initialCapacity)
        this.collisions = 0
    }

    set(key, value) {
        const bucketIndex = this.getIndex(key)
        // 如果发生了碰撞
        if (this.buckets[bucketIndex]) {
            this.buckets[bucketIndex].push({key, value})
            if (this.buckets[bucketIndex].length > 1) 
                this.collisions++
        } else {
            this.buckets[bucketIndex] = [{key, value}]
        }
    }

    get(key) {
        const bucketIndex = this.getIndex(key)
        for (let arrayIndex = 0; arrayIndex < this.buckets[bucketIndex].length; arrayIndex++) {
            const entry = this.buckets[bucketIndex][arrayIndex]
            if (entry.key === key)
                return entry.value
        }
    }

    hash(key) {
        let hashValue = 0
        const stringTypeKey = `${key}${typeof key}`
        for (let index = 0; index < stringTypeKey.length; index++) {
            const charCode = stringTypeKey.charCodeAt(index)
            hashValue += charCode << (index * 8)
        }
        return hashValue
    }

    getIndex(key) {
        const indexHash = this.hash(key)
        return indexHash % this.buckets.length
    }
}

const hashMap = new DecentHashMap()
hashMap.set('cat', 2)
hashMap.set('rat', 7)
hashMap.set('dog', 1)
hashMap.set('art', 8)

console.log('collisions', hashMap.collisions)
console.log(hashMap.buckets)

console.log(hashMap.get('art'))
console.log(hashMap.get('cat'))
console.log(hashMap.get('rat'))
console.log(hashMap.get('dog'))