<!DOCTYPE html>
<html>
<head>
    @@include('../inc/head.tpl')
    <title>主页推荐-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="../css/rebate/share_homepage.css?@@version">
</head>
<body>
	<div class="container">
		<div class="share-bg">
			<p class="img">
				<img class="j-img" src="/img/app2/userDefaultAvater.png" alt="Brafsfas"/>
			</p>
			<p class="name j-name">神秘_gConfig_.rebateName</p>
			<p class="text">向您推荐_gConfig_.siteNameZH海淘商城</p>
		</div>
		<p class="btn">
			<a href="javascript:;" class="j-homelink">马上去逛逛</a>
		</p>
		<div class="my-footer">
			<p class="info">
				<img src="../img/rebate/bg_eshop_logo.png" alt=""/>
			</p>
			<!--<p class="tip">-->
				<!--<i class="icon-tip"></i>-->
			<!--</p>-->
		</div>
	</div>
	@@include('../inc/foot.tpl')
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
	<!-- build:js ../js/rebate/share_homepage.js -->
	<script type="text/javascript" src="../assets/lib/js/zepto.min.js"></script>
	<script type="text/javascript" src="../js/common/_base.js"></script>
	<script type="text/javascript" src="../js/rebate/_share_homepage.js"></script>
    <!-- endbuild -->
</body>
</html>