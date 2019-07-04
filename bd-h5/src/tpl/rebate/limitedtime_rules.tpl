<!DOCTYPE html>
<html>

<head>
    @@include('../inc/head.tpl')
    <title>限时高返规则-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="../css/rebate/limitedtime_rules.css?@@version">
</head>

<body>
    <header id="header" style="display: none;">
        <a href="javascript:window.history.go(-1);" class="goback"></a>
        <h1>限时高返规则</h1>
    </header>
    <div class="container">
        <div class="rule-wrap">
            <h2 class="title">
                什么是限时高返
            </h2>
            <div class="content">
                <p class="title2">限时高返是面向_gConfig_.rebateName用户的福利活动。限时高返专区每天都会发布上新高返商品，返利佣金更高更给力。当您在限时高返专区进行分享，好友通过您分享的链接且在指定时限内完成购买支付，您即可获得指定的高额返利佣金。
                    <br/>超过时限外的成交订单，将按该商品原有佣金额度进行返利。</p>
            </div>
        </div>
    </div>
    <script>
        (function(){
            function getCookie(c_name){
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
            if(!at){
                document.getElementById('header').style.display = 'block';
            }
        })();
    </script>
    @@include('../inc/foot.tpl')
</body>
</html>
