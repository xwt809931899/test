<!DOCTYPE html>
<html>
<head>
    @@include('../inc/head.tpl')
    <title>发表文案-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="../css/rebate/share_found.css?@@version">
</head>
<body>
<div id="app"></div>
@@include('../inc/foot.tpl')
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
<!-- build:js ../js/rebate/share_found.js -->
<script type="text/javascript" src="../assets/lib/js/zepto.min.js"></script>
<script type="text/javascript" src="../js/common/_base_sh.js"></script>
<script type="text/javascript" src="../js/rebate/_share_found.build.js"></script>
<!-- endbuild -->
@@include('../inc/sharePlane.tpl')
</body>
</html>