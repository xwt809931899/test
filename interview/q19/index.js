// 有一个无序数组  找出第k大的数
// [5,4,7,2,9,1]  2
// function findKthLargest(nums,k) {
//   if(k < 0 || k > nums.length - 1) return NaN
//   console.log(nums.sort((a,b) => a - b < 0))
//   return nums.sort((a,b) => a - b < 0)[k-1]
// }
// console.log(findKthLargest([5,4,7,2,9,1],3))
// 这方法显然不行 时间复杂度不符合要求

function findKthLargest(nums,k) {
  const arr = quickSort(nums)
  return arr[k-1]
}
console.log(findKthLargest([5,4,7,2,9,1],1))
function quickSort(arr) {
  if(arr.length <= 1) return arr
  let left = [],right = [],baseDot = Math.round(arr.length/2),base = arr.splice(baseDot,1)[0]
  for(let i = 0; i < arr.length; i++) {   // O(n)  一遍循环
    if(arr[i] > base) {
      left.push(arr[i])
    }else{
      right.push(arr[i])
    }
  }

  return quickSort(left).concat([base],quickSort(right))  // O(log2N)将左中右拼接起来，使用concat方法，拼接数组，并且会保持原来的顺序
}
