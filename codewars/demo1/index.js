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
function generateHashtag(str){
    return (str.length > 140 || str === '') ? false : '#' + str.split(' ').map(capitalize).join(' ');
  
}
function capitalize(w){
    // console.log(w);
    return w.charAt(0).toUpperCase() + w.slice(1); 
}
console.log(generateHashtag('How are you'));
// console.log(a('How are you'));