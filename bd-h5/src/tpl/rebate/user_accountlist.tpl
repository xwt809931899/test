<!DOCTYPE html>
<html>
<head>
    @@include('../inc/head.tpl')
    <title>提现账户-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="../css/rebate/user_accountlist.css?@@version">
</head>
<body>
	
	<header>
		<a href="javascript:window.history.go(-1);" class="goback"></a>
		<h1>提现账户</h1>
		<a href="user_bindaccount.html" class="home confirm">改绑</a>
	</header>

	<div class="container">

		<div class="banks">
			<ul class="j-list">
			</ul>
		</div>

	</div>
	@@include('../inc/foot.tpl')
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
	<!-- build:js ../js/rebate/user_accountlist.js -->
	<script type="text/javascript" src="../assets/lib/js/zepto.min.js"></script>
	<script type="text/javascript" src="../js/common/_base.js"></script>
	<script type="text/javascript" src="../js/common/_loading.js"></script>
	<script type="text/javascript" src="../js/rebate/_user_accountlist.js"></script>
    <!-- endbuild -->
</body>
</html>