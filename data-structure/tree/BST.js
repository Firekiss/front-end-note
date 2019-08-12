const LEFT = 0
const RIGHT = 1

class TreeNode {
    constructor(value) {
        this.value = value
        this.children = []
        this.parent = null
        this.meta = {}
    }

    get left() {
        return this.children[LEFT]
    }

    set left(node) {
        this.children[LEFT] = node
        if (node) node.parent = this
    }

    get right() {
        return this.children[RIGHT]
    }

    set right(node) {
        this.children[RIGHT] = node
        if (node) node.parent = this
    }
}


class BinarySearchTree {
    constructor() {
        this.root = null
        this.size  = 0
    }

    add(value) {
        const newNode = new TreeNode(value)
        if (this.root) {
            const { found, parent } = this.findNodeAndParent(value)
            // 二叉搜索树中已经有节点是这个值了
            if (found) {
                found.meta.multiplicity = (found.meta.multiplicity || 1) + 1
            } else if (value < parent.value) {
                parent.left = newNode
            } else {
                parent.right = newNode
            }
        } else {
            this.root = newNode
        }
        this.size++
        return newNode
    }

    findNodeAndParent(value) {
        let node = this.root
        let parent
        while (node) {
            if (node.value === value) break
            parent = node
            node = ( value >= node.value) ? node.right : node.left
        }
        return { found: node, parent }
    }
}