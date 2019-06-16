const arr = [1,2,3,4,'q']
const q = {
    a: 'a',
    b: 'b',
    c: 'c'
}


console.log(...arr)
console.log(1,2,3,4,'q')
const s=(...args)=>{console.log(args[0])}
s(1,2,3,4,'q')
console.log({a: 'a', b: 'b', c: 'c' })
console.log(q.a)
const x=({a,b,c})=>{console.log(a,b,c)}
x(q)