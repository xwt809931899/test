浮动
使元素脱离文档流，造成包含元素的盒子的高度缺失（没有高度）从而影响后面的布局


清楚浮动的几种方法
1. 在父元素底部加上一行代码  <div style="clear:left"></div>
2. 在父元素的CSS中加上 div.content{
    float:left;
}
3. 在父元素的CSS样式上添加一个伪元素after，如果伪元素有内容，那么就用 height0; visibility: hidden; .clearFix:after{ content:"";
            clear:both;
            display: block;
            height: 0;
            visibility: hidden;}
4. 利用BFC简称（块级格式化上下文）的效果来弥补父容器的高度塌陷
div.content{
    overflow: hidden;auto;scroll;
}
5. 尼古拉斯大师 方法 把父容器的display设置为tabel，可以直接创建一个匿名表格单元，直接触发BFC效果
