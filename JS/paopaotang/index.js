//玩家1 玩家2。。。。
// object 类
// JSON object  难以完成此job
// 玩家类 es5 没有clsaa 关键字
// 首字母大写的函数 构造函数
//函数可以构建了类？
// 一个函数首字母大写约束，区别于普通函数，运行的方式以  new  运行，构造函数
// 函数是js的一等对象，js 除了基本数据类型之外，都是对象object，函数是可以被运行的对象
function Player(name){
    // js 函数语言和其他语言不一样，函数一定会存在一个this，指针，总会指向点什么常在，答应
    // this 指向实例化后的对象
    // console.log(this);node 
    this.name = name;
}   
Player.prototype.win = function(){
    console.log(this.name + "上线了");
}               //
Player.prototype.lose = function(){
    console.log(this.name + "上线了");
}               //给类添加属性定义给类添加属性定义


// 将类实例化 类是一个抽象抽象概念， 对象可以new 出来
// 孕育爱情
var player1 = new Player("皮蛋");
var player2 = new Player("小乖");

player1.win();
player2.lose();
// console.log(player1.name);

// var player2 = new Player("小乖");
// console.log(player2.name);