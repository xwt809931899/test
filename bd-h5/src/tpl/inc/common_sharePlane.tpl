<!-- 分享面板控件 -->
<style type="text/css">
    .-mob-share-ui.-mob-share-ui-theme-slide-bottom ul.-mob-share-list {
        font-size: 0;
        padding: 10px 10px 0;
    }

    .-mob-share-ui ul.-mob-share-list li p {
        font-size: 14px;
    }

    .-mob-share-ui ul.-mob-share-list li {
        width: 25%;
        margin: 0 0 35px;
        background-size: 60px auto;
    }

    .-mob-share-weibo {
        background-image: url('../img/rebate/ic_weibo.png') !important;
    }

    .-mob-share-qq {
        background-image: url('../img/rebate/ic_qq.png') !important;
    }

    .-mob-share-weixin {
        background-image: url('../img/rebate/ic_erwm.png') !important;
    }

    .-cus-share-weixin {
        background-image: url('../img/rebate/ic_weixin.png');
    }

    .-cus-share-copylink {
        background-image: url('../img/rebate/ic_fuzhilj.png');
    }

    .-cus-share-qrcode {
        background-image: url('../img/rebate/ic_erwm.png');
    }

    .-cus-share-sms {
        background-image: url('../img/rebate/ic_dx.png');
    }

    .share-des {
        white-space: initial;
        padding: 7px 10%;
        position: relative;
        border-bottom: 1px solid #E5E5E5;
    }

    .icon-msg {
        position: absolute;
        top: 0;
        left: 0;
        background: url('../img/rebate/icon-sharePurse@2x.png') 50% 50% no-repeat;
        width: 35px;
        height: 35px;
        background-size: 25px auto;
    }

    .text-msg {
        position: relative;
        display: block;
        font-size: .24rem;
        height: 40px;
        text-align: left;
        line-height: 16px;
        padding: 4px 0 4px 45px;
        box-sizing: border-box;
    }

    .qrcode-mark {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999999999;
    }

    .qrcode-mark .qrcode-img {
        padding-top: 60px;
        width: 256px;
        height: 256px;
        margin: 0 50%;
    }

    .qrcode-mark .qrcode-img img {
        width: 100%;
        height: 100%;
        margin-left: -128px;
    }

    .wxtips-mark {
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        cursor: pointer;
        z-index: 99998;
    }

    .wxtips-mark .wxtips-img {
        width: 100%;
        height: 100%;
        background: url('/img/pic_yindao.png') left top no-repeat;
        background-size: 100%;
    }
</style>

<script id="-mob-share" src="//img.allpyra.com/mob-share.js?appkey=b606411e4080"></script>
<div class="-mob-share-ui -mob-share-ui-theme -mob-share-ui-theme-slide-bottom" style="display: none" data-gchan="0">
    <div class="share-des @@displayMsg">
        <span class="text-msg"><i class="icon-msg"></i>小伙伴们在您的分享链接中成功购买后，您既可以获得指定佣金奖励！</span>
    </div>
    <ul class="-mob-share-list">
        <li class="s-icon -cus-share-weixin j-wxshare-item hide" data-chid="1"><p>微信</p></li>
        <li class="s-icon -mob-share-weibo" data-chid="3"><p>新浪微博</p></li>
        <li class="s-icon -mob-share-qq j-qq" data-chid="5"><p>QQ好友</p></li>
        <li class="s-icon -mob-share-weixin" data-chid="1"><p>二维码</p></li>
        <li class="s-icon -cus-share-sms j-sms hide" data-sms-text="" data-chid="8"><p>短信</p></li>
    </ul>
    <div class="-mob-share-close">取消</div>
</div>
<div class="-mob-share-ui-bg"></div>
<div class="wxtips-mark j-wxtips-mark" style="display:none">
    <div class="wxtips-img"></div>
</div>
<script type="text/javascript">
    $(function () {
        var mainEl = $('.-mob-share-ui');
        var isWeixin = false;
        var isPC = false;
        var Mb;

        // 获取浏览器信息
        if (Base && Base.Browser) {
            isPC = Base.Browser.isPC ? 1 : 0;
            isWeixin = Base.Browser.type === 'weixin' ? 1 : 0;
        }

        // 获取手机浏览器信息
        if (Base && Base.MobileBrowser) {
            Mb = Base.MobileBrowser();
        }

        // 短信分享按钮事件
        $('.-mob-share-ui .j-sms').on('click', function () {
            // var txt = $(this).attr('data-sms-text');
            var txt = encodeURIComponent($(this).attr('data-sms-text'));
            var smstxt = 'sms:?body=' + txt;
            if (Mb.sys && Mb.ver) {
                if (Mb.sys === 'android') {
                    smstxt = 'sms:?body=' + txt;
                } else if (Mb.sys === 'ios') {
                    if (Mb.ver < 8) {
                        smstxt = 'sms:;body=' + txt;
                    } else {
                        smstxt = 'sms:&body=' + txt;
                    }
                }
            }
            window.location.href = smstxt;
        });

        // 微信分享按钮事件
        $('.-mob-share-ui .j-wxshare-item').on('click', function () {
            $('.-mob-share-ui-bg').trigger('click');
            $('.j-wxtips-mark').show();
        });

        // 微信蒙板提示点击隐藏
        $('.j-wxtips-mark').on('click', function () {
            $(this).hide();
        });

        // 分享按钮控制
        $('.j-share-control').on('click', '.j-share-btn', function () {
            var pdt = $(this), option = { isPC: isPC, isWeixin: isWeixin };
            if (pdt.hasClass('disabled')) return false;

            option.link = pdt.attr('data-link') || '';
            option.title = pdt.attr('data-title') || '';
            option.pic = pdt.attr('data-pic') || '';
            option.des = pdt.attr('data-des') || '';
            if (gCommonShareBar) {
                gCommonShareBar(option);
            }
        });

        // 分享主事件
        window.gCommonShareBar = function (option) {

            var elm = $('.-mob-share-ui').eq(0);

            var isPC = option.isPC;
            var isWeixin = option.isWeixin;

            if (mobShare && mobShare.ui && elm.length > 0) {

                var c_title = '', c_des = '', c_pic = '', c_link = '';

                c_title = option.title || document.title;
                c_des = option.des || '给你分享一个好东西 ';
                c_pic = option.pic || gConfig.shareImg;
                c_link = option.link || window.location.href;

                if (!isPC) {
//                    elm.find('.j-sms').removeClass('hide').attr('data-sms-text', c_des + ' '+c_link);
                    elm.find('.j-qq').addClass('hide');
                }

                if (isWeixin) {
                    elm.find('.-mob-share-weixin').addClass('hide');
                    elm.find('.-cus-share-weixin').removeClass('hide');
                }

                mobShare.config({
                    params: {
                        description: c_des,
                        pic: c_pic,
                        title: c_title,
                        url: c_link
                    }
                });
                mobShare.ui.init();
                mobShare.ui.open();
            }
        };
    });


</script>
<!--MOB SHARE END-->

            