<!DOCTYPE html>
<html>

<head>
    @@include('../inc/head.tpl')
    <title>佣金规则-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="../css/rebate/commission_rules.css?@@version">
</head>

<body>
<header id="header" style="display: none;">
    <a href="javascript:window.history.go(-1);" class="goback"></a>
    <h1>佣金详细规则</h1>
</header>
<div class="container">
    <div class="calculate-rule rule-wrap">
        <h2 class="title1">
            如何获得佣金
        </h2>
        <div class="content">
            <p>1.您的好友通过您的分享链接成功下单购买，您即可获得对应商品指定佣金奖励。</p>
            <p>2.您的好友通过您的分享链接注册为_gConfig_.siteNameZH海淘用户后，好友在_gConfig_.siteNameZH海淘app，微信公众号等任意渠道成功下单，您都将获得对应商品指定佣金奖励。</p>
        </div>
        <div class="example">
            <div class="title">举个例子：</div>
            <div class="margin-bottom12px">（假设A商品佣金30元，B商品佣金20元）</div>
            <div class="desc">
                您分享A商品的链接到朋友圈，好友小明进入成功购买了A商品，并且成功注册为_gConfig_.siteNameZH海淘用户。
            </div>
            <div class="reword margin-bottom12px">此时，您将获得30元佣金奖励。</div>
            <div class="desc">之后小明自行通过_gConfig_.siteNameZH商城（APP、微信公众号等）又购买了商品B</div>
            <div class="reword">此时，您又将获得20元佣金奖励</div>
        </div>
        <div class="diff">
            <div class="title2">注：</div>
            <div>以下情况会出现实际奖励佣金差异：</div>
            <div  class="margin-bottom12px">1. 使用了优惠券的订单<br>
                将按好友实际的支付金额乘以该商品佣金比例，计算实际奖励佣金
            </div>
            <div  class="margin-bottom12px">
                2. 商品佣金比例浮动调整<br>
                平台商品佣金可能因市场情况、平台奖励策略等因素不定期上下浮动，具体以订单完成支付时间为准
            </div>
        </div>
        <div class="pre-money">
            <div class="title1">关于预到款</div>
            <div  class="margin-bottom12px">您的好友在购买并完成支付后，订单佣金则会出现在您的成交明细中，并处于预到款状态。</div>
            <div  class="margin-bottom12px">当好友订单确认收货或者发货15天后，该笔佣金将自动转为账户余额，即可操作提现。</div>
            <div  class="margin-bottom12px">（预到款期间，该笔订单出现退货退款，则该笔佣金收益自动取消。）</div>
        </div>
        <div class="cash">
            <div class="title1">提现规则</div>
            <div class="margin-bottom12px">目前支持支付宝和国内银行卡两种提现渠道，细则如下：</div>
            <div>1）单笔提现金额须大于或等于99元</div>
            <div>2）为保障服务效率，每天仅可申请1次提现</div>
            <div>3）提现前须先绑定支付宝或银行卡账户信息</div>
            <div>4）申请提现后，预计3-5个工作日到账</div>
        </div>
        <!--<div class="question">-->
            <!--<div class="title1">更多疑问</div>-->
            <!--<div>如您有更多疑问，欢迎随时与我们联系微信服务号：塔尖儿</div>-->
        <!--</div>-->
    </div>
</div>
<script>
    (function () {
        function getCookie(c_name) {
            var c_start;
            if (document.cookie.length > 0) {
                c_start = document.cookie.indexOf(c_name + "=");
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1;
                    c_end = document.cookie.indexOf(";", c_start);
                    if (c_end == -1) c_end = document.cookie.length;
                    return unescape(document.cookie.substring(c_start, c_end));
                }
            }
            return "";
        }

        var at = getCookie(gConfig.appCookieKey);
        if (!at) {
            document.getElementById('header').style.display = 'block';
        }
    })();
</script>
@@include('../inc/foot.tpl')
</body>
</html>
