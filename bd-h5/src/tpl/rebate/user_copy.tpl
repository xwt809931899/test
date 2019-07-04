<!DOCTYPE html>
<html>
<head>
    @@include('../inc/head.tpl')
    <meta name="format-detection" content="telephone=no">
    <title>个人中心-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="../css/rebate/user.css?@@version">
</head>
<body>

<div class="container">
    <div class="top">
        <img class="bg" src="../img/rebate/user/bg_tk_center.png">
        <div class="j-login-show login-show">
            <div class="table">
                <div class="face table-cell">
                    <a href="/userinfoedit.html" pprd="21005.1.1"><img class="j-img-face"
                                                                       src="/img/rebate/ic_avatar_default.png"></a>
                </div>
                <div class="table-cell account j-text-account"></div>
                <div class="table-cell my-share-list">
                    <a href="/rebate/account.html#!/share-list" pprd="21005.2.1">我的清单>></a>
                </div>
            </div>
        </div>
        <a href="login.html" class="login-btn j-login-btn hide">登录/注册</a>
        <a href="setting.html" class="setting-btn"><i>设置</i></a>
    </div>

    <div class="oper">
        <ul>
            <li>
                <a href="user_income.html" pprd="21005.3.1">
                    <label>账户余额</label>
                    <span class="color-prm j-text-amount"></span>
                </a>
            </li>
            <li>
                <a href="javascript:;" class="j-act-withdrawals" pprd="21005.4.1">
                    <label>提现账户</label>
                    <span class="bank j-text-bank"></span>
                </a>
            </li>
            <li>
                <a href="user_coin.html" pprd="21005.5.1">
                    <label>我的金币</label>
                    <span class="color-prm j-text-coin"></span>
                </a>
            </li>
        </ul>
        <ul>
            <li>
                <a href="share_found.html#!/draft" pprd="21005.6.1">我的草稿箱</a>
            </li>
            <!--<li>-->
                <!--<a href="/rebate/account.html#!/coupon-list/1">转赠优惠券</a>-->
            <!--</li>-->
            <li>
                <a href="invite.html" pprd="21005.8.1">
                    <label>邀请好友</label>
                </a>
            </li>
        </ul>
    </div>
</div>
@@include('../inc/foot.tpl')
@@include('../inc/rebateBar.tpl', {"curTab":"me"})
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
<!-- build:js ../js/rebate/user.js -->
<script type="text/javascript" src="../assets/lib/js/zepto.min.js"></script>
<script type="text/javascript" src="../js/common/_base.js"></script>
<script type="text/javascript" src="../js/common/_loading.js"></script>
<script type="text/javascript" src="../js/common/_rebateBottomBar.js"></script>
<script type="text/javascript" src="../js/rebate/_user.js"></script>
<!-- endbuild -->
</body>
</html>