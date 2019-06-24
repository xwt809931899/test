// let a = () => {
//     let s;
//     this.s=88
//     console.log(this)
// }

// a()
// let b={}
// b.a=22

// b.test = () => {
//     console.log()
// }
// b.test()
// let c={}
// this.b = 11
// console.log(c.b)
// c.a= () => {
//     console.log(this)
// }
// c.a()

// let c = {
//     b:11,
//     a:() => {
        
//         console.log(this)
//     }
// }
// c.a()
// console.log(c.b)
// let that = function(){  console.log(this===global)};
var obj = {
    say: function () {
        console.log(this)
      var f1 = function() {
        // console.log(this === global); // obj  
          
      }
      setTimeout(() => {  
        // console.log(this); // obj  
      })
      f1();  
    }
}
    that();
    obj.say()  
// var globalObject = this;
// var foo = (() => {console.log(this)});
// // console.log(foo() === globalObject); // true
// foo();
// console.log(this);