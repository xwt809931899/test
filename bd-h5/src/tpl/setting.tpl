<!DOCTYPE html>
<html>

<head>
    @@include('inc/head.tpl')
    <title>设置-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="css/setting.css?@@version">
</head>

<body>

<header>
    <a href="javascript:window.history.go(-1);" class="goback"></a>
    <h1>设置</h1>
</header>

<div class="container">

    <div class="setting-list">
        <a class="j-retrievepassword" href="user-card.html#!/prepaid-set-pwd" pprd="21016.14.2">
            修改支付密码
            <span class="arr"></span>
        </a>
        <a class="j-retrievepassword" href="login.html#!/modify-password" pprd="21016.14.1">
             修改登录密码
            <span class="arr"></span>
        </a>
        <br/>
        <a href="service.html">
            服务条款
            <span class="arr"></span>
        </a>
        <!--<a href="contact.html">-->
            <!--联系我们-->
            <!--<span class="arr"></span>-->
        <!--</a>-->
        <!--<a href="about.html">-->
            <!--关于-->
            <!--<span class="arr"></span>-->
        <!--</a>-->

    </div>

    <br/>
    <br/>

    <!-- <div class="lg-btn-wrap">
        <a href="#" class="clearCache j-act-clearCache">清除缓存</a>
    </div> -->

    <div class="lg-btn-wrap">

        <a href="#" class="logout j-act-logout">退出登录</a>
    </div>


</div>

@@include('inc/foot.tpl')
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
<!-- build:js js/setting.js -->
<script type="text/javascript" src="assets/lib/js/zepto.min.js"></script>
<script type="text/javascript" src="js/common/_base.js"></script>

<script type="text/javascript" src="js/_setting.js"></script>
<!-- endbuild -->
</body>

</html>
