<!DOCTYPE html>
<html>

    <head>
        @@include('inc/head.tpl')
        <title>联系我们-_gConfig_.siteTitile</title>
        <link rel="stylesheet" href="css/contact.css?@@version">
    </head>

    <body>

        <div class="container">
            <div class="desc">客服服务时间说明：周一至周日 08:30 - 21:00</div>
            <div class="list">
                <ul>
                    <li>
                        <a href="tel:_gConfig_.contactTel" class="display-flex">
                            <span class=" icon tel"></span>
                            <div class="word">
                                <div>联系电话</div>
                                <div>_gConfig_.contactTel</div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a class="display-flex">
                            <span class="icon qq"></span>
                            <div class="word">
                                <div>QQ客服群</div>
                                <div>_gConfig_.contactQQ</div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a class="display-flex">
                            <span class="icon weixin"></span>
                            <div class="word">
                                <div>微信公众号</div>
                                <div>_gConfig_.contactWx</div>
                            </div>
                        </a>
                    </li>
                    <!--<li>-->
                        <!--<a href="mailto:_gConfig_.contactEmail" class="display-flex">-->
                            <!--<span class="icon email"></span>-->
                            <!--<div class="word">-->
                                <!--<div>客服邮箱</div>-->
                                <!--<div>_gConfig_.contactEmail</div>-->
                            <!--</div>-->
                        <!--</a>-->
                    <!--</li>-->
                </ul>
            </div>
        </div>
        <div class="footer">
            <div class="display-flex logo"><img src="../img/contact/ic_contact_footerlogo.png"></div>
        </div>
        @@include('inc/foot.tpl')

    </body>

</html>
