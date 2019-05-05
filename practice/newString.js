function getNewString (string) {
    var arr = string.split('');
    for(i=0;i<arr.length;i++){
        var n = string.split(arr[i]).length - 1 
        if(n == 1) {
            arr[i] = "("
        }        
        else {
            arr[i] =  ")" 
        }
    }
    return arr;
}
console.log(getNewString ('add'))