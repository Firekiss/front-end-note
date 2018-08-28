// 在Module._load 方法的内部调用了 Module._findPath, 这个方法是用来返回模块的绝对路径的

Module._findPath = function(request, paths) {
    // 列出所有可能的后缀名 .js .json .node
    var exts = Object.keys(Module._extensions)

    // 如果是绝对路径, 就不再搜索
    if (request.charAt(0) === '/') {
        paths = ['']
    }

    // 是否有后缀的目录斜杠
    var trailingSlash = (request.slice(-1) === '/')

    // 如果当前路径已经在缓存中,就直接返回缓存
    var cacheKey = JSON.stringify({request: request, paths: paths})
    if (Module._pathCache[cacheKey]) {
        return Module._pathCache[cacheKey]
    }

    for (var i = 0, PL = paths.length; i < PL; i++) {
        var basePath = path.resolve(path[i], request)
        var filename

        if (!trailingSlash) {
            // 是否存在该模块文件
            filename = tryFile(basePath)

            if (!filename && !trailingSlash) {
                // 该模块文件加上后缀名是否存在
                filename = tryExtensions(basePath, exts)
            }
        }

        // 在目录中是否存在package.json
        if (!filename) {
            filename = tryPackage(basePath, exts)
        }

        if (!filename) {
            // 是否存在目录名 + index + 后缀名
            filename = tryExtensions(path.resolve(basePath, 'index'), exts);
        }

        if (filename) {
            Module._pathCache[cacheKey] = filename
            return filename
        }
    }

    // 没有找到文件,返回false
    return false
}