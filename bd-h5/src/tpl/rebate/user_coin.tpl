<!DOCTYPE html>
<html>
<head>
    @@include('../inc/head.tpl')
    <title>我的金币-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="../css/rebate/user_coin.css?@@version">
</head>
<body>

<header>
    <a href="javascript:window.history.go(-1);" class="goback"></a>
    <h1>我的金币</h1>
</header>

<div class="container">

    <div class="top">
        <img class="bg" src="../img/app2/bg_gold@2x.png">
        <img src="../img/app2/pic_by@2x.png" class="circle">
        <div class="word">
            <div class="coin j-text-totalCoin">0</div>
            <div class="tip">当前金币</div>
            <div class="coin-rule"><a href="../goldCoinsRule.html">查看金币规则</a></div>
        </div>
    </div>
    <div class="coin-exchange">
        <div class="title"><span class="line">金币兑换</span></div>
        <div class="menu">
            <ul class="display-flex">
                <li onclick="location.href='roulette.html#!/roulette'">
                    <img src="../img/rebate/ic_draw.png">
                    <div class="menu-title">金币抽奖</div>
                </li>
                <li>
                    <img src="../img/rebate/ic_wait.png">
                    <div class="menu-title">敬请期待</div>
                </li>
            </ul>
        </div>
    </div>
    <div class="detail">
        <div class="title  display-flex">
            <div class="line">收支明细</div>
            <div class="count">
                <div>累计赚取：<span class="j-totalGet"></span></div>
                <div>累计使用：<span class="j-totalUsed"></span></div>
            </div>
        </div>
        <div class="list">
            <ul class="j-list"></ul>

            <div class="pager j-pager hide">
                <div class="inner">
                    <a href="#" class="prev j-prev">&lt; 上一页</a>
                    <span><i class="j-current-page">1</i> / <i class="j-total-page">1</i> 页</span>
                    <a href="#" class="next j-next">下一页 &gt;</a>
                </div>
            </div>
        </div>
    </div>

</div>
@@include('../inc/foot.tpl')
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
<!-- build:js ../js/rebate/user_coin.js -->
<script type="text/javascript" src="../assets/lib/js/zepto.min.js"></script>
<script type="text/javascript" src="../js/common/_base.js"></script>
<script type="text/javascript" src="../js/common/_loading.js"></script>
<script type="text/javascript" src="../js/common/_pager.js"></script>
<script type="text/javascript" src="../js/rebate/_user_coin.js"></script>
<!-- endbuild -->
</body>
</html>