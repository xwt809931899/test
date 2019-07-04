/**
 * rebate/wealthnews.js.js
 */
(function ($) {

    var action, hashManager;

    // 获取财富消息列表
    var Action = Base.klass.create({
        sodaTpl: {
            tpl: '#j_logisticTpl'
        },
        elements: {
            '.j_ActionList': 'elListWrap',
            '.j_LoadingWrap': 'elLoadingWrap'
        },
        pageParams: {
            pageSize: 20
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

            this.isTotal = false;

            this.pager.getData = this.getData.bind(this)

            window.scrollTo(0, 0);
        },
        pagerGo: function (pageNo) {
            hashManager.setHash('pg-' + pageNo);
        },
        getData: function (startNum) {

            $.ajax({
                url: gConfig.PROJECT_USER+'/api/notifyLogistics/getNotifyLogistics',
                type: 'get',
                dataType: 'json',
                data: { pageSize: this.pageParams.pageSize, startNum: startNum || 0 },
                headers: { 'A-CID': gConfig.ACID },
                success: function (result) {
                    if (result && result.code === 1000) {
                        this._getDataBack(result);
                    }
                }.bind(this)
            });

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
                    $('.pager ').hide();
                }
            } else {
                this.loading.html('获取数据失败。【' + result.errMsg + '】');
                $('.pager ').hide();
            }
            this.pager.complete(result, list)
        },
        _render: function (list) {
            if (list && list.length > 0) {
                this.elListWrap.html(this.sodaTmpl(this.sodaTpl.tpl, { list: list }));
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