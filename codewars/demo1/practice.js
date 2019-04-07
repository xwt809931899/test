function rightString (str) {
    if(str.length > 140){
        return false;
    }
    if(str === ''){
        return false;
    }

    str = '#' + str.split(' ').map( (w) => {
        return w.charAt(0).toUpperCase() + w.slice(1);
    } )
}
console.log(rightString('how are you'));