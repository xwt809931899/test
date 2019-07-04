<!DOCTYPE html>
<html>
<head>
    @@include('../inc/head.tpl')
    <title>收益明细-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="../css/rebate/systemnew.css?@@version">
</head>
<body>

	<header>
		<a href="javascript:window.history.go(-1);" class="goback"></a>
		<h1>
			<div id="j-act-title" class="title">公告详情</div>
		</h1>
		<!-- <a href="/" class="home"></a> -->
	</header>

	<div class="container">	

		<div class="rebate-group j-rebate-group">

			<h3 class="title"></h3>
			<p class="time"></p>
			<p class="content"></p>

		</div>

	</div>

	@@include('../inc/foot.tpl')

    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
	<!-- build:js ../js/rebate/systemnew.js -->
	
	<script type="text/javascript" src="../assets/lib/js/zepto.min.js"></script>
	<script type="text/javascript" src="../js/common/_base.js"></script>
	<script type="text/javascript" src="../js/common/_loading.js"></script>
    
	<script type="text/javascript" src="../js/common/_pager.js"></script>
	<script type="text/javascript" src="../js/rebate/_systemnew.js"></script>
	
    <!-- endbuild -->
</body>
</html>