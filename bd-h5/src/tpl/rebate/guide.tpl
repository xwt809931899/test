<!DOCTYPE html>
<html>
<head>
    @@include('../inc/head.tpl')
    <title>_gConfig_.rebateName-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="../assets/lib/css/swiper.min.css">
    <link rel="stylesheet" href="../css/rebate/guide.css?@@version">

</head>
<body>

	<header style="display:none">
		<h1>
			<div class="title j-main-name">_gConfig_.siteNameZH商城</div>
		</h1>
	</header>

	<div class="container">

		<div class="download">
			<a onclick="location.href=gConfig.appDownloadUrl">
				<dl>
					<dt>
						<img src="../img/rebate/logo.png">
					</dt>
					<dd>
						<p class="star">★★★★★</p>
						<p class="title">_gConfig_.siteNameZH</p>
						<p class="memo">美好生活供应商</p>
					</dd>
				</dl>
				<div class="icon">下载APP</div>
			</a>
		</div>

		<div class="content">
			<div class="slider swiper-container j-slider-container">
	            <div class="swiper-wrapper">
					<div class="swiper-slide">
		                    <img src="../img/rebate/banner1.png">
		            </div>
		            <div class="swiper-slide">
			                <img src="../img/rebate/banner2.png">
		            </div>
		            <div class="swiper-slide">
		                    <img src="../img/rebate/banner3.png">
		            </div>
		            <div class="swiper-slide">
		                    <img src="../img/rebate/banner4.png">
		            </div>
		        </div>
		    </div>
		</div>

		<div class="oper">
			<a href="/rebate/register.html" class="btn red j-act-register">免费注册领取红包</a>
			<a href="/rebate/login.html" class="btn">_gConfig_.rebateName登录</a>
		</div>

		<div class="links">
			<!--<a href="/about.html">关于_gConfig_.siteNameZH</a> |-->
			<!--<a href="http://mp.weixin.qq.com/s?__biz=MzI2NDA3ODYxMA==&mid=400495647&idx=1&sn=5a31b4c7e2850dc9a90f6ac92a85656a&scene=18&scene=1&srcid=120257SkoT2kQe79siXAi8xG#rd">关注公众号</a> |-->
			<a href="/">进入_gConfig_.siteNameZH商城</a>
		</div>

	</div>
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
	<!-- build:js ../js/rebate/guide.js -->
	<script type="text/javascript" src="../assets/lib/js/zepto.min.js"></script>
	<script type="text/javascript" src="../assets/lib/js/swiper.min.js"></script>

	<script type="text/javascript" src="../js/common/_base.js"></script>

	<script type="text/javascript" src="../js/rebate/_guide.js"></script>
    <!-- endbuild -->

	@@include('../inc/foot.tpl')
</body>
</html>