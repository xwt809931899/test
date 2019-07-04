<!DOCTYPE html>
<html>
<head>
    @@include('inc/head.tpl')
    <title>意见反馈-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="css/feedback.css?@@version">
</head>
<body>
	<header id="header" class="hide">
        <a href="javascript:window.history.go(-1);" class="goback"></a>
		<h1>
			<span id="j-act-title" class="title">意见反馈</span>
		</h1>
		<!-- <a href="/" class="home"></a> -->
	</header>

	<div class="container j_container" style="display:none">
        <form action="" class="form form-wrap" id="j_feedbackForm">
            <h2 class="s-title"><strong>感谢您提出的宝贵意见</strong></h2>
            <div class="form-group">
                <p class="label">联系方式（客服人员将在第一时间与您取得联系）</p>
                <input type="tel" name="phone" maxlength="11" placeholder="请填写您的手机号">
            </div>
            <div class="form-group">
                <p class="label">你遇到的问题场景</p>
                <label class="checkbox-wrap">
                    <input class="j_selectScene" type="checkbox" name="scene" value="1">
                    <span>商品资讯</span>
                </label>
                <label class="checkbox-wrap">
                    <input class="j_selectScene" type="checkbox" name="scene" value="2">
                    <span>活动资讯</span>
                </label>
                <label class="checkbox-wrap">
                    <input class="j_selectScene" type="checkbox" name="scene" value="3">
                    <span>物流信息</span>
                </label>
                <label class="checkbox-wrap">
                    <input class="j_selectScene" type="checkbox" name="scene" value="4">
                    <span>发货资讯</span>
                </label>
                <label class="checkbox-wrap">
                    <input class="j_selectScene" type="checkbox" name="scene" value="5">
                    <span>体验优化</span>
                </label>
                <label class="checkbox-wrap">
                    <input class="j_selectScene" type="checkbox" name="scene" value="6">
                    <span>其它</span>
                </label>
            </div>
            <div class="form-group">
                <p class="label">具体问题描述</p>
                <textarea class="" placeholder="请描述你的问题" name="content" maxlength="200"></textarea>
            </div>
            <div class="form-group">
                <input type="submit" class="j_submit" value="提 交">
            </div>
        </form>

        <form action="" class="form hide" id="j_backForm">
            <div class="form-group">
                <p class="label">钻石服务抢先体验（每日幸运顾客有机会享受）</p>
            </div>
            <div class="form-group">
                <p class="label">联系方式（客服人员将在第一时间与您取得联系）</p>
                <input type="date" name="oppointement" class="oppointement" placeholder="格式如1990-01-01">
            </div>
            <div class="form-group">
                <input type="submit" class="j_submit" disabled value="预约回访">
            </div>
        </form>

        <div class="msg-wrap hide" id="j_msgWrap">
            <img src="/img/app2/bg_feedback_succeed.png" alt="">
            <p></p>
        </div>
	</div>

    @@include('inc/foot.tpl')
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
    <!-- build:js js/feedback.js -->
    <script type="text/javascript" src="assets/lib/js/zepto.min.js"></script>
    <script type="text/javascript" src="js/common/_base.js"></script>
    <script type="text/javascript" src="js/_feedback.js"></script>
	<!-- endbuild -->

</body>
</html>
