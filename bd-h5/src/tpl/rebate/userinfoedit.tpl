<!DOCTYPE html>
<html>

<head>
    @@include('../inc/head.tpl')
    <title>个人信息</title>
    <link rel="stylesheet" href="../css/rebate/userinfoedit.css?@@version">
</head>

<body>

<header>
    <a href="javascript:window.history.go(-1);" class="goback"></a>
    <h1>修改个人信息</h1>
    <a href="/" class="home"></a>
</header>

<div class="container j-userinfoedit-container">

    <div class="avateredit j-avater-edit">
        <a href="javascript:void(0);" class="changeheadimg j-changeimg-btn">
            <div class="avater-wrap">
                <img class="j-user-avater" src="/img/user/ic_avatar_default.png" alt="">
            </div>
            <p>点击修改</p>
        </a>
        <input type="file" name="img" class="j-changeimg-ipt" style="display:none">
    </div>
    <div class="userinfoedit">
        <form class="txtInfo" action="/api/user/updateUser.jsp">
            <div class="content">
                <ul>
                    <li class="j-nickName-wrap">
                        <label>
                            昵称
                        </label>
                        <input type="text" name="nickName" class="j-nickName" placeholder="请输昵称">
                    </li>
                    <li>
                        <label>
                            性别
                        </label>
                        <select name="sex" class="j-sex">
                            <option value="N">保密</option>
                            <option value="M">男</option>
                            <option value="W">女</option>
                        </select>
                    </li>
                    <li>
                        <label>
                            生日
                        </label>
                        <input type="date" name="birthday" class="j-birthday" placeholder="格式如1990-01-01"
                               value="1990-01-01">
                    </li>
                    <li>
                        <label>
                            星座
                        </label>
                        <em class="txt j-constellatory-txt">
                            摩羯座
                        </em>
                        <input type="hidden" class="j-constellatory" name="constellatory" value="">
                    </li>
                    <li>
                        <label>
                            邮箱
                        </label>
                        <input type="text" name="email" class="j-email" placeholder="请输入电子邮箱" value="">
                    </li>
                    <li>
                        <label>
                            手机
                        </label>
                        <input type="text" name="phone" class="j-phone" placeholder="请输入手机号码" value="" disabled>
                    </li>
                </ul>
            </div>
            <div class="desc-wrap hide">
                <input type="text" name="remark" class="j-remark" placeholder="在这里可以留下你在各个平台的信息哦" value="">
            </div>

            <div class="button">
                <input type="hidden" name="op" value="2">
                <button class="submit j-confirm" type="button">提交</button>
            </div>
        </form>
    </div>

</div>
@@include('../inc/foot.tpl')
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
<!-- build:js ../js/rebate/userinfoedit.js -->
<script type="text/javascript" src="../assets/lib/js/zepto.min.js"></script>
<script type="text/javascript" src="../js/common/_base.js"></script>
<script type="text/javascript" src="../js/common/_loading.js"></script>

<script type="text/javascript" src="../js/rebate/_userinfoedit.js"></script>
<!-- endbuild -->

</body>

</html>
