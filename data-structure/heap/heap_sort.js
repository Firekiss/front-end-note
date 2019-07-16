
const buildMaxHeap = function (arr) {
    len = arr.length
    for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
        maxHeapify(arr, i, len)
    }
}

const maxHeapify = function(arr, index, heapSize) {
    let max, left, right

    max = index  // 当前节点
    left = 2 * index + 1  // 当前节点的左子节点
    right = 2 * index + 2  // 当前节点的右子节点

    // 如果存在左子节点 && 左子节点比当前父节点大
    if (left < heapSize && arr[max] < arr[left]) {
        max = left
    }

    if (right < heapSize && arr[max] < arr[right]) {
        max = right
    }

    // 此时的 max 值已经指向了三个数中最大的值索引了

    if (max !== index) {
        // 进行一次交换
        swap(arr, max, index)

        // 如果数据过多可以使用遍历来处理 防止调用栈过多
        // https://juejin.im/post/5b3db7a15188251aad20eccf
        maxHeapify(arr, max, heapSize)
    }
}


const swap = function(arr, i, j) {
    // 当前最大值
    const temp = arr[i]
    // 最大值变成父节点的值
    arr[i] = arr[j]
    arr[j] = temp
}

const heapSort = function(arr) {
    let i
    buildMaxHeap(arr)
    for (i = arr.length - 1; i > 0; i--) {
        swap(arr, 0, i)
        maxHeapify(arr, 0, i)
    }
}


const arr = [2,1,3,4,5,7,6]
buildMaxHeap(arr)
console.log(arr)

const arr1 = [2,1,3,4,5,7,6,8,9,10,12,11,13,14,18]
heapSort(arr1)
console.log(arr1)

const arr2 = [2, 8]
buildMaxHeap(arr2)
console.log(arr2)