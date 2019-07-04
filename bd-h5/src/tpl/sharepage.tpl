<!DOCTYPE html>
<html>
<head>
    @@include('inc/head.tpl')
    <title>分享文案-_gConfig_.siteTitile</title>
    <link rel="stylesheet" href="css/sharepage.css?@@version">
    <link rel="stylesheet" href="css/rebate/share_found.css?@@version">
</head>

<body>
<ajaxloading></ajaxloading>

<div v-cloak class="share_found j-share-control">
    <div class="fixed-header">
        <header :class="{isgohome:isSharePage,'share-page-header':isSharePage}" v-if="!isInApp">
            <a href="javascript:window.history.go(-1);" class="goback"></a>
            <a href="/" class="gohome"></a>
            <h1>
                <div id="j-act-title" class="title">文案详情</div>
            </h1>
            <a href="javascript:void(0);" class="share j-share-btn"
               data-img="{{found.titleImg}}" data-title="{{found.title}}" data-eid="{{found.eid}}"
               data-des="{{shareDesc}}"></a>
        </header>
    </div>

    <div class="container">
        <div class="topimg">
            <img :src="imgUrl"/>
            <div v-if="!isZan" @click="zan()" class="normal-up-wrap">
                <img src="img/rebate/ic_like.png">
                <div v-if="likeEssay === 0"> 点赞</div>
                <div v-else>{{likeEssay}}</div>
            </div>
            <div v-else class="up-wrap">
                <img src="img/rebate/ic_liked.png">
                <div> {{likeEssay}}
                    <sup>+</sup>
                </div>
            </div>
        </div>
        <div class="found-user-info display-flex">
            <a @click="goOtherMore"><img :src="found.headimgurl"></a>
            <span><a @click="goOtherMore">{{found.nickName}}</a></span>
            <time>{{found.changeTime}}</time>
        </div>

        <div class="textarea-wrap mb0 found-title">
            {{text}}
        </div>
        <div class="content">
            <template v-for="item in fields">
                <pre v-if="item.type==='text'" class="textarea-wrap">{{item.text | decodeURIComponent}}</pre>
                <div v-if="item.type==='img'" class="textimg-warp">
                    <img :src="item.imgUrl">
                </div>
                <div v-if="item.type==='product'" class="textpropreview-warp">
                    <h5><span>{{item.proIndex}}</span>{{item.itemTitle}}</h5>
                    <p class="descword">{{item.descword}}</p>
                    <a :href="item.itemCode | proItemUrl isSharePage">
                        <div class="border">
                            <img :src="item.mainIcon">
                            <div class="price display-flex">
                                <div>
                                    <strong>￥{{item.salePrice | toFixed}}</strong>
                                    <p>{{item.warehouseName}}</p>
                                </div>
                                <div>
                                    <button class="btn btn-lt">查看详情</button>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </template>
        </div>

    </div>

    <div v-if="!isInApp && otherList.length > 0 && !found.isOwner" class="other-list">
        <h4 class="display-flex">更多分享</h4>
        <div class="display-flex other-item" v-for="item in otherList"
             @click="goOtherArticle(item)">
            <img :src="item.titleImg">
            <div>
                <div class="title">{{item.title}}</div>
                <div class="date">{{item.changeTime | formatTime 'yyyy-MM-dd hh:mm:ss'}}</div>
            </div>
        </div>
        <div class="more">
            <a @click="goOtherMore"
               >查看更多</a>
        </div>
    </div>

    <footer v-cloak v-if="!isInApp && !isSharePage" class="foot-btn">
        <button class="btn fr" v-if="uin!=found.uin" v-on:click="quote">我要引用</button>
        <button class="btn fr" v-else v-on:click="edit">我要修改</button>
        <div class="sumCommission">预估收入：<span>￥{{found.sumCommission | toFixed}}</span></div>
    </footer>
</div>

<div v-cloak v-show="succLayer" class="layer succLayer">
    <div class="layerback"></div>
    <div class="layermain">
        <img src="img/rebate/ic_article_dialog.png" class="ic_article_dialog">
        <p class="succ-tips">文案引用成功
            <template v-if="coinNum>0">
                ，奖励{{coinNum}}金币
            </template>
        </p>
        <div class="display-flex succbtn j-share-control">
            <a v-bind:href="newEid | editUrlFilter" class="btn btn-grey">编辑修改</a>
            <button v-on:click="share"
                    data-img="{{imgUrl}}" data-title="{{text}}" data-eid="{{newEid}}"
                    data-des="{{shareDesc}}"
                    class="btn btn-yellow  j-share-btn">立即分享
            </button>
        </div>
    </div>
</div>


<div v-cloak class="wxtips-mark" v-if="showWxTips" v-on:click="closeWxTips">
    <div class="wxtips-img"></div>
</div>

@@include('inc/foot.tpl')

<script type="text/javascript" src="<%=_gConfig_.CND_URL%>/assets/lib/js/underscore.min.js?v=20190505"></script>
<script type="text/javascript" src="<%=_gConfig_.CND_URL%>/assets/lib/js/zepto.min.js?v=20190505"></script>
<script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
<!-- build:js js/sharepage.js -->

<script type="text/javascript" src="js/common/_base_sh.js"></script>
<script type="text/javascript" src="js/common/_loading.js"></script>
<script type="text/javascript" src="js/_sharepage.build.js"></script>

<!-- endbuild -->
@@include('inc/sharePlane.tpl', {"displayMsg":"hide"})
</body>

</html>
