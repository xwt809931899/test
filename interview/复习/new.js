function new1 () {
  let target = {},
  [constructor,...args] = [...arguments]
  target.__proto__ = constructor.prototype
  let result = constructor.apply(target,args)  //注意这里因为args是数组，所以要使用apply
  if(result && typeof(result) === 'object' || typeof(result) === 'function'){
    return result
  }
  return target
}