<!DOCTYPE html>
<html>
<head>
    @@include('../inc/head.tpl')
    <title>绑定提现账户-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="../css/rebate/user_bindaccount.css?@@version">
</head>
<body>
	
	<header>
		<a href="javascript:window.history.go(-1);" class="goback"></a>
		<h1>绑定提现账户</h1>
	</header>

	<div class="container">

		<div class="banks">
			<ul>
				<li>
					<a href="user_bindbank.html">
						<span class="icon">
							<img src="../img/app2/ic_bank_yl.png">
						</span>
						绑定银行卡
					</a>
				</li>
				<li>
					<a href="user_bindzfb.html">
						<span class="icon">
							<img src="../img/app2/ic_bank_zfb.png">
						</span>
						绑定支付宝
					</a>
				</li>
			</ul>
		</div>

	</div>
	@@include('../inc/foot.tpl')
</body>
</html>