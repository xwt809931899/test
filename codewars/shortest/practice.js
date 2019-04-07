// function getshortLength (str) {
//     return str.split(' ').map((w) => {
//         return w.length;
//     }).sort((a,b) => {
//         return a-b
//     })[0]
// }
// console.log( getshortLength('howww ar yoo'));

function getshortLength (str) {
    return Math.min(...(str.split(' ').map(a => a.length)))
}
console.log( getshortLength('howww ar yoo'));
