<!DOCTYPE html>
<html>

<head>
    @@include('inc/head.tpl')
    <title>个人信息</title>
    <link rel="stylesheet" href="css/userinfoedit.css?@@version">
</head>

<body>

<header>
    <a href="javascript:window.history.go(-1);" class="goback"></a>
    <h1>修改个人信息</h1>
    <a href="/" class="home"></a>
</header>

<div class="container j-userinfoedit-container">

    <div class="avateredit j-avater-edit display-flex">
        <div class="left-text">头像</div>
        <a href="javascript:void(0);" class="changeheadimg j-changeimg-btn">
            <div class="avater-wrap">
                <img class="j-user-avater" src="/img/user/ic_avatar_default.png" alt="">
            </div>
            <!--<p>点击修改</p>-->
        </a>
        <input type="file" name="img" class="j-changeimg-ipt" style="display:none">
    </div>
    <div class="userinfoedit">
        <form class="txtInfo">
            <div class="content">
                <ul>
                    <li class="j-nickName-wrap display-flex">
                        <div>
                            昵称
                        </div>
                        <input type="text" name="nickName" class="j-nickName" placeholder="请输昵称">
                    </li>
                    <li class="display-flex">
                        <div class="sex-text">
                            性别
                        </div>
                        <select name="sex" class="j-sex">
                            <option value="N">保密</option>
                            <option value="M">男</option>
                            <option value="W">女</option>
                        </select>
                    </li>
                    <li class="display-flex">
                        <div class="bir-text">
                            生日
                        </div>
                        <input type="date" name="birthday" class="j-birthday" placeholder="格式如1990-01-01"
                               value="1990-01-01" max="2016-12-31">
                    </li>
                    <li class="display-flex">
                        <div>
                            星座
                        </div>
                        <!--<em class="txt j-constellatory-txt">-->
                        <!--摩羯座-->
                        <!--</em>-->
                        <input type="text" class="j-constellatory" name="constellatory"  placeholder="请输入星座" value="摩羯座" />
                    </li>
                    <li class="display-flex">
                        <div>
                            邮箱
                        </div>
                        <input type="text" name="email" class="j-email" placeholder="请输入电子邮箱" value="">
                    </li>
                    <li class="display-flex">
                        <div>
                            手机
                        </div>
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

@@include('inc/foot.tpl')
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
<!-- build:js js/userinfoedit.js -->
<script type="text/javascript" src="assets/lib/js/zepto.min.js"></script>
<script type="text/javascript" src="js/common/_base.js"></script>
<script type="text/javascript" src="js/common/_loading.js"></script>

<script type="text/javascript" src="js/_userinfoedit.js"></script>
<!-- endbuild -->

</body>

</html>
