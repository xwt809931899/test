- CSS 命名词汇
feeds 类似微博那种一条一条的信息 划到下面加载更的内容  *-item  content
html的结构及布局
从上到下 从左到右 语义化和功能性 
  1. 套路
  content>h3+p
  2. 盒子
  3. a 作为盒子 在移动端很正常 所以一上来就display:block;
  4. 盒子模型
  文字line-height padding margin
  5. 文字截断
  tmall 商铺信息是由商家填的， 它的高度， 不被限制
  display:-webki-box; 新的盒子模型 像flex（弹性布局）来划分父元素的空间
  overflow:hidden; 超出者隐藏
  -webkit-line-clamp 行数
  -webkit-box-orient:vertical 水平上划分