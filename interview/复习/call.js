// Function.prototype.call() = function () {
//   let [thisArg,...args] = [...arguments]
//   if(!thisArg) {
//     thisArg = typeof(window) === 'undefined' ? global : window
//   }
//   thisArg.func = this
//   let result = thisArg.func(...args)  //这里是参数列表，不是数组
//   delete thisArg.func
//   return result
// }

Function.prototype._call = function (thisArg,...args) {
  if(!thisArg) {
    thisArg = typeof(window) === 'undefined' ? global : window
  }
  thisArg.func = this
  let result = thisArg.func(...args)
  delete thisArg.func
  return result
}

let a = {
  b:1,
  sum:function (m,n) {
    console.log(a.b)
    return m + n
  }
}

let c = a.sum

console.log(c._call(a,2,4))



