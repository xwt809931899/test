<!DOCTYPE html>
<html>
<head>
    @@include('../inc/head.tpl')
    <title>我的团购-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="../css/groupon/grouponlist.css?@@version">
</head>
<body>

<!--<header>
    <a href="javascript:window.history.go(-1);" class="goback"></a>
    <h1>我的团购</h1>
    <a href="/" class="home"></a>
</header>-->

<div class="container">
    <ul class="tab j-tab display-flex">
        <li class="active"><a href="grouponlist.html">全部</a></li>
        <li><a href="grouponlist.html?lt=1">组团中</a></li>
        <li><a href="grouponlist.html?lt=2" class="group-success">团购成功</a></li>
        <li><a href="grouponlist.html?lt=3" class="group-failed">团组失败</a></li>
    </ul>
    <div class="list j-list"></div>
    <div class="empty j-empty hide">您还没有任何相关的信息哦</div>

    <div class="pager j-pager">
        <div class="inner">
            <a href="#" class="prev j-prev">&lt; 上一页</a>
            <span><i class="j-current-page">1</i> / <i class="j-total-page">1</i> 页</span>
            <a href="#" class="next j-next">下一页 &gt;</a>
        </div>
    </div>

</div>

@@include('../inc/foot.tpl')
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
<!-- build:js ../js/groupon/grouponlist.js -->
<script type="text/javascript" src="../assets/lib/js/zepto.min.js"></script>
<script type="text/javascript" src="../js/common/_base.js"></script>
<script type="text/javascript" src="../js/common/_loading.js"></script>

<script type="text/javascript" src="../js/common/_pager.js"></script>
<script type="text/javascript" src="../js/groupon/_grouponlist.js"></script>
<!-- endbuild -->
</body>
</html>