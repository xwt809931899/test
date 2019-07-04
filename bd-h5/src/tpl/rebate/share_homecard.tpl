<!DOCTYPE html>
<html>
<head>
    @@include('../inc/head.tpl')
    <title>分享我的商城</title>
    <link rel="stylesheet" href="../css/rebate/share_homecard.css?@@version">
</head>
<body>
<!--<header>-->
<!--<a href="javascript:window.history.go(-1);" class="goback"></a>-->
<!--</header>-->
<div class="container">
    <div class="logo">
        <img src="../img/rebate/bg_sharemall_logo.png">
        <img class="user-head j-img" src="../img/rebate/ic_avatar_default.png">
    </div>
    <div class="desc j-text">
    </div>
</div>
<div class="foot j-share-control">
    <button class="al-btn j-share-btn" data-sharetype="homecard">分享我的商城名片</button>
</div>
<!--@@include('../inc/foot.tpl')-->
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
<!-- build:js ../js/rebate/share_homecard.js -->
<script type="text/javascript" src="../assets/lib/js/zepto.min.js"></script>
<script type="text/javascript" src="../js/common/_base_sh.js"></script>
<script type="text/javascript" src="../js/rebate/_share_homecard.js"></script>
<!-- endbuild -->

    @@include('../inc/sharePlane.tpl', {"displayMsg":"hide"})
</body>
</html>