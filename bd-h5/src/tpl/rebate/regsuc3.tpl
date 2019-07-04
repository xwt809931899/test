<!DOCTYPE html>
<html>
<head>
	@@include('../inc/head.tpl')
	<title>开通成功-_gConfig_.siteTitile</title>
	<link rel="stylesheet" href="../css/rebate/regsuc3.css?@@version">
</head>
<body>
	
	<!-- <header>
		<a href="/" class="goback"></a>
		<h1>开通成功</h1>
		<a href="/" class="home"></a>
	</header> -->

	<div class="container j-container">
        <div class="redpaper"><img src="../img/act_redpaper/bg_top.png" alt="红包"></div>
        <h1 class="ttl">恭喜您，注册成功</h1>
        <p class="momeny">15.00<span>元</span></p>
        <p class="btn-wrap"><a href="/rebate/home.html" target="_blank" class="btn btn-1 j-act-gohome">立即领取</a></p>
        <!--<p class="des-3">没流量？长按识别关注公众号，随时下载</p>-->
        <!--<p class="qr-wrap"><img src="../img/act_redpaper/pic_erweima@2x.png" alt="_gConfig_.siteNameZH公众号"></p>-->
        <p class="des-4">如果您已经安装_gConfig_.siteNameZH商城应用，请重新登陆即可</p>
        <!-- <div class="tipsMark j-tips-mark" style="display:none">
            <img  class="img-tips hide" src="../img/sharepage/dlmark.png" alt="">
            <img  class="img-qr hide" src="../img/share/logo.png" alt="">
        </div> -->
    </div>

     @@include('../inc/foot.tpl')

    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
<!-- build:js ../js/rebate/regsuc3.js -->
	
	<script type="text/javascript" src="../assets/lib/js/zepto.min.js"></script>
	<script type="text/javascript" src="../js/common/_base.js"></script>
	<script type="text/javascript" src="../js/common/_loading.js"></script>
    
	<script type="text/javascript" src="../js/rebate/_regsuc3.js"></script>
	
<!-- endbuild -->

</body>
</html>