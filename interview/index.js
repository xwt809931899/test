// function Person() {
//   this.name = name
// }
// let p = new Person('wn')
// 1. p.__proto__等于什么?  = Person.prototype
// 2. Person.__proto__ == Function.prototype
// 实例的__proto__等于其构造函数的prototype

// var foo = {},
//     F = function() {}
// Object.prototype.a = 'valA'
// Function.prototype.b = 'valB'
// console.log(foo.a)  // valA
// console.log(foo.b)  // undefined  
// console.log(F.a)  // valA 只会从上往下 Object给Function给F

// function Person(name) {
//     this.name = name
//     // return {}
//     return 666
// }
// let o = new Person('xwt')
// console.log(o)

// ------构造函数是不需要返回值的，使用new来创建对象时，如果return的是非对象类型，会忽略返回值。如果return的是对象，则返回的是这个对象。
// (若return null也会忽略返回值)

// function Person(name) {
//   this.name = name
// }
// function Student() {

// }
// Student.prototype = Person.prototype
// Student.prototype.constructor = Student  //让Student变成构造函数
// let s = new Student('wn')
// console.log(s instanceof Person)  //true  原型连接

// for(var i = 0; i < 10; i++) {
//   (function(i) {
//     setTimeout(()=>{
//       // console.log(i)
//     },0)
//   })(i)
// }
// for(let i = 0; i < 10; i++) {
//   setTimeout(()=>{
//     // console.log(i)
//   },0)
// }
// ---------let 每次循环会生成一个封闭的作用域和setTimeout绑定，而var每次循环会覆盖掉上一次作用域
// Array.prototype.method = function() {
//   console.log('wn')
// }
// var myArr = [1,2,3,4,5,6,7]
// myArr.name = 'xwt'
// for(let index of myArr) {  // 用for in 遍历数组 let出来的变量是数组的下标 遍历该数组上的所有枚举属性
//   console.log(index)
// }

// for in
// 1. index索引为字符串型的数字，不能直接进行几何运算
// 2. 遍历顺序有可能不是按照实际数组的内部顺序进行的
// 3. 使用for in 会遍历数组所有可枚举属性，包括原型链，所以for in 更适合遍历对象

// for of
// for in 遍历的是数组的索引,for of 遍历的数组的元素
// for of 遍历的只是数组内的元素，而不包括数组原型属性和索引

let gArr = [1,2,[3,4],5,[2,7,[3,9]]]  //递归
let oArr = [1,2,3,4,5,2,7,3,9]

// function outputArr (arr) {
//   let res = []
//   for(let i = 0; i < arr.length; i++ ) {
//     if(Array.isArray(arr[i])) {
//       res = res.concat(outputArr(arr[i]))
//     } else {
//       res.push(arr[i])
//     }
//   }
//   return res
// }
function outputArr(arr) {
  return arr.reduce(function(pre,item){
    return pre.concat(Array.isArray(item) ? outputArr(item) : item)
  },[])
}
console.log(outputArr(gArr))