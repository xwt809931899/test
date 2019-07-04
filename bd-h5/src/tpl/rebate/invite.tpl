<!DOCTYPE html>
<html>

<head>
    @@include('../inc/head.tpl')
    <title>邀请好友-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="../css/rebate/invite.css?@@version">
</head>

<body>
    <div class="loading-warp"><div class="j-ui-loading"><img src="../img/loading.gif" align="absmiddle"> 数据加载中，请稍等...</div></div>
<div class="j-invite-container invite-container new-invite-container">
    <div class="container invite-container-rule ">
        <div class="noMicroShow">
            <img src="../img/rebate/invitetop.jpg">

            <div class="rule">

                <p class="content j-rule-content"><b>奖励规则：</b></p>
                <br><p class="content">注：邀请好友需为首次注册_gConfig_.siteNameZH的用户才可获赠5元首单奖励</p>
            </div>
        </div>
        <div class="isMicroShow">
            <div class="display-flex text-center inviteData">
                <div>
                    <p>已邀请人数</p>
                    <b id="inviteNum"></b>
                </div>
                <div>
                    <p>累计赚取奖励</p>
                    <b id="reward"></b>
                </div>
                <div>
                    <p>今日赚取奖励</p>
                    <b id="today_reward"></b>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="invite-wrap">
            <div class="oper j-share-control">
                <a href="javascript:;" class="j-share-btn share-btn hide">
                    邀请好友
                </a>

                <a href="/rebate/invite_list.html?is_webi=1" class="share-btn hide btn-grey isMicroShow">
                    查看好友明细
                </a>

                <div class="rule isMicroShow">
                    <p class="display-flex title">
                        奖励规则
                    </p>

                    <p class="content j-desc"></p>
                    <br><p class="content">注：邀请好友需为首次注册_gConfig_.siteNameZH的用户才可获赠15元首单奖励</p>
                </div>

            </div>
            <div class="j-invite-list invite-list noMicroShow"></div>

        </div>
        <div class="noMicroShow">
            <div class="qr-vessel">
            </div>
            <p class="qr-vessel-tips">当面扫一扫，邀请好友成为_gConfig_.rebateName</p>
        </div>

        <img class="invite2_02 isMicroShow" src="../img/rebate/invite2_02.jpg">

    </div>
</div>

@@include('../inc/foot.tpl')
<script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="_gConfig_.PROJECT_USER/api/users/partake"></script>

<!-- build:js ../js/rebate/invite.js -->
<script type="text/javascript" src="../assets/lib/js/zepto.min.js"></script>
<script type="text/javascript" src="../js/common/_base_sh.js"></script>
<script type="text/javascript" src="../js/common/_qrcode.js"></script>
<script type="text/javascript" src="../js/rebate/_invite.js"></script>
<!-- endbuild -->

@@include('../inc/common_sharePlane.tpl', {"displayMsg":"hide"})
</body>

</html>
