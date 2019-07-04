<!DOCTYPE html>
<html>
<head>
    @@include('inc/head.tpl')
    <title>消息中心-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="css/news.css?@@version">
</head>
<body>

<header>
    <a href="javascript:window.history.go(-1);" class="goback"></a>
    <h1>
        <span id="j-act-title" class="title">消息中心</span>
    </h1>
    <!-- <a href="/" class="home"></a> -->
</header>

<div class="container j_container">
    <div class="option-group">
        <ul id="j_newsList">
            <script type="text/html" id="j_newsTpl">
                <li soda-repeat="$value in newsList" class="news-item j-news-item" _title="{{$value.title}}">
                    <a class="opt-icon {{($value.notifyType =='logistic' ) ? ' logistic-msg' : ($value.notifyType =='feedback')? ' feedback-msg' : ' coupon-msg'}}"
                       soda-href="{{($value.notifyType ==='logistic')? '/logisticnews.html' : ($value.notifyType === 'feedback')? 'http://bdego.udesk.cn/im_client/?web_plugin_id=46215; ' : '/couponnews.html'}}">
                        <p class="news-title">{{$value.title || '标题'}}<span class="badge" soda-if="$value.notifyType =='feedback' && udesk.unreadCount > 0"></span><span class="news-time">{{$value.notifyTime || ''}}</span></p>
                        <p class="news-content">{{$value.content}}</p>
                    </a>
                </li>
            </script>
        </ul>
    </div>
</div>

@@include('inc/foot.tpl')
<div>
    <img class="code hide" src="/img/user/code.jpg">
</div>
<div class="footer">
    <div class="display-flex logo">_gConfig_.siteNameZH</div>
    <div class="en-name">BD-EGO.COM</div>
</div>
<script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
<!-- build:js js/news.js -->
<script type="text/javascript" src="assets/lib/js/zepto.min.js"></script>
<script type="text/javascript" src="js/common/_sodarender.js"></script>
<script type="text/javascript" src="js/common/_base.js"></script>
<script type="text/javascript" src="js/common/_loading.js"></script>
<script type="text/javascript" src="js/_news.js"></script>
<!-- endbuild -->
<script src="js/common/udesk.tool.js"></script>
</body>
</html>