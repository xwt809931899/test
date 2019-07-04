<!DOCTYPE html>
<html>

<head>
    @@include('../inc/head.tpl')
    <title>设置-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="../css/rebate/setting.css?@@version">
</head>

<body>
<header>
    <a href="user.html" class="goback"></a>
    <h1>设置</h1>
</header>

<div class="container">
    <ul class="setting-list mt20">
        <!--<li>-->
        <!--<a href="/login.html#!/modify-password">-->
        <!--修改密码-->
        <!--</a>-->
        <!--</li>-->
        <!--<li>-->
            <!--<a href="/about.html">关于_gConfig_.siteNameEN</a>-->
        <!--</li>-->
        <li>
            <a href="../../contact.html">联系我们</a>
        </li>
        <li>
            <a href="/help.html">使用帮助</a>
        </li>
    </ul>

    <ul class="setting-list mt10 logout-wrap">
        <li>
            <a href="#" class="logout j-act-logout">退出登录</a>
        </li>
    </ul>
</div>

@@include('../inc/foot.tpl')
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
<!-- build:js ../js/rebate/setting.js -->
<script type="text/javascript" src="../assets/lib/js/zepto.min.js"></script>
<script type="text/javascript" src="../js/common/_base.js"></script>

<script type="text/javascript" src="../js/rebate/_setting.js"></script>
<!-- endbuild -->
</body>

</html>
