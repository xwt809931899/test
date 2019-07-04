<!DOCTYPE html>
<html>
<head>
	@@include('inc/head.tpl')
	<title>查看物流-_gConfig_.siteTitile</title>
	<link rel="stylesheet" href="css/postflow.css?@@version">
</head>
<body>
	
	<header>
		<a href="javascript:window.history.go(-1);" class="goback"></a>
		<h1>查看物流</h1>
        <a href="/" class="home"></a>
	</header>

	<div class="container">

		<div class="receiver">
			<ul>
				<li>
					<label>
						收货人：<span class="j-text-rname">--</span>
					</label>
					<div>
						<span class="j-text-rphone">--</span>
					</div>
				</li>
				<li class="address">
					收货地址：<span class="j-text-address">--</span>
				</li>
			</ul>
		</div>

		<div class="product">
			<div class="item">
				<div class="content j-product-list">--</div>
				
				<div class="total">
					<span class="num">共<strong class="j-text-realnum">--</strong>件商品</span>
					<span class="price">合计: <strong class="j-text-realvalue">--</strong></span>
				</div>
			</div>
		</div>
		
		<div class="info">
			<p>订单编号：<strong class="j-text-orderid">--</strong></p>
			<p>物流方式：<span class="j-text-posttype">--</span></p>
			<p>运单编号：<span class="j-text-postflowno">--</span></p>
		</div>

		<div class="postflow">
			<h3>物流跟踪</h3>
			<ul class="j-postflow-list"></ul>
		</div>

	</div>

	@@include('inc/foot.tpl')
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
	<!-- build:js js/postflow.js -->
    <script type="text/javascript" src="assets/lib/js/zepto.min.js"></script>
    <script type="text/javascript" src="js/common/_base.js"></script>
    <script type="text/javascript" src="js/common/_loading.js"></script>
    
    <script type="text/javascript" src="js/_postflow.js"></script>
    <!-- endbuild -->
</body>
</html>