const fs = require('fs');    //引用模板
const files = [];
function walk (path) {
    fs
        .readdirSync(path)
        .forEach(file => {
            const newPath = path + '/' + file;
            const stat = fs.statSync(newPath);
            if(stat.isFile()){
                if(/\.js$/.test(file)){
                files.push(file);
                // console.log(files);
                }
            }
            else if(stat.isDirectory()){
                console.log('isDirectory');
                walk(newPath);

            }
        })    
}
walk('./src');
console.log(files)
