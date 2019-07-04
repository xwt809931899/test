<!DOCTYPE html>
<html>
<head>
	@@include('../inc/head.tpl')
	<title>返利商品|文案 发现-_gConfig_.siteTitile</title>
	<link rel="stylesheet" href="../css/rebate/income.css?@@version">
</head>
<body>

	<header>
		<a href="javascript:window.history.go(-1);" class="goback"></a>
		<h1>
			<div id="j-act-title" class="title">收入统计</div>
		</h1>
		<a href="commission_rules.html" class="rule-in">佣金规则</a>
	</header>

	<div class="container j-action-case">

		<div class="no-data j-no-data hide">
			<p>没有数据</p>
		</div>

		<div class="product-group j-product-info hide">
		    <div class="thumbnail"><img src=""></div>
		    <div class="details">
		        <p class="title"></p>
		        <p class="income">商品价格：<span class="price"></span></p>
		    </div>
		</div>		

		<div class="stat-group j-stat-info hide">
			<ul class="clearfix">
				<li>
					<a href="">
						<h3>分享次数</h3>
						<p class="j-share">0</p>
					</a>
				</li>
				<li>
					<a href="">
						<h3>订单总数</h3>
						<p class="j-order">0</p>
					</a>
				</li>
				<li>
					<a href="">
						<h3>收入总数</h3>
						<p class="j-icome">0</p>
					</a>
				</li>
			</ul>
		</div>	

		<div class="income-group">
			<div class="income-nolist j-nolist hide">
				<p>暂无列表</p>
			</div>

			<ul class="list j-action-list"></ul>

			<div class="pager j-pager">
				<div class="inner">
					<a href="#" class="prev j-prev">&lt; 上一页</a>
					<span><i class="j-current-page">1</i> / <i class="j-total-page">1</i> 页</span>
					<a href="#" class="next j-next">下一页 &gt;</a>
				</div>
			</div>
		</div>
		
	</div>
	@@include('../inc/foot.tpl')
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
	<!-- build:js ../js/rebate/income.js -->

	<script type="text/javascript" src="../assets/lib/js/zepto.min.js"></script>
    <script type="text/javascript" src="../js/common/_base.js"></script>
    <script type="text/javascript" src="../js/common/_loading.js"></script>
    <script type="text/javascript" src="../js/common/_pager.js"></script>

	<script type="text/javascript" src="../js/rebate/_income.js"></script>
	
	<!-- endbuild -->
	
</body>
</html>