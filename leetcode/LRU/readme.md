LRU 缓存  以最少内存空间换取最高效的存储
Least Recently Used  最近最少使用原则
操作系统

node fs  硬盘， 内存
内存精贵
 硬盘 用不完 

 内存是代码的运行空间 空间是有限的 假设内存空间为2 
 存放变量 假设一个变量占一个空间 2个
 第三个变量来了怎么办？

 <!-- 1  put(1)
 2  put(2)
 3  放不下了  1或2 有一个要抛弃 -->
  原则：最近最少使用
[]  内存   长度(length)只能是2
1  put(1, 1)
2  put(2, 2)
3  get(1)  返回1  1最近使用了， 2变成了最近最少使用
4  put(3, 3) 3进去了， 2就要丢掉
5  get(2)  拿不到
6  put(4, 4) 4 3 把1丢了
7  get(1)  找不到  -1
8  get(3)  3
9  get(4)  4

- 给内存起个名字 cache(缓存)   LRUCache
  get
  set 

- 对象字面量有利于get set方法的实现，
- 最近最少使用， JSON 搞不定
  数组可以， [] [length -1]
  在一头进行操作 头部放最近最多使用 尾部放最近最少
  一半的工作交给数组， 一半的工作交给对象字面量，让他们成为LRUCache的两个属性

  - get set arr + obj 组织在
  LRUCache
    indexOf pop unshift splice
    

