// 找到数组中重复的数
let arr = [1,2,2,2,3,3,4,4,4,5,6,6]
// function firstNum(arr) {
//   let result = []
//   let result1 = []
//   for(let i = 0; i < arr.length; i++) {
//     if(!result.includes(arr[i])){
//       result.push(arr[i])
//     }
//     else{
//       result1.push(arr[i])
//     }
//   }
//   return result1
// } 
// console.log(firstNum(arr))

function firstNum (arr) {
  let map = new Map()
  let result = new Array()
  for(let i = 0; i < arr.length; i++) {
    map.set(arr[i],map.has(arr[i]))
  }  
  for(let [key,value] of map) {
    if(value === false) {
      return key
    }
  }
}
console.log(firstNum(arr),'-----------------')

// 找到数组中第一个非重复的数
// function firstNum(arr) {
//   let result = []
//   let result1 = []
//   for(let i of arr) {
//     if(!result.includes(arr[i])){
//       result.push(arr[i])
//     }
//     else{
//       result1.push(arr[i])
//     }
//   }
// } 
// firstNum(arr)

function test (arr) {
  let map = new Map()
  for(let i = 0; i < arr.length; i++) {
    map.set(arr[i],map.has(arr[i]))
  }
  for(let [key,value] of map) {
    if(value === false) {
      return key
    }
  }
}
console.log(test(arr))


