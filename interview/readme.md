    # q1. js全局执行上下文为我们创建了两个东西：全局对象和this关键字（true)
        new 的实现原理:
            1.首先创建一个空对象，构造函数的this指向这个空对象
            2.这个新对象被执行[原型]连接
            3.执行构造函数，将属性或者方法添加到this引用的对象上
            4.如果构造函数中没有返回其他对象，那么返回this,即创建的新对象。否则，返回构造函数返回的对象

    # q2. call,bind,apply
        1. b.call(a) 就相当于把b里面的作用域强行指向到a里面去,第一个参数一定是this作用域要去到的地方，第二三四...个参数是该作用域里用到的值
        2. b.apply(a) 就相当于把b里面的作用域强行指向到a里面去,第一个参数一定是this作用域要去到的地方，第二三四...个参数是该作用域里用到的值,但是需要用数组类型
        3. b.call() || b.apply() 此时this的作用域会指向window(全局)
        4. c = b.bind(a)  c()  因为bind方法返回的是一个修改过的函数，所以该用函数该有的姿态去调用。bind()方法接受的参数是按照形参的顺序进行的

    # q3. 浅拷贝和深拷贝
        1. 数组解构：
        let [x,y] = [1,2]  // x = 1 y = 2
        2.  对象解构：
        let { foo,bar } = {foo:'aaa',bar:'bbb'} //foo = 'aaa'  bar = 'bbb'
        另：(允许给赋值的变量重命名)
        let {foo:baz} = {foo:'abc'}  //baz = 'abc'
        3. 浅拷贝只是第一层属性进行拷贝，当第一层的属性为基本数据类型时，那么新对象和原对象互不影响，但是如果第一层的属性值是 # 复杂数据类型 # 那么新对象和原对象的属性值指向的是同一块内存地址
        4. 深拷贝是将对象及值复制过来，两个对象修改其中任意一个的值，另一个都不会改变

    # q4. 闭包
        1.(什么是闭包)闭包是指有权限访问另一个函数作用域中的变量的函数
        2.(作用) 能够访问函数定义时所在的词法作用域(阻止其被回收)
        3.私有化变量
        4.模拟块级作用域
    # q5. 数组去重
        1. Set 去new一个es6的Set()构造函数 直接去重(Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。)
        2. indexOf()
        3. includes()
        4. map
        5. reduce()
    # q6. 防抖节流函数的原理

    # q7. __proto__ 和 prototype 关联
        __proto__是每一个实例都有的属性，可以访问[prototype]属性。实例的__proto__与其构造函数的prototype指向的是同一个对象
        
        
    对于setTimeout() 里面是普通函数还是箭头函数的问题？
    setTimeout会延迟函数的声明？那么在函数里这个被延迟的函数定义在哪？
    问题1：function test() {
        let a = function() {console.log(this)}
        setTimeout(a,1000)  //window
    }
    test() 执行后，1秒过后，这个匿名函数function(){console.log(this)},是在test() {
        function(){console.log(this)}
    }
    还是在全局里和test同级？
    function(){
        console.log(this)
    }

    问题2：function test1() {
        setTimeout(() => {console.log(this)})  //test1
    }
    能得出打印为test1是因为setTimeout里是箭头函数，那么它的this指向就是箭头函数所处的上下文环境，即定义它的函数test1。那么问题来了？这个箭头函数为什么是test1定义出来的？为什么不是setTimeout?是因为这个箭头函数是setTimeout的参数，也就类似于setTimeout的属性吗？(false)所以要找箭头函数被定义的上下文就是找这个setTimeout的被定义的上下文test1吗？

    # q14 get 和 post 请求在缓存方面的区别
        get请求类似于查找的过程，用户获取数据可以不用每次都与数据库连接，所以可以使用缓存。
        post不同，post一般做的是修改和删除数据的工作，所以必须与数据库交互，所以不能使用缓存。
        因此，get请求更适合于请求缓存

    # q14拓展 url长度限制
        http协议并没有限制，是浏览器或web浏览器做了url长度的限制并且只针对于get请求做的限制
    IE : 2803
    Firefox:65536
    Chrome:8182
    Safari:80000
    Opera:190000

# q15 前端事件流
    在DOM标准的事件模型中，事件流包括下面几个阶段：
    1. 事件捕获阶段
    2. 处于目标阶段
    3. 事件冒泡阶段
    addEventListener第三个参数，为true时捕获，false时冒泡，默认是false(IE只支持事件冒泡)

# q16 图片懒加载和预加载的区别
    预加载：提前加载图片，当用户需要查看图片时，可直接从本地缓存中渲染
    懒加载：作为服务器的前端优化，减少请求或延迟请求(懒加载对服务器有一定的缓解压力作用，预加载则会增加服务器的压力)

# q17 js中的各种位置（如何获取容器的宽高）
    clientHeight:表示可视区域的高度，不包含border和滚动条
    offsetHeight:表示可视区域的高度，包含border和滚动条
    scrollHeight:表示所有区域的高度，包含因为滚动被隐藏的部分
    clientTop:表示边框border的厚度，在未指定的情况下一般为0
    scrollTop:表示滚动后被隐藏的高度
# q18 js拖拽功能的实现
    


