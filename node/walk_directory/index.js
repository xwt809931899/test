const fs = require('fs');
const files = [];
function walk (path) {
    fs
        .readdirSync(path)
        .forEach(file => {
            const newPath = path + '/' + file;
            const stat = fs.statSync(newPath);
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
                walk(newPath);
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