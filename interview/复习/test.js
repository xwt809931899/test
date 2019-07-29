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

for(var i = 0; i < 10; i++) {
  (function (i) {
    setTimeout(() => {
      console.log(i)  
    })
  })(i)
}


//问题就是 是每循环一次就打印一次  还是十次都循环完了，然后才开始打印？