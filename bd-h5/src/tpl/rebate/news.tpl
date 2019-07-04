<!DOCTYPE html>
<html>
<head>
    @@include('../inc/head.tpl')
    <title>返利消息-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="../css/rebate/news.css?@@version">
</head>
<body>
<header>
    <a href="javascript:window.history.go(-1);" class="goback"></a>
    <h1>
        <div id="j-act-title" class="title">消息</div>
    </h1>
    <!-- <a href="/" class="home"></a> -->
</header>

<div class="container j_container">
    <div class="option-group">
        <ul id="j_newsList">
            <script type="text/html" id="j_newsTpl">
                <li soda-repeat="$value in newsList" class="news-item">
                    <a class="opt-icon{{($value.notifyType ==1 ) ? ' system-msg' : ($value.notifyType ==3)? ' wealth-msg' : ' order-msg'}} {{($value.notifyNum >= 1 ) ? ' has-msg' : ''}}"
                       soda-href="{{$value.notifyType ===1 ? '/rebate/systemnews.html' : ($value.notifyType ==3)? '/rebate/wealthnews.html' : '/rebate/ordernews.html'}}">
                        <p class="news-title">{{$value.title || '标题'}}<span class="news-time">{{$value.notifyTime || ''}}</span>
                        </p>
                        <p class="news-content">{{$value.content || ''}}</p>
                    </a>
                </li>
            </script>
        </ul>
    </div>

</div>

@@include('../inc/foot.tpl')
@@include('../inc/rebateBar.tpl', {"curTab":"news"})
<script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
<!-- build:js ../js/rebate/news.js -->
<script type="text/javascript" src="../assets/lib/js/zepto.min.js"></script>
<script type="text/javascript" src="../js/common/_sodarender.js"></script>
<script type="text/javascript" src="../js/common/_base.js"></script>
<script type="text/javascript" src="../js/common/_rebateBottomBar.js"></script>
<script type="text/javascript" src="../js/common/_loading.js"></script>
<script type="text/javascript" src="../js/rebate/_news.js"></script>
<!-- endbuild -->

</body>
</html>