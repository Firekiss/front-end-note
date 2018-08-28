// CommonJs 加载模块的方法

Module._load = function(request, parent, isMain) {
    // 计算需要加载的模块的绝对路径
    var filename = Module._resolveFilename(request, parent)
    // 通过绝对路径来查找该文件是否被缓存过,如果缓存过取出缓存对象
    var cacheModule = Module._cache[filename]
    if (cacheModule) {
        return cacheModule.exports
    }

    // 如果是内置的模块 就返回内置的模块对象
    if (NativeModule.exists(filename)) {
        return NativeModule.require(filename)
    }

    // 生成模块实例, 存入缓存中
    var module = new Module(filename, parent)
    Module._cache[filename] = module

    // 加载模块
    try {
        module.load(filename)
        hadException = false
    } finally {
        if (hadException) {
            delete Module._cache[filename]
        }
    }

    // 输出模块的exports属性
    return module.exports
}