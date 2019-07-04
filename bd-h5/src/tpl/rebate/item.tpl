<!DOCTYPE html>
<html>
<head>
    @@include('../inc/head.tpl')
    <title>商品详情-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="../css/rebate/item.css?@@version">
</head>
<body>
<header class="j-share-control">
    <a href="javascript:window.history.go(-1);" class="goback"></a>
    <a href="javascript:void(0);" class="disabled share j-hideBtn j-share-btn hide">
        <span id="j-rebate-money" class="rebate-money"></span></a>
</header>
<div class="container">
    <div class="imgs-wrap">
        <div class="imgs swiper-container j-imgs">
            <div class="list swiper-wrapper j-list"></div>
            <div class="dotted"></div>
            <div class="seldout-cover j-main-seldout">
                <span class="seldout"></span>
            </div>
        </div>
    </div>

    <div class="info-wrap">

        <div class="goodinfo">
            <div class="goodinfo-wrap">
                <div class="title-wrap">
                    <h1 class="title j-subtitle">_gConfig_.siteNameZH商品</h1>
                    <div class="favorinfo j-favorinfo hide">
                        <i class="icon-favor"></i>
                        <span>喜欢</span>
                    </div>
                </div>
                <div>
                    <div class="td-l price-wrap">
                            <span class="price">
                                ￥<strong class="j-main-price"></strong>
                            </span>
                        <span class="discount-wrap hide">
                                <span class="discount j-discount"></span>
                                <span class="refprice j-refprice"></span>
                            </span>
                        <span class="one-buy j-one-buy hide">限购一件</span>
                        <span class="acttime j-acttime va-b hide">活动结束：<i></i></span>
                    </div>
                </div>
                <div class="other-wrap">
                    <em class="origin j-origin"></em>
                    <em class="split">|</em>
                    <em class="depotname j-main-deliver"></em>
                    <em class="delivertime j-delivertime">预计15工作日送达</em>
                </div>
            </div>
        </div>
        <div class="goods-attr js-attr">
            <h3 class="dc_tit">商品参数</h3>
            <div class="attributes content-wrap j-main-attributes">
            </div>
        </div>

        <div class="editor-msg">
            <h3 class="dc_tit">小编寄语</h3>
            <div class="editor-wrap content-wrap">
                <p class="j-main-editor">暂无信息。</p>
            </div>
            <div class="edit-ps">
                注：本商品仅适于自用，不得进行转售。
            </div>
        </div>
        <div class="quality content-wrap">
                <span>
                    <i class="icon-qua"></i>精品正品
                </span>
            <span>
                    <i class="icon-qua"></i>海外采购
                </span>
            <span>
                    <i class="icon-qua"></i>快速清关
                </span>
            <span>
                    <i class="icon-qua"></i>超时赔付
                </span>
        </div>

        <div class="description">
            <div class="j-main-imgexplain">
                <img v-for="item in itemGraphicDetail" :src="item"/>
            </div>
        </div>
    </div>
</div>


<div class="j-share-control share-wrap j-hideBtn hide">
    <div class="display-flex foot-btn">
        <div class="j-create-share-data">
            <div><img src="../img/rebate/ic_productdetails_writer.png.png">创建文案</div>
            <span>丰富内容获得更多关注</span>
        </div>
        <div class="j-share-btn ">
            <div><img src="../img/rebate/ic_productdetails_fanlishare.png.png">立即分享</div>
            <span class="j-quote_count">已有0人分享</span>
        </div>
    </div>
</div>

<div class="j-dialog-viewpic" style="display:none;width:320px;">
    <div class="imgs-dialog swiper-container j-imgs-dialog">
        <div class="list swiper-wrapper j-list"></div>
        <div class="dotted dotted-dialog"></div>
    </div>
</div>

@@include('../inc/foot.tpl')
<script src="//cdn.bootcss.com/vue/1.0.27/vue.min.js"></script>
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
<!-- build:js ../js/rebate/item.js -->
<script type="text/javascript" src="../assets/lib/js/zepto.min.js"></script>
<script type="text/javascript" src="../js/common/_base.js"></script>
<script type="text/javascript" src="../js/common/_loading.js"></script>
<script type="text/javascript" src="../js/common/_store.min.js"></script>

<script type="text/javascript" src="../js/common/_loadlayer.js"></script>
<script type="text/javascript" src="../js/common/_swiper.js"></script>
<script type="text/javascript" src="../js/common/_lazyloader.js"></script>
<script type="text/javascript" src="../js/common/_dialog.js"></script>
<script type="text/javascript" src="../js/common/_favorControl.js"></script>
<script type="text/javascript" src="../js/rebate/_item.js"></script>
<!-- endbuild -->

@@include('../inc/sharePlane.tpl', {"displayMsg":"show"})
</body>
</html>