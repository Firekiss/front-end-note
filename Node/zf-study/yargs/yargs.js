let argv = {}
// 原始的命令行输入工具输入的参数所组成的数组
let argvs = process.argv


for(let i = 2; i < argvs.length; i++) {
    const val = argvs[i]
    // 判断当前参数是否为键
    if (val.startsWith('--')) {
        const key = val.slice(2)
        argv[key] = argvs[++i]
    }
}


module.exports = {
    argv
}