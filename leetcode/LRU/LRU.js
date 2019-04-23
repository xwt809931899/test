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
    if(val <= 0){
        return -1;
    }
    else {

        var index = this.arr.indexOf(key);
        this.arr.splice(index,1);
        this.arr.unshift(key);
        return val;

    }

}


// 设置key和值
LRUCache.prototype.set =function (key, value) {
    //之前已存在
    if(this.obj[key]){
        this.obj[key] = value; //更新 变成最近使用 让它成为数组的最前面 下标为[0]
        var index = this.arr.indexOf(key);   //查出在哪个位置
        this.arr.splice(index, 1);
        this.arr.unshift(key); //unshift 放在数组最前面
        // ？ 之前的删除 放在最前面，它原本可能在第二位 所以要删除它原来的位置

    }
    // 如果有key, 返回
    //没有
    if(this.capacity === this.arr.length) {
        //放满了
        var k = this.arr.pop(); //最近最少使用
        this.obj[k] = undefined;
    }

    this.obj[key] = value;  //存好了
    this.arr.unshift(key);  //最近最长使用

    // 没有的话，有两种可能
    // 如果内存满了，要执行arr.pop() 让最近最少未使用的弹出去
    // 存进去  arr

}
var a = new LRUCache(2);
a.set(1,1);
a.set(2,2);
a.set(3,3);
a.get(2);
a.set(4,0);
console.log(a.get(4));