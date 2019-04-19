const fs = require('fs');
const files = [];
function walk (path) {
    fs
        .readdirSync(path)
        .forEach(file => {
            const newPath = path + '/' + file;
            const stat = fs.statSync(newPath);     //fs.stat方法查看一个文件或目录信息。当查看符号链接文件的信息时，必须使用lstat方法
            // console.log(file,'++++++')
            if (stat.isFile()) {
                // 是js文件吗
                // console.log('isFile');
                // .test(file)
                if(/\.js$/.test(file)){
                    files.push(file);
                }


            }
            else if(stat.isDirectory()){
                console.log('isDirectory');
                walk(newPath);        //这里用递归来实现接下来的操作
            }
        })
    // fs
    //     .readdir(path, function (error,        //读取一个目录下的所有文件
    //         files){
    //             if(error){
    //                 console.log(error);
    //                 return;
    //             }
    //             console.log(files);
    //         })       
}
walk('./src');
console.log(files,'--------');