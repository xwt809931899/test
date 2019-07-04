<!DOCTYPE html>
<html>
<head>
    @@include('../inc/head.tpl')
    <title>已提现明细-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="../css/rebate/withdrawals_record.css?@@version">
</head>
<body>
	<header>
		<h1>已提现明细</h1>
        <a href="javascript:history.back()" class="goback"></a>
	</header>
	<div class="container">
		<ul	class="list j-withdrawals-list"></ul>
        <div class="pager j-pager">
            <div class="inner">
                <a href="javascript:;" class="prev j-prev">&lt; 上一页</a>
                <span><i class="j-current-page">1</i> / <i class="j-total-page">1</i> 页</span>
                <a href="javascript:;" class="next j-next">下一页 &gt;</a>
            </div>
        </div>
	</div>
	@@include('../inc/foot.tpl')
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
	<!-- build:js ../js/rebate/withdrawals_record.js -->
	<script type="text/javascript" src="../assets/lib/js/zepto.min.js"></script>
	<script type="text/javascript" src="../js/common/_base.js"></script>
    <script type="text/javascript" src="../js/common/_pager.js"></script>
    <script type="text/javascript" src="../js/common/_loading.js"></script>

	<script type="text/javascript" src="../js/rebate/_withdrawals_record.js"></script>
    <!-- endbuild -->
</body>
</html>