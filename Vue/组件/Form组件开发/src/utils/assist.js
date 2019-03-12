/* 由一个组件, 向上找到最近的指定组件 */
/* context 代表你要基于哪个组件开始往上查找, 一般传的是 this */
/* componentName 代表你最终所要招的组件的名称 */
function findComponentUpward (context, componentName) {
    let parent = context.$parent;
    let name = parent && parent.$options.name;

    // 有父组件 && 父组件的名称不是最终想要寻找的组件名称
    // 使用 while 做递归判断
    while (parent && (!name || [componentName].indexOf(name) === -1)) {
        parent = parent.$parent
        if (parent) name = parent.$options.name;
    }
    return parent
}

/* 由一个组件, 向上找到所有的指定组件 */
function findComponentsUpward (context, componentName) {
    let parents = [];
    const parent = context.$parent;

    if (parent) {
        if (parent.$options.name === componentName) parents.push(parent);
        return parents.concat(findComponentsUpward(parent, componentName));
    } else {
        return [];
    }
}

/* 向下找到最近的指定组件 */
function findComponentDownward (context, componentName) {
    const childrens = context.$children;
    let children = null;

    // 当前组件存在子组件
    if (childrens.length) {
        for (const child of childrens) {
            const name = child.$options.name;

            if (name === componentName) {
                children = child;
                break;
            } else {
                // 深度优先遍历
                children = findComponentDownward(child, componentName);
                if (children) break;
            }
        }
    }
    return children
}

/* 由一个组件, 向下找到所有指定的组件 */
function findComponentsDownward (context, componentName) {
    return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) components.push(child);
        const foundChilds = findComponentsDownward(child, componentName);
        return components.concat(foundChilds);
    }, []);
}

/* 由一个组件, 找到指定组件的兄弟组件 */
function findBrothersComponents (context, componentName, exceptMe = true) {
    let res = context.$parent.$children.filter(item => {
        return item.$options.name === componentName;
    })
    /* 当 vue 组件在渲染的时候, 都会给每个组件添加一个内置的属性 _uid, 这个_uid是唯一的 */
    let index = res.findIndex(item => item._uid = context._uid);
    if (exceptMe) res.splice(index, 1)
    return res;
}

export {
    findComponentUpward,
    findComponentsUpward,
    findComponentDownward,
    findComponentsDownward,
    findBrothersComponents
}