function deepClone (p,c = {}) {
  for(let i in p) {
    if(typeof(p[i]) === 'object') {
      c[i] = (p[i].constructor === Array) ? [] : {}
      deepClone(p[i],c[i])
    }else {
      c[i] = p[i]
    }
  }
  return c
}

let a = {
  name:'xwt',
  hobbies:['唱','跳','rap']
}
let b = {}

console.log(deepClone(a,b))
a.hobbies.push('kk')
console.log(a)
console.log(b)