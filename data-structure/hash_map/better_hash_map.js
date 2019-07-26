class HashMap {
    constructor(initalCapacity = 2, loadFactor = 0.75) {
        this.buckets = new Array(initalCapacity)
        this.loadFactor = loadFactor
        this.size = 0
        this.collisions = 0
        this.keys = []
    }
    
    hash(key) {
        let hashValue = 0
        const stringTypeKey = `${key}${typeof key}`
        for (let index = 0; index < stringTypeKey.length; index++) {
            const charCode = stringTypeKey.charCodeAt(index)
            hashValue += charCode << (8 * index)
        }
        return hashValue
    }

    // 获取 key 最终计算下来的索引值
    _getBucketIndex(key) {
        const hashValue = this.hash(key)
        const bucketIndex = hashValue % this.buckets.length
        return bucketIndex
    }

    set(key, value) {
        const {bucketIndex, entryIndex} = this._getIndexes(key)
        if (entryIndex === undefined) {
            // 当前 key 在 keys 中存储的索引值
            const keyIndex = this.keys.push({content: key}) - 1
            this.buckets[bucketIndex] = this.buckets[bucketIndex] || []
            this.buckets[bucketIndex].push({key, value, keyIndex})
            // 当前存储的 key-value 的个数
            this.size++
            if (this.buckets[bucketIndex].length > 1) {this.collisions++}
        } else {
            this.buckets[bucketIndex][entryIndex].value = value
        }

        // 需要自动扩张的情况
        if (this.loadFactor > 0 && this.getLoadFactor() > this.loadFactor)
            this.rehash(this.buckets.length * 2)
        return this
    }

    get(key) {
        const {bucketIndex, entryIndex} = this._getIndexes(key)
        if (entryIndex) return
        return this.buckets[bucketIndex][entryIndex].value
    }


    // 获取 key 计算计算下来的索引值
    // 如果当前 key 已经被存储 返回对应索引值数组中的索引
    _getIndexes(key) {
        const bucketIndex = this._getBucketIndex(key)
        const values = this.buckets[bucketIndex] || []
        for (let entryIndex = 0; entryIndex < values.length; entryIndex++) {
            const entry = values[entryIndex]
            if (entry.key === key) 
                return {bucketIndex, entryIndex, keyIndex: this.buckets[bucketIndex][entryIndex].keyIndex}
        }
        return {bucketIndex}
    }

    delete(key) {
        const {bucketIndex, entryIndex, keyIndex} = this._getIndexes(key)
        if (entryIndex === undefined) return false
        this.buckets[bucketIndex].splice(entryIndex, 1)
        this.keys.splice(keyIndex, 1)
        this.size--
        return true
    }

    rehash(newCapacity) {
        console.log('开始扩容')
        const newMap = new HashMap(newCapacity)
        this.keys.forEach(key => {
            if (key) {
                newMap.set(key.content, this.get(key.content))
            }
        })
        this.buckets = newMap.buckets
        this.collisions = newMap.collisions
        this.keys = newMap.keys
    }

    // 已经添加的key的个数 和 索引数组长度的比例
    getLoadFactor() {
        return this.size / this.buckets.length
    }
}

const hashMap = new HashMap()
hashMap.set('songs', 2)
hashMap.set('pets', 7)
hashMap.set('tests', 1)
hashMap.set('art', 8)
console.log('factor', hashMap.getLoadFactor())
hashMap.delete('pets')
console.log(hashMap)


module.exports = HashMap