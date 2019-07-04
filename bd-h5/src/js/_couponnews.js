/**
 * rebate/wealthnews.js.js
 */
(function ($) {

    var action, hashManager;

    // 获取财富消息列表
    var Action = Base.klass.create({
        sodaTpl: {
            coupon: '#j_couponNews'
        },
        elements: {
            '.j_ActionList': 'elCouponWrap',
            '.j_LoadingWrap': 'elLoadingWrap'
        },
        cgi: {
            action: '/api/notice/notifyCoupon.jsp'
        },
        pageParams: {
            pageSize: 10
        },
        list: [],
        init: function () {
            this.isTotal = false;

            this.pager = new Base.Widget.Pager({
                el: '.j-pager'
            });

            this.pager.bind('go', this.proxy(this.pagerGo));

            this.loading = new Base.Widget.Loading({
                owner: this.elLoadingWrap
            });

            this.flush();

        },
        flush: function () {

            this.pageParams.pageNo = Base.url.getPageHash() || 1;

            this.getData();

            this.pager.setCurrent(this.pageParams.pageNo);
            this.pager.getData = this.getData.bind(this)
            this.isTotal = false;

            window.scrollTo(0, 0);
        },
        pagerGo: function (pageNo) {
            hashManager.setHash('pg-' + pageNo);
        },
        getData: function (startNum) {

            this.pageParams._ = new Date() - 0;

            $.ajax({
                url: gConfig.PROJECT_USER+'/api/myAssets/assetsRemind',
                type: 'get',
                data: { pageSize: this.pageParams.pageSize, startNum: startNum || 0 },
                headers: { 'A-CID': gConfig.ACID },
                success: function (result) {
                    if (result && result.code === 1000) {
                        this._getDataBack(result);
                    }
                }.bind(this)
            });
//            $.get(this.cgi.action, this.pageParams, this.proxy(this._getDataBack));

            this.loading.show();

        },
        _getDataBack: function (result) {
            var o,
                list;

            if (result && result.code === 1000) {
                o = result.data;
                list = this.list = this.list.concat(o.list);
                if (list && list.length > 0) {
                    this._render(list);
                    if (!this.isTotal) {
//                        this.pager.total(o.totalNum, this.pageParams.pageSize);
                        this.isTotal = true;
                    }
                } else {
                    this.loading.html('暂无数据。');
                }
            } else {
                this.loading.html('获取数据失败。【' + result.errMsg + '】');
            }
            this.pager.complete(result, list)
        },
        _render: function (list) {
            if (list && list.length > 0) {
                this.elCouponWrap.html(this.sodaTmpl(this.sodaTpl.coupon, { list: list }));
                this.loading.hide();
            } else {
                this.loading.html();
            }
        }
    });

    var HashManager = Base.klass.create({
        init: function () {
            $(window).on('hashchange', this.proxy(this.hashChange));
        },
        setHash: function (hash) {
            window.location.hash = hash;
        },
        hashChange: function () {
            var pageNo = Base.url.getPageHash();
            action.flush();
        }
    });

    hashManager = new HashManager();

    action = new Action({
        el: '.j_wrap'
    });

})(window.Zepto);