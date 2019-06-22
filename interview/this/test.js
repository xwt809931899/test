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
let c={}
this.b = 11
c.a= () => {
    console.log(this)
}
c.a()