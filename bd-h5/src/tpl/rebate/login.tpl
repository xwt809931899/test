<!DOCTYPE html>
<html>
<head>
    @@include('../inc/head.tpl')
    <title>登录-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="../css/rebate/login.css?@@version">
</head>
<body>

<header>
    <a href="javascript:window.history.go(-1);" class="goback"></a>
    <h1>_gConfig_.rebateName登录</h1>
    <a href="/" class="home"></a>
</header>

<div class="container">

    <div class="logo-wrap">
        <div class="logo-img">
            <img src="../img/rebate/pic_logo.png">
        </div>
    </div>

    <div class="login j-login-container">
        <form>
            <ul>
                <li>
                    <div class="input-wrap">
                        <input type="tel" name="phone" class="j-username" placeholder="请输入手机号码">
                    </div>
                </li>
                <li>
                    <div class="input-wrap">
                        <input type="password" name="pwd" class="j-password" placeholder="请输入密码" maxlength="16">
                        <i class="login-icon icon-toggle-pass j-pass-switch"></i>
                    </div>
                </li>
            </ul>
            <div class="button">
                <button class="submit j-confirm" type="button">登录</button>
            </div>
            <ul>
                <li class="oper">
                    <a href="/rebate/register.html" class="j-act-from">立即注册</a>
                    <!--<a href="/login.html#!/forget-password">忘记密码</a>-->
                </li>
            </ul>
        </form>
    </div>

</div>

<div class="ruleMark j-rule-mark" style="display:none">
    <div class="rule-wrap">
        <div class="content-wrap">
            <h1 class="title">一键变身！开启赚钱模式！</h1>
            <p class="content">分享商品即可获得高达10%返利</p>
            <p class="note"><a class="home" href="/index.html">打回原形</a><a class="register" href="/rebate/register.html">立即变身</a>
            </p>
        </div>
    </div>
</div>

@@include('../inc/foot.tpl')
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
<!-- build:js ../js/rebate/login.js -->
<script type="text/javascript" src="../assets/lib/js/zepto.min.js"></script>
<script type="text/javascript" src="../js/common/_base.js"></script>
<script type="text/javascript" src="../js/common/_loading.js"></script>

<script type="text/javascript" src="../js/rebate/_login.js"></script>
<!-- endbuild -->

</body>
</html>