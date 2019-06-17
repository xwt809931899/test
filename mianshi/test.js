// var adder = {
//     base : 1,
      
//     add : function(a) {
//       var f = v => v + this.base;
//       return f(a);
//     },
  
//     addThruCall: function inFun(a) {
//       var f = v => v + this.base;
//       var b = {
//         base : 2
//       };
              
//       return f.call(b, a);
//     }
//   };
//   console.log(adder.add(1));   //2
//   console.log(adder.addThruCall(1))   //2

// setTimeout(function a() {
//     console.log(this)
// },2000)
// a()

// function a() {
//     console.log(this)
// }
// a()
function Person() {  
    this.age = 0;  
    setInterval(() => {
        // 回调里面的 `this` 变量就指向了期望的那个对象了
        console.log(this)
    }, 3000);
}

var p = new Person();
p()