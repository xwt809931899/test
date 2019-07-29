Function.prototype.call() = function () {
  let [thisArg,...args] = [...arguments]
  if(!thisArg) {
    thisArg = typeof(window) === 'undefined' ? global : window
  }
  thisArg.func = this
  let result = thisArg.func(...args)  //这里是参数列表，不是数组
  delete thisArg.func
  return result
}