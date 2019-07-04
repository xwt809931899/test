<style>
    .bottom-bar a.rebateHome {
        background-image: url('../../img/rebate/footicons/dist_ic_home_normal.png');
    }

    .bottom-bar a.rebateNews {
        background-image: url('../../img/rebate/footicons/dist_ic_message_normal.png');
    }

    .bottom-bar .rb-more {
        height: 65px;
        margin-top: -19px;
    }

    .bottom-bar a.rebateMore {
        background-image: url('../../img/rebate/footicons/dist_ic_share_normal.png');
        background-size: 44px;
    }

    .bottom-bar a.rebateMore em {
        bottom: -5px;
    }

    .bottom-bar a.rebateFound {
        background-image: url('../../img/rebate/footicons/dist_ic_find_normal.png');
    }

    .bottom-bar a.rebateMe {
        background-image: url('../../img/rebate/footicons/dist_ic_user_normal.png');
    }

    .bottom-bar .home a.rebateHome {
        background-image: url('../../img/rebate/footicons/dist_ic_home_active.png');
    }

    .bottom-bar .news a.rebateNews {
        background-image: url('../../img/rebate/footicons/dist_ic_message_active.png');
    }

    .bottom-bar .more a.rebateMore {
        background-image: url('../../img/rebate/footicons/dist_ic_share_normal.png');
    }

    .bottom-bar .found a.rebateFound {
        background-image: url('../../img/rebate/footicons/dist_ic_find_active.png');
    }

    .bottom-bar .me a.rebateMe {
        background-image: url('../../img/rebate/footicons/dist_ic_user_active.png');
    }

    .bottom-bar .home a.rebateHome em,
    .bottom-bar .news a.rebateNews em,
    .bottom-bar .found a.rebateFound em,
    .bottom-bar .me a.rebateMe em {
        color: #af1c40;
    }

    .layer-top {
        display: table;
        width: 100%;
    }

    .layer-top .img {
        display: table-cell;
        width: 100%;
        vertical-align: middle;
        text-align: center;
    }

    .layer-top img {
        width: 50%;
        height: auto;
        max-width: 200px;
    }

    .share-type-layer {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 1000001;
        top: 0;
        left: 0;
        background-color: rgba(248, 248, 248, 0.98);
    }

    .share-list-wrap {
        position: absolute;
        width: 100%;
        height: auto;
        left: 0;
        bottom: 0;
        background: #fff;
    }

    .share-list-wrap ul {
        line-height: 22px;
    }

    .share-list-wrap li {
        padding: 20px 20px 20px 100px;
        border-top: 1px solid #E5E5E5;
        background-size: auto 60px;
        background-position: 20px 50%;
        background-repeat: no-repeat;
    }

    .share-list-wrap li.share-goods {
        background-image: url('../../img/rebate/icon_singleItem@2x.png');
    }

    .share-list-wrap li.share-essay {
        background-image: url('../../img/rebate/icon_releaseCopywrite-@2x.png');
    }

    .share-list-wrap li.share-list {
        background-image: url('../../img/rebate/icon_releaseHome@2x.png');
    }

    .share-list-wrap li.share-mall {
        background-image: url('../../img/rebate/icon_businessCard@2x.png');
    }

    .share-list-wrap .title {
        font-size: 0.33rem;
        color: #333333;
    }

    .share-list-wrap .info {
        font-size: 0.28rem;
        color: #999999;
    }

    .close-layer {
        display: block;
        padding: 13px 0;
        text-align: center;
        background-color: #ffffff;
        border-top: 1px solid #E5E5E5;
    }

    .close-layer .close {
        display: inline-block;
        width: 18px;
        height: 18px;
        vertical-align: top;
        background: url("../../img/rebate/btn_ClosereleaseShare@2x.png") no-repeat 50% 50%;
        background-size: 18px auto;
    }

    .bottom-bar li em {
        display: block;
        color: #000;
        bottom: 7px;
    }

    .bottom-bar li a {
        background-size: 32px;
    }
</style>

<div id="j-bottomWrap">
    <div id="RebateBar" class="bottom-bar j-bottom-bar">
        <div class="bb-wrap clearfix @@curTab">
            <ul>
                <li class="option j-rb-home"><a href="/rebate/home.html" class="rebateHome"><em>首页</em></a></li>
                <li class="option j-rb-found">
                    <a href="/rebate/found.html" class="rebateFound">
                        <em>发现</em>
                        <i class="icon-new"></i>
                    </a>
                </li>
                <li class="option j-rb-more rb-more"><a href="javascript:;" class="rebateMore j-rebateMore"><em>分享</em></a>
                </li>
                <li class="option j-rb-news"><a href="/rebate/news.html" class="rebateNews"><em>消息</em></a></li>
                <li class="option j-rb-me"><a href="/rebate/user.html" class="rebateMe"><em>我的</em></a></li>
            </ul>
        </div>
    </div>

    <div class="share-type-layer j-shareLayer hide">
        <div id="j-layerTop" class="layer-top">
            <div class="img">
                <img src="../../img/rebate/icon_releaseShare@2x.png" alt=""/>
            </div>
        </div>
        <div id="j-shareListWrap" class="share-list-wrap">
            <ul>
                <li class="share-goods">
                    <a href="/search.html#/rebate">
                        <p class="title">分享单品</p>
                        <p class="info">单品推荐，只为Ta们所需</p>
                    </a>
                </li>
                <li class="share-essay">
                    <a href="/rebate/share_found.html">
                        <p class="title">分享文案</p>
                        <p class="info">用文章/故事来传递精选好物</p>
                    </a>
                </li>
                <li class="share-list">
                    <a href="/rebate/account.html#!/share-list?eid=0">
                        <p class="title">分享清单</p>
                        <p class="info">一键传递您全部的分享清单</p>
                    </a>
                </li>
                <li class="share-mall">
                    <a href="/rebate/share_homecard.html">
                        <p class="title">分享商城</p>
                        <p class="info">一键分享_gConfig_.siteNameZH商城全部商品</p>
                    </a>
                </li>
            </ul>
            <a class="close-layer j-closeLayer" href="javascript:;"><i class="close"></i></a>
        </div>
    </div>
</div>

