// 手写JS实现双向链表


function DoubleLinkedList() {
    let Node = function(element) {
        this.element = element
        this.next = null
        this.prev = null
    }

    let length = 0
    let head = null
    let tail = null

    this.append = function(element) {
        let node = new Node(element),
            current
        
        if (head === null) {
            head = node
            tail = node
        } else {
            tail.next = node
            node.prev = tail
            tail = node
        }
        length++
    }

    this.insert = function(position, element) {
        if (position >=0 && position <= length) {
            let node = new Node(element),
                current = head
                previous,
                index = 0
            
            if (position === 0) {
                if (!head) {
                    head = node
                    tail = node
                } else {
                    node.next = current
                    current.prev = node
                    head = node
                }
            } else if (position === length) {
                current = tail
                current.next = node
                node.prev = current
                tail = node
            } else {
                while(index++ < position) {
                    previous = current
                    current = current.next
                }
                node.next = current
                node.prev = previous
                current.prev = node
                previous.next = node
            }
            length++
        }
        return false
    }

    this.removeAt = function(position) {
        if (position > -1 && position < length) {
            let current = head,
                previous,
                index = 0

            if (position === 0) {
                if (length === 1) {
                    tail = null
                    head = null
                } else {
                    head = current.next
                    head.prev = null
                }
            } else if (position === length - 1) {
                current = tail
                tail = current.prev
                tail.next = null
            } else {
                while(index++ < position) {
                    previous = current
                    current = current.next
                }
                previous.next = current.next
                current.next.prev = previous
            }
            length--
            return current.element
        }
        return null
    }

    this.indexOf = function(element) {
        let current = head,
            index = -1
        
        if (element === current.element) return 0
        index++
        while(current.next) {
            if (current.element === element) return index
            current = current.next
            index++
        }
        if (element === current.element) return index
        return -1
    }

    this.remove = function(element) {
        let index = this.indexOf(element)
        return this.removeAt(index)
    }
}