<!DOCTYPE html>
<html>
<head>
    @@include('../inc/head.tpl')
    <title>绑定银行卡-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="../css/rebate/user_bindbank.css?@@version">
</head>
<body>

<header>
    <a href="javascript:window.history.go(-1);" class="goback"></a>
    <h1>绑定银行卡</h1>
    <a href="#" class="home confirm j-act-submit">绑定</a>
</header>

<div class="container">

    <div class="banks">
        <ul>
            <li>
                <label>银行卡号</label>
                <span>
						<input type="text" class="j-input-card" placeholder="请输入银行卡号">
					</span>
            </li>
            <li>
                <label>持卡人</label>
                <span>
						<input type="text" class="j-input-trueName" placeholder="请输入持卡人姓名">
					</span>
            </li>
            <li>
                <label>发卡银行</label>
                <span>
						<select class="j-select-banklist">
							<option value="">请选择银行</option>
						</select>
					</span>
            </li>
            <li>
                <label>手机号</label>
                <span>
						<input type="text" class="j-input-phone" placeholder="请输入手机号" disabled
                               style="background-color: #ffffff">
					</span>
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
			<span class="icon">
				<img src="../img/app2/ic_jgxx.png">
			</span>
        请绑定持卡人的银行卡，以免打款失败！
    </div>

</div>
@@include('../inc/foot.tpl')
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
<!-- build:js ../js/rebate/user_bindbank.js -->
<script type="text/javascript" src="../assets/lib/js/zepto.min.js"></script>
<script type="text/javascript" src="../js/common/_base.js"></script>
<script type="text/javascript" src="../js/common/_loading.js"></script>
<script type="text/javascript" src="../js/rebate/_user_bindbank.js"></script>
<!-- endbuild -->
</body>
</html>