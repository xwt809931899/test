let arr = [1,1,2,3,5,5,6]

function uniq (arr) {
  let newArr = new Set(arr)
  return [...newArr]
}

console.log(uniq(arr))

// 直接使用es6的Set数据结构，不会有重复的值

function uniq1 (arr) {
  let result = []
  for(let i of arr) {
    if(result.indexOf(arr[i]) === -1) {
      result.push(arr[i])
    }
  }
  return result
}
console.log(uniq1(arr))

// 使用indexOf()方法来判断，如果不存在，那么就把这个数push进去

function uniq2 (arr) {
  let result = []
  for(let i of arr) {
    if(!result.includes(arr[i])) {
      result.push(arr[i])
    }
  }
  return result
}
console.log(uniq2(arr))

// 利用includes()判断数组是否存在指定的数，如果存在，返回true,如果不存在返回false

function uniq3 (arr) {
  let map = new Map()
  let result = new Array()
  for (let i = 0; i < arr.length; i++) {
      // if () {
      //      // map.set(arr[i],true)
      // }
      if(!map.has(arr[i])) {
          map.set(arr[i],false)
          result.push(...map)
      }
  }
  return result
}
console.log(uniq3(arr))