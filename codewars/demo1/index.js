// function a (string) {
//     if(string.length > 140){
//         return false;
//     }
//     else if(string.length == 0){
//         return false;

//     }
//     string = '#'+ string;
//     return string;
//     //重点  空格

    

// }
// function generateHashtag(str){
//     return (str.length > 140 || str === '') ? false : '#' + str.split('').map(capitalize).join(' ');
  
// }
// function capitalize(w){
//     // console.log(w);
//     return w.charAt(0).toUpperCase() + w.slice(1); 
// }
// console.log(generateHashtag('hoe are you'));
// console.log(a('How are you'));
function rightString (str) {
    if(str.length > 140){
        return false;
    }
    if(str === ''){
        return false;
    }

    return str = '#' + str.split(' ').map( (w) => {
        return w.charAt(0).toUpperCase() + w.slice(1);
    } ).join(' ');
}
console.log(rightString('how are you'));