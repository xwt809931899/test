/**
 * rebate/wealthnews.js.js
 */
(function ($) {

    var action, hashManager;

    // 获取财富消息列表
    var Action = Base.klass.create({
        sodaTpl: {
            wealthList: '#j_wealthNewsItem'
        },
        elements: {
            '.j_ActionList': 'elWealthList',
            '.j_LoadingWrap': 'elLoadingWrap'
        },
        cgi: {
            action: gConfig.PROJECT_REBATE+'/api/notify/finance'
        },
        pageParams: {
            pageSize: 10
        },
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

            this.isTotal = false;

            this.pager.getData = this.getData.bind(this)
            window.scrollTo(0, 0);
        },
        pagerGo: function (pageNo) {
            hashManager.setHash('pg-' + pageNo);
        },
        getData: function (startNum) {

            this.pageParams._ = new Date() - 0;
            $.ajax({
                url: this.cgi.action,
                type: 'get',
                data: { pageSize: this.pageParams.pageSize, startNum: startNum || 0 },
                headers: { 'A-CID': gConfig.ACID },
                success: function (result) {
                    this._getDataBack(result);
                }.bind(this)
            });

            this.loading.show();

        },
        list: [],
        _getDataBack: function (result) {
            var o,
                list;

            if (result.code === 1000) {
                o = result.data;
                list = this.list = this.list.concat(o.list || []);
                if (list && list.length > 0) {
                    this._render(list);
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
                this.elWealthList.html(this.sodaTmpl(this.sodaTpl.wealthList, { list: list }));
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