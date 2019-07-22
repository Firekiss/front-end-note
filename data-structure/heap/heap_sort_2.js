// js堆数据结构练习


// 改变一个数据内元素的顺序 变成堆数据结构 大顶堆数据结构
const buildHeap = arr => {
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
        sortNode(i, arr)
    }
}

// 从一个父节点开始 保证该父节点及其以下的节点按照 大顶堆数据结构进行排序
const sortNode = (node, arr) => {
    let len = arr.length
    let top = node
    let left = node * 2 + 1
    let right = node * 2 + 2

    // 获取三个节点中最大值的节点索引值
    if (left < len && arr[left] > arr[top]) {
        top = left
    }

    if (right < len && arr[right] > arr[top]) {
        top = right
    }

    // 说明一开始传入的node索引值不是三个节点中最大的
    if (top !== node) {
        swap(node, top, arr)
        // 递归会不断的压栈 如何使用遍历来进行优化
        sortNode(top, arr)
    }
}

// 将三个节点中最大值和一开始的顶点值进行交换
const swap = (node, max, arr) => {
    const tmp = arr[node]
    arr[node] = arr[max]
    arr[max] = tmp
}


let arr = [1,3,2,4,5,6,7,8,9,10,12,11,14,13,15]
buildHeap(arr)
console.log(arr)