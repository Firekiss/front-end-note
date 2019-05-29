
const fs = require('fs');

const mkdirp = function(pathStr) {
    let pathList = pathStr.split('/');
    let mkDirIndex = 0;

    !function mkdirOnce(){
        mkDirIndex++;
        if (mkDirIndex === pathList.length + 1) return;
        let curPath = pathList.slice(0, mkDirIndex).join('/');
        console.log(`当前创建的目录为: ${curPath}`);
        fs.access(curPath, fs.constants.F_OK, function(err){
            // 目录不存在的时候 创建
            if (err && err.code === 'ENOENT') {
                fs.mkdir(curPath, function(err){
                    if (err) {
                        console.error(`创建 ${curPath} 目录的时候发生错误 ${err}`);
                    } else {
                        mkdirOnce();
                    }
                });
            } else {
                mkdirOnce();
            }
        });
    }();

}

mkdirp('a/b/c/d');