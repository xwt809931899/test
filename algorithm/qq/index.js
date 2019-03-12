//数组是最廉价的数据结构
let enc_qq = [6,3,1,7,5,8,9,2,4];
let qq = [];  //真正的qq  一行声明多个变量
head=0;  //队首指针，要移除的元素的位置
tail=9;  //队尾指针，要加入的元素的位置
while(head<tail)
{
qq.push(enc_qq[head]);
head++;
enc_qq[tail] = enc_qq[head];
tail++;
head++;
}
// enc_qq.shift();
console.log(typeof qq);
// enc_qq.shift();   shift 移除数组的第一个元素
// console.log(enc_qq.length,enc_qq[0]);
// enc_qq.unshift(0); // 第一位插入元素
// enc_qq.pop()  //移除数组最后一位元素
// enc_qq.push()   /数组的最后面添加一个元素
// console.log(enc_qq);