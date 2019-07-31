// for(var i = 0; i < 10; i++) {
//   setTimeout(() => {
//     console.log(i)  
//   })
// }

// for(var i = 0; i < 10; i++) {
//   (function (i) {
//     setTimeout(() => {
//       console.log(i)  
//     })
//   })(i)
// }

// for(var i = 0; i < 10; i++) {
//   (function (i) {
//     setTimeout(() => {
//       console.log(i)  
//     })
//   })(i)
// }


//问题就是 是每循环一次就打印一次  还是十次都循环完了，然后才开始打印？

var i = 0

setTimeout(() => {console.log(i,'----')},0)

i++

setTimeout(() => {console.log(i)},0)

i++

setTimeout(() => {console.log(i)},0)

i = 3

// js是单线程的，直到i = 3不满足条件跳出循环，for循环执行完成，i的值已经是3。此时在等待队列的3个setTimeout就会执行，打印出的是三个3