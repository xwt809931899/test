function bubbleSort(arr) {
  const len = arr.length
  for(var i = 0; i < len; i++) {
    for(var j = 0; j < len-1-i; j++){  //len - i -1 就是减去已经排好了的数量 i = 0 时 搞定1个 i = 1时，搞定2个
      if(arr[j] > arr[j+1]) {
        var temp = arr[j + 1]
        arr[j+1] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}
console.log(bubbleSort([2,1,3,5]))