<!DOCTYPE html>
<html>

<head>
    @@include('../inc/head.tpl')
    <title>联系客服-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="../css/contact.css?@@version">
</head>

<body>

    <header>
        <a href="javascript:window.history.go(-1);" class="goback"></a>
        <h1>联系客服</h1>
        <a href="/rebate/home.html" class="home"></a>
    </header>

    <div class="container">

        <div class="list">
            <ul>
                <li>
                	<a href="tel:075583197333">
                		<span class="icon icon-tel"></span>
                		电话：0755-83197333
                		<span class="arr"></span>
                	</a>
                </li>
                <li>
                    <a href="http://mp.weixin.qq.com/s?__biz=MzI2NDA3ODYxMA==&mid=400495647&idx=1&sn=5a31b4c7e2850dc9a90f6ac92a85656a&scene=18">
                		<span class="icon icon-weixin"></span>
                		微信号：tajian100
                        <span class="arr"></span>
                    </a>
                </li>
                <li>
            		<a href="mailto:_gConfig_.contactEmail">
                		<span class="icon icon-mail"></span>
                		邮箱：_gConfig_.contactEmail
                		<span class="arr"></span>
                	</a>
                </li>
            </ul>
        </div>
        
    </div>

    @@include('../inc/foot.tpl')

</body>

</html>
