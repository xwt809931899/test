## async
async 函数就是 Generator 函数的语法糖。

## generator
```js
 function* test() {  //function 和 函数名 之间加了 * 让*和function连起来 就很想function函数
      console.log(1)
      let a = yield 1
      console.log('a',a)
      let b = yield 2
      console.log('b',b)
      let c = yield 3
      console.log('c',c)
    }
    var g = test()
```
通过g.next() 一步一步调用
每一步调用，执行到 yield 关键词
通过传参可作为上一个yield语句的返回值

## Promise.resolve
返回一个Promise
1. 接受的参数如果是一个promise 返回该 promise
2. 如果是一个值，resolve(该值)

