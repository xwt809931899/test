## why
以前async mode 现在 concurrent mode,
目的：让 react 整体渲染有一个优先级的排比
1. js 单线程
2. 浏览器 多线程
   1. UI 渲染线程
   2. js 解析
   3. http
3. js 线程和ui是互斥的，js可以操作dom
4. 卡顿的产生，js 执行占据了很大的空间，导致ui得不到响应