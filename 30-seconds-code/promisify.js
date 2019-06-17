const fs = require('fs')
const promisify = (func) => {
    //promisify return 出去的函数
    return (...args) => {
        return new Promise ((resolve,reject) => {
           func(...args,(err,result) => {
               if(err) {
                   reject(err)
               }else{
                   resolve(result)
               }
           }) 
        })
    }
}
// fs.readFile('./promisify.html',{
//     encoding:'utf8'},(err,data) => {
//         if (!err) {
//             console.log(data)
//         }
//     })

const promiseReadFile = promisify(fs.readFile)
promiseReadFile('./promisify.html',{encoding:'utf8'})
.then(data => {
    console.log(data)
})