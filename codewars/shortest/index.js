// function findShort (str) {
//     return str.split(' ').map(getLength).sort(sortLength)[0];
// }
// function getLength (ele) {
//     return ele.length;

// }
// function sortLength(a,b){
// return a-b;
// }
// console.log(findShort ('How aree youuu'));

function findShort(str){
    // return Math.min(...(str.split(' ').map(w => w.length)));
    return Math.min.apply(null,str.split(' ').map(w => w.length));   //null的作用是 因为没有对象去调用这个方法，所以直接把null传递过去
   
}
console.log(findShort ('Howwww aree youuu'));