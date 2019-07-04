<!DOCTYPE html>
<html>

<head>
    @@include('../inc/head.tpl')
    <title>用户注册-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="../css/rebate/register.css?@@version">
</head>

<body>
    <header>
        <a href="javascript:window.history.go(-1);" class="goback"></a>
        <h1>用户注册</h1>
        <a href="/" class="home"></a>
    </header>
    <div class="banner" style="max-width:640px; margin:0 auto">
        <img src="../img/act_redpaper/top_welcom.png" alt="" style="width:100%; display:block">
    </div>
    <div class="container">
        <div class="register">
            <ul>
                <li>
                    <div class="tips-wrap">
                        <p class="tips-txt j-tips-txt"></p>
                    </div>
                </li>
            </ul>
            <ul class="j-register-container">
                <li>
                    <div class="input-wrap">
                    <!-- <label>账号：</label> -->
                    <div class="spa"><input type="text" name="account" class="j-username" placeholder="手机号码"></div>
                    </div>
                    <div class="tip j-tip"></div>
                </li>

                <li class="code clearfix">
                    <div class="code-wrap-l">
                        <div class="input-wrap">
                            <div class="spa"><input type="text" name="code" class="j-picCode" placeholder="请输入图片验证码"></div>
                        </div>
                        <div class="tip j-tip"></div>
                    </div>
                    <div class="code-wrap-r">
                        <div class="code-wrap">
                            <span class="unlabel" id="j-codePicWrap">
                            </span>
                        </div>
                    </div>
                </li>


                <li class="code clearfix">
                    <div class="code-wrap-l">
                        <div class="input-wrap">
                        <!-- <label>验证码：</label> -->
                        <div class="spa"><input type="text" name="vcode" class="j-code" placeholder="请输入您收到的验证码" maxlength="6"></div>
                        </div>
                        <div class="tip j-tip"></div>
                    </div>
                    <div class="code-wrap-r">
                        <div class="btn-wrap">
                        <span class="unlabel"><button type="button" class="j-act-getcode code-btn">获取验证码</button></span>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="input-wrap">
                    <!-- <label>密码：</label> -->
                        <div class="spa">
                            <input type="password" name="pwd" class="j-password" placeholder="6~16位的密码，英文或数字及组合" maxlength="16">
                        </div>
                        <i class="login-icon icon-toggle-pass j-pass-switch"></i>
                    </div>
                    <div class="tip j-tip"></div>

                </li>
                <br>
                <li>
                    <div class="btn-wrap">
                    <span class="unlabel"><button type="button" class="j-confirm con-btn">提交注册</button></span>
                    </div>
                </li>
                <li class="service">
                    <div class="service-wrap">
                    <label class="service-label" for="iservice1">
                        <i class="check-icon check-icon-chk"></i>
                        <input type="checkbox" class="j-service" id="iservice1" checked> 同意 <a href="../all-service.html#!/rebate-service">《_gConfig_.rebateService》</a></label>
                    </div>
                </li>
            </ul>
            <ul class="j-upgrade-container hide">
                <li>
                    <div class="input-wrap">
                    <!-- <label>账号：</label> -->
                    <div class="spa"><input type="text" name="account" class="j-username" placeholder="手机号码"></div>
                    </div>
                    <div class="tip j-tip"></div>
                </li>
                <li>
                    <div class="input-wrap">
                    <!-- <label>密码：</label> -->
                        <div class="spa">
                            <input type="password" name="pwd" class="j-password" placeholder="6~16位的密码，英文或数字及组合" maxlength="16">
                        </div>
                        <i class="login-icon icon-toggle-pass j-pass-switch"></i>
                    </div>
                    <div class="tip j-tip"></div>
                </li>
                <br>
                <li>
                    <div class="btn-wrap">
                    <span class="unlabel"><button type="button" class="j-confirm con-btn">升级成为_gConfig_.siteNameZH_gConfig_.rebateName</button></span>
                    </div>
                </li>
                <li class="service">
                    <div class="service-wrap">
                    <label class="service-label" for="iservice2">
                        <i class="check-icon check-icon-chk"></i>
                        <input type="checkbox" class="j-service" id="iservice2" checked> 同意 <a href="../all-service.html#!/rebate-service">《_gConfig_.rebateService》</a></label>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    @@include('../inc/foot.tpl')
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
    <!-- build:js ../js/rebate/register.js -->
    <script type="text/javascript" src="../assets/lib/js/zepto.min.js"></script>
    <script type="text/javascript" src="../js/common/_base.js"></script>
    <script type="text/javascript" src="../js/common/_loading.js"></script>
    
    <script type="text/javascript" src="../js/rebate/_register.js"></script>
    <!-- endbuild -->

</body>

</html>
