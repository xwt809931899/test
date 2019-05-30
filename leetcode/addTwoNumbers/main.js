//线性表   用来存储数据
function LinkedNode(val) {   //只有构造函数的类
    this.val = val;
    this.next = null;     //指针 让前后产生关系
}


function addTwoNumbers (l1,l2) {

}
console.log(addTwoNumbers(a1,b1));
// 529
let a1 = new LinkedNode(5);      //head结点 头结点
let a2 = new LinkedNode(2);
let a3 = new LinkedNode(9);      //尾结点
a1.next = a2;
a2.next = a3;

let b1 = new LinkedNode(9);
let b2 = new LinkedNode(3);
b1.next = b2;
// console.log(`${a1.val}${a2.val}${a3.val}`);

let node = a1; //表头
while (node) {
    console.log(node.val)
    node = node.next;
}