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
    return Math.min(...(str.split(' ').map(w => w.length)));
    //return Math.min.apply(null,[1,2,3]);
}