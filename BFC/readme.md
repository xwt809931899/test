#BFC的名字
Block ForBatting Context(块级格式上下文)

#BFC的渲染 规则
1. BFC在页面上是一个隔绝的容器，最显著的效果就是建立一个隔绝的空间，外面的元素不会影响BFC里面的元素，反之，里面的元素也不会影响外面的元素。
2. BFC的区域不会与浮动元素的box重叠
3. 垂直方向的外边距会发生边距折叠（包括父子元素，兄弟元素）水平方向的外边距不可能存在边距折叠。

#BFC的创建条件
1. overflow的值不为visible
2. float的值不为none
3. 行内块inline-block
4. 表格单元display：table-cell
5. 绝对定位的属性（absolute,fixed）