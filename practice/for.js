function forAdd (n) {
    var a = 0;
    var num = 0;
    for(i=1; i <= n; i++){
        a = 3 * i - 2;
        num = 1 / a + num;
    }
    return num;
}

console.log(forAdd(1));
console.log(forAdd(2));
console.log(forAdd(3));
console.log(forAdd(4));