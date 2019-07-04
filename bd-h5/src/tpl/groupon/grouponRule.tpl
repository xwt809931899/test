<!DOCTYPE html>
<html>
<head>
    @@include('../inc/head.tpl')
    <title>拼团流程-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="../css/groupon/grouponRule.css?@@version">
</head>
<body>
	<div class="container">

		<div class="rule-img-wrap">
			<img src="../img/groupon/group_rule.png" alt="拼团流程">
		</div>

		<div class="rule-detail-group">
			<h3 class="rule-qa-title">
				<em>常见问题</em>
			</h3>
			<ul class="rule-qlist">
				<li class="item">
					<h4 class="question">1.如何参与团购下单？</h4>
					<p class="answer">如果对某款商品感兴趣，可以由您开团发起订单，您也可邀请好友或直接参与好友发起的订单。</p>
				</li>
				<li class="item">
					<h4 class="question">2.为什么我的团购会失败？</h4>
					<p class="answer">（1）超过组团有效期24小时仍未达到参团人数；<br />（2）组团有效期24小时内，商品已提前售罄，但未达到组团人数要求；<br />（3）对于恶意刷单影响广大消费者权益的倒货行为，_gConfig_.siteNameZH商城有权解散并取消该部分订单。</p>
				</li>
				<li class="item">
					<h4 class="question">3.团购失败后如何退款处理？</h4>
					<p class="answer">系统会在1—2天内提交微信/支付宝处理，微信/支付宝审核后2—5个工作日自动原路退款至您的支付账号。</p>
				</li>
			</ul>
		</div>

	</div>

    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
	<!-- build:js ../js/rebate/category.js -->
	<script type="text/javascript" src="../assets/lib/js/zepto.min.js"></script>
	<script type="text/javascript" src="../js/common/_base.js"></script>
	<script type="text/javascript" src="../js/common/_loading.js"></script>
    
	<script type="text/javascript" src="../js/common/_pager.js"></script>
	<script type="text/javascript" src="../js/rebate/_category.js"></script>
	
    <!-- endbuild -->
	
</body>
</html>