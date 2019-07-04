<!DOCTYPE html>
<html>
<head>
    @@include('../inc/head.tpl')
    <title>财富消息-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="../css/rebate/wealthnews.css?@@version">
</head>
<body>

	<header>
		<a href="javascript:window.history.go(-1);" class="goback"></a>
		<h1>
			<div id="j-act-title" class="title">财富消息</div>
		</h1>
		<!-- <a href="/" class="home"></a> -->
	</header>

	<div class="container j_wrap">
        <div class="j_LoadingWrap"></div>
        <ul class="wealth-news j_ActionList">
            <script type="text/html" id="j_wealthNewsItem">

                <li soda-repeat="$value in list" class="news-item">
                    <div class="info">
                        <p class="item-title">{{$value.title}}</p>
                        <p class="item-content">{{$value.content}}</p>
                    </div>
                    <p class="show-detail">
                        <span>{{$value.notifyTime}}</span>
                    </p>
                </li>

            </script>
        </ul>
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
	<!-- build:js ../js/rebate/wealthnews.js -->
	
	<script type="text/javascript" src="../assets/lib/js/zepto.min.js"></script>
    <script type="text/javascript" src="../js/common/_sodarender.js"></script>
    <script type="text/javascript" src="../js/common/_base.js"></script>
	<script type="text/javascript" src="../js/common/_loading.js"></script>
    
	<script type="text/javascript" src="../js/common/_pager.js"></script>
	<script type="text/javascript" src="../js/rebate/_wealthnews.js"></script>
	
    <!-- endbuild -->
</body>
</html>