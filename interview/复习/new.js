// function new1 () {
//   let target = {},
//   [constructor,...args] = [...arguments]
//   target.__proto__ = constructor.prototype
//   let result = constructor.apply(target,args)  //注意这里因为args是数组，所以要使用apply
//   if(result && typeof(result) === 'object' || typeof(result) === 'function'){
//     return result
//   }
//   return target
// }

function _new (constructor,args) {
  let target = {}
  target.__proto__ = constructor.prototype
  let result = constructor.apply(target,args)
  if(result && typeof(result) === 'object' || typeof(result) === 'function') {
    return result
  }
  return target
}

function person (name,age) {
  this.name = name
  this.age = age
} 
let person1 = _new(person,['xwt',18])
// let person1 = new Person('xwt',18)
console.log(person1)