<!DOCTYPE html>
<html>

<head>
    @@include('../inc/head.tpl')
    <title>邀请好友-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="../css/rebate/invit_list.css?@@version">
</head>

<body>
    <header id="header" class="hide">
        <a href="javascript:window.history.go(-1);" class="goback"></a>
        <h1>好友记录</h1>
    </header>
    <div class="container js-container">
        <div class="invite-list-wrap">
            <table class="invite-list-table">
                <thead>
                <tr>
                    <th>好友</th>
                    <th>注册时间</th>
                    <th class="isMicroShow">我的奖励</th>
                </tr>
                </thead>
                <tbody class="j-invite-list"></tbody>
            </table>
        </div>
        <div class="pager j-pager">
            <div class="inner">
                <a href="javascript:;" class="prev j-prev">&lt; 上一页</a>
                <span><i class="j-current-page">1</i> / <i class="j-total-page">1</i> 页</span>
                <a href="javascript:;" class="next j-next">下一页 &gt;</a>
            </div>
        </div>
    </div>
    @@include('../inc/foot.tpl')
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
    <!-- build:js ../js/rebate/invit_list.js -->
    <script type="text/javascript" src="../assets/lib/js/zepto.min.js"></script>
    <script type="text/javascript" src="../js/common/_base.js"></script>

    <script type="text/javascript" src="../js/common/_loading.js"></script>
    <script type="text/javascript" src="../js/common/_pager.js"></script>
    <script type="text/javascript" src="../js/rebate/_invite_list.js"></script>
    <!-- endbuild -->
</body>

</html>
