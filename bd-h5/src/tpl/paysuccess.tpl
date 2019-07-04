<!DOCTYPE html>
<html>
    <head>
        @@include('inc/head.tpl')
        <title>支付成功-_gConfig_.siteTitile</title>
        <link rel="stylesheet" href="css/paysuccess.css?@@version">
    </head>
    <body>

        <header>
            <a href="user.html" class="goback"></a>
            <h1>支付成功</h1>
            <a href="/" class="home"></a>
        </header>

        <div class="container">

            <div class="success-tip j-success-tip hide">
                <div class="success-head">
                    <div class="success display-flex">
                        <img src="img/app2/success.png">
                        <div>
                            <div class="suc-text">支付成功!</div>
                            <div class="tip j-tip"></div>
                        </div>
                    </div>

                    <!--<div class="tip">温馨提示：收到宝贝后确认收货会获得金豆和成长值奖励哦~</div>-->
                </div>

                <div class="share-coupon hide">
                    <p class="desc j-coupon-desc">-</p>
                    <div class="img j-coupon-img">
                        <p>￥ <b>-</b></p>
                    </div>
                    <!--<p class="tips hide">该红包只能分享给好友领取哦</p>-->
                    <br>
                    <br>
                    <div class="btn-wrap">
                        <button class="redirect-button" onclick="location.href='/'">回到首页</button>
                        <button class="redirect-button j-redirect-button" onclick="location.href='order.html#!/list/2'">查看订单</button>
                    </div>
                    <button class="share hide">分享给好友</button>
                </div>

                <!--<a href="/" class="back">返回首页</a>-->
            </div>
            <div id="advert" style="margin-top:30px;">
                <div class="advert" v-show="isShow" v-cloak>
                    <a :href="hrefUrl">
                        <img :src="imageUrl"   alt="">
                    </a>
                    <div class="close" @click="close()">
                        <i class="iconfont closeBtn">
                            &#xe607;
                        </i>
                    </div>
                </div>
            </div>

            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <div class="mask j-mask display-flex hide">
                <div class="money-back-tip">
                    <img class="close-img j-close" src="img/paysuccess/close.png">
                    <div class="text">恭喜您获得支付返现</div>
                    <div class="money-wrap"><span class="money j-pre-money"></span>元</div>
                    <div class="tips">金额已经打入您的预付卡账户中</div>
                    <div class="confirm j-confirm">我知道啦</div>
                </div>
            </div>
            <div class="lottery-mask" id="lottery-mask">
                <div class="result-dialog">
                    <div class="img">
                        <img src="" alt="" class="imglink">
                    </div>
                    <div class="title"></div>
                    <div class="btns">
                        <a href="javascript:;" class="button2" id="cancelLottery">取消</a>
                        <a href="javascript:;" class="button1 lottery-mask-button"  id="lotterybtn">去抽奖</a>
                    </div>
                </div>
            </div>

        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.28/vue.min.js"></script>
        <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
        <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
        <script type="text/javascript" src="assets/paysuccess.js"></script>
        <!-- build:js js/paysuccess.js -->
        <script type="text/javascript" src="assets/lib/js/zepto.min.js"></script>
        <script type="text/javascript" src="js/common/_base.js"></script>
        <script type="text/javascript" src="js/common/_loadlayer.js"></script>
        <script type="text/javascript" src="js/_paysuccess.js"></script>
        <!-- endbuild -->

        @@include('inc/common_sharePlane.tpl')
        @@include('inc/foot.tpl')

    </body>
</html>