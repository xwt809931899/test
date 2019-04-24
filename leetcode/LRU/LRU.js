// 缓存 不用每次都去硬盘里找， 在内存中缓存
var LRUCache = function (capacity) {   //capacity 容量
    this.capacity = capacity;
    this.obj = {};   //负责get set的实现 让对象和数组与this指针进行绑定，将this指针指向构造函数的实例，让实例的属性里有obj和arr这两个属性
    this.arr = [];
}


//通过key来得到
LRUCache.prototype.get = function (key) {
    //没有 -1  有  返回值 设置为最近使用 正值
    var val = this.obj[key];
        //容量不大的内存服务于最多的进程  
    if(val > 0){
        var index = this.arr.indexOf(key);
        this.arr.splice(index,1);
        this.arr.unshift(key);
        return val;
    }
    else {

        return -1;

    }

}


// 设置key和值
LRUCache.prototype.set =function (key, value) {
    //之前已存在
    if(this.obj[key]){
        this.obj[key] = value; //更新 变成最近使用 让它成为数组的最前面 下标为[0]
        var index = this.arr.indexOf(key);   //查出在哪个位置  indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
        this.arr.splice(index, 1);  //从数组中添加/删除项目，然后返回被删除的项目。前一个参数是位置，从哪删，后面的参数是个数，输出返回多少个
        this.arr.unshift(key); //unshift 放在数组最前面
        // ？ 之前的删除 放在最前面，它原本可能在第二位 所以要删除它原来的位置
        return;

    }
    // 如果有key, 返回
    //没有
    if(this.capacity === this.arr.length) {
        //放满了
        var k = this.arr.pop(); //最近最少使用  pop() 方法将删除 arrayObject 的最后一个元素，把数组长度减 1，并且返回它删除的元素的值。如果数组已经为空，则 pop() 不改变数组，并返回 undefined 值。
        this.obj[k] = undefined;
    }

    this.obj[key] = value;  //存好了
    this.arr.unshift(key);  //最近最长使用

    // 没有的话，有两种可能
    // 如果内存满了，要执行arr.pop() 让最近最少未使用的弹出去
    // 存进去  arr

}
var a = new LRUCache(2);
a.set(2,1);
a.set(1,1);
a.set(2,3);
a.set(4,1);
console.log(a.get(1));
console.log(a.get(2));
