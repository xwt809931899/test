<!DOCTYPE html>
<html>
<head>
    @@include('../inc/head.tpl')
    <title>申请提现-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="../css/rebate/user_withdrawals.css?@@version">
</head>
<body>
	
	<header>
		<a href="javascript:window.history.go(-1);" class="goback"></a>
		<h1>申请提现</h1>
		<div class="home confirm j-act-submit">提交</div>
	</header>

	<div class="container">

		<div class="top">
			当前账户余额：<strong class="j-text-balance">--</strong>
		</div>

		<div class="banks">
			<ul>
				<li>
					<label>申请提现额度：</label>
					<span>
						<input type="text" class="j-input-amount" placeholder="不得低于99元">
					</span>
				</li>
				<li>
					<label>提现账户类型：</label>
					<span>
						<img class="j-img-cardType" src="../img/loading.gif">
					</span>
				</li>
				<li>
					<label>账号：</label>
					<span class="j-text-card"></span>
				</li>
				<li>
					<label>账户姓名：</label>
					<span class="j-text-trueName"></span>
				</li>
				<li>
					<label>手机号：</label>
					<span class="j-text-phone"></span>
				</li>
				<li>
					<label>验证码</label>
					<span>
						<input type="text" class="j-input-code" placeholder="请输入验证码">
					</span>
					<code>
						<button type="button" class="j-act-getcode">获取</button>
					</code>
				</li>
			</ul>
		</div>

		<div class="tips">
			<strong>*</strong>提现须知：
			<p>1. 限制最低提现金额为99元，低于99元暂不受理；</p>
			<p>2. 为保障提款资金快速到账，每天限制申请提款1次；</p>
			<p>3. 如果收款信息不正确造成到账延迟或不到账，责任由用户承担。</p>
		</div>

	</div>
	@@include('../inc/foot.tpl')
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
	<!-- build:js ../js/rebate/user_withdrawals.js -->
	<script type="text/javascript" src="../assets/lib/js/zepto.min.js"></script>
	<script type="text/javascript" src="../js/common/_base.js"></script>
	<script type="text/javascript" src="../js/common/_loading.js"></script>
	<script type="text/javascript" src="../js/rebate/_user_withdrawals.js"></script>
    <!-- endbuild -->
</body>
</html>