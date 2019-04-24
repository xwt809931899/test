var LRUCache = function(capacity) {
    this.capacity = capacity //容量
    this.obj = {}; //存放
    // 最近最少使用？
    // obj 存取, 数组来存重要性 
    // 开头[0]，   结尾 .length-1
    // unshift  pop()  
    this.arr = [];
  }
  LRUCache.prototype.get = function(key) {
    var val = this.obj[key];
    if (val > 0) {
      // 最近最少使用
      var index = this.arr.indexOf(key);
      this.arr.splice(index, 1);
      this.arr.unshift(key);
      return val;
    } else {
      return -1;
    }
  }
  LRUCache.prototype.set = function(key, val) {
    // 之前已存在
    if (this.obj[key]) {
      this.obj[key] = val; //更新
      var index = this.arr.indexOf(key);
      this.arr.splice(index, 1);
      this.arr.unshift(key);
      return;
    }
    // 空间不够了怎么办？
    if (this.capacity === this.arr.length) {
      //满了
      var k = this.arr.pop();
      this.obj[k] = undefined;
    }
    // 1, 1
    this.obj[key] = val;//存好了
    this.arr.unshift(key); //最近最常使用
  
  }
  
  var a = new LRUCache(2);
  a.set(2,1);
  a.set(1,1);
  a.set(2,3);
  a.set(4,1);
  console.log(a.get(1));
  console.log(a.get(2));
  