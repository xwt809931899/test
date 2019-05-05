function minAdd (arr) {
    for(i=0;i<arr.length;i++){
        if(arr.length === 0 || !/^-?\d+$/.test(arr[i])) {
            return false;
        }
        else {
            var a = Math.min(...arr);
            var index = arr.indexOf(a);
            arr.splice(index,1);
            var b = Math.min(...arr);
            return a + b;
        }
    }
    
}
console.log(minAdd([]));
console.log(minAdd([10,343445353,3453445,3453545353453]));
