'aba'

// function validPalindrome(str) {
//   let arr = str.split('').reverse()
//   let newArr = arr.splice(0,1)
//   let newStr = arr.join('')
//   let str1 = `${str}${newStr}`
//   return str1
// } 
// console.log(validPalindrome('ab'))

// function validPalindrome(str) {
//   if(!str || typeof str != 'string') return false
//   return str.split('').reverse().join('') === str   // 空间复杂度 为 n
// }
// console.log(validPalindrome('aba'))

// 大小写 空 特殊符号 忽略
var isValidChar = (c) => {  // abc  123
  return /^[\w]$/.test(c)
}
var isPalindrom = (s) => {
  s = s.toLowerCase()
  let left = 0,right = s.length - 1
  while(left < right) {
    if(!isValidChar(s[left])) {
      left++
      continue
    }
    if(!isValidChar(s[right])) {
      right--
      continue
    }
    if(s[left] == s[right]) {
      left++
      right--
    }else{
      break
    }
  }
  return right <= left
}
console.log(isPalindrom("A man, a plan, a canal: Panama"))
console.log(isPalindrom("abb"))
