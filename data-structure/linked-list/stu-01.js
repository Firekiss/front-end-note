// 手写JS实现单向链表


let LinkedList = (function(){
    class Node {
        constructor(element) {
            this.element = element
            this.next = null
        }
    }

    const length = new WeakMap()
    const head = new WeakMap()
    class LinkedList2 {
        constructor() {
            // 两个weakMap分别存储着以链表实例为键的值
            // 使用weakMap这样的数据结构是为了在实例被销毁的时候可以直接释放 weakMap中的值 防止内存泄漏
            // 同时这些值在 实例上面无法直接访问 做到了私有属性
            length.set(this, 0)
            head.set(this, null)
        }

        // 获取链表头结点的方法
        getHead() {
            return head.get(this)
        }

        // 获取链表节点数的方法
        size() {
            return length.get(this)
        }

        // 在链表的最后插入一个节点
        append(element) {
            let node = new Node(element), current;
            if (this.getHead() === null) {
                head.set(this, node)
            } else {
                current = this.getHead()
                while(current.next) {
                    current = current.next
                }
                current.next = node
            }
            let l = this.size()
            l++
            length.set(this, l)
        }

        // 在链表的指定位置插入一个节点
        insert(position, element) {
            if (position >= 0 && position <= this.size()) {
                let node = new Node(element), 
                    current = this.getHead()
                    previous,
                    index = 0

                if (position === 0) {
                    node.next = current
                    head.set(this, node)
                } else {
                    while(index++ < position) {
                        previous = current
                        current = current.next
                    }
                    node.next = current
                    previous.next = node
                }
                let l = this.size()
                l++
                length.set(this, l)
                return true
            }
            return false
        }

        // 删除指定索引位置的节点
        removeAt(position) {
            if (position > -1 && position < this.size()) {
                let current = this.getHead(),
                    previous,
                    index = 0

                if (position === 0) {
                    head.set(this, current.next)
                } else {
                    while(index++ < position) {
                        previous = current
                        current = current.next
                    }
                    previous.next = current.next
                }
                let l = this.size()
                l--
                length.set(this, l)
                return current.element
            }
            return null
        }

        indexOf(element) {
            let current = this.getHead(),
                index = 0
            
            while(current) {
                if (element === current.element) {
                    return index
                }
                index++
                current = current.next
            }
            return -1
        }

        // 移除指定的节点
        remove(element) {
            let index = this.indexOf(element)
            return this.removeAt(index)
        }

        isEmpty() {
            return this.size() === 0
        }

        toString() {
            let current = this.getHead(),
                string = ''

            while(current) {
                string += current.element + (current.next ? ', ' : '')
                current = current.next
            }
            return string
        }
    }

    return LinkedList2
})();
