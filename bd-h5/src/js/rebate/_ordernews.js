/**
 * rebate/ordernews.js
 */
(function ($) {

    var action, hashManager;

    // 获取订单消息列表
    var Action = Base.klass.create({
        tpl: {
            item: '<li><div class="item-wrap"><div class="details">' +
            '<h3>由于经营有方，掌柜您进账了￥<%=commission_f%>元请查收</h3><p class="date"><%=notifyTime%></p>' +
            '<p class="order">订单编号：<span><%=orderId%></span></p>' +
            '<p class="income">收入：<span>￥<%=commission_f%></span></p>' +
            '<p class="source">推广来源：<span><%=orderSource%></span></p>' +
            '<a class="gopro <%=visibleHidden%>" href="<%=href%>">查看</a></div></div></li>'
        },
        elements: {
            '.j-action-list': 'elActionList',
        },
        cgi: {
            action: gConfig.PROJECT_REBATE+'/api/notify/order'
        },
        pageParams: {
            op: 1,
            pageSize: 10
        },
        init: function () {
            this.isTotal = false;

            this.pageParams.pageNo = Base.url.getPageHash() || 1;

            this.pager = new Base.Widget.Pager({
                el: '.j-pager'
            });

            this.pager.bind('go', this.proxy(this.pagerGo));

            this.loading = new Base.Widget.Loading({
                owner: this.elActionList
            });

            this.loading.tpl = '<div class="j-ui-loading"><img src="../img/loading.gif" align="absmiddle"> 数据加载中，请稍等...</div>';

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
                    this.getDataBack(result);
                }.bind(this)
            });

            this.loading.show();

        },
        list: [],
        getDataBack: function (result) {
            var list,
                o;

            if (result.code === 1000) {

                o = result.data;
                list = this.list = this.list.concat(o.list);
                if (list && list.length > 0) {
                    this.renderList(list);
                    if (!this.isTotal) {
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
        renderList: function (list) {
            var item = '', rsl_dom = '', itemVals;
            var self = this;
            var coverOrderSourceName = this.coverOrderSourceName;
            var coverPrice = this.coverPrice;
            var formatTime = this.formatTime;
            if (list && list.length > 0) {
                this.elActionList.html('');
                for (var i = 0, len = list.length; i < len; i++) {
                    itemVals = list[i];
                    itemVals.commission_f = itemVals.commission.toFixed(2)
                    itemVals.href = 'javascript:;'
                    itemVals.visibleHidden = '';
                    if (!itemVals.orderSourceContent) {
                        itemVals.visibleHidden = 'visible-hidden'
                    }
                    else if (itemVals.orderSourceType === 'PRODUCT') {
                        itemVals.href = 'item.html#id-' + itemVals.orderSourceContent
                    } else if (itemVals.orderSourceType === 'ESSAY') {
                        itemVals.href = '/sharepage.html?id=E_' + itemVals.orderSourceContent + '&head=no'
                    } else if (itemVals.orderSourceType === 'HOMEPAGE') {

                    } else if (itemVals.orderSourceType === 'SHOPCARD') {

                    }
                    else {
                        itemVals.visibleHidden = 'visible-hidden'
                    }
                    item = this.tmpl(this.tpl.item, itemVals);
                    rsl_dom += item;
                }
                this.elActionList.html('<ul>' + rsl_dom + '</ul>');
                this.loading.hide();
            } else {
                this.loading.html();
            }
        },
        coverOrderSourceName: function (orderSource) {
            // 订单来源解析
            var osn = '';
            if (orderSource == 1) {
                osn = "分享商品";
            } else if (orderSource == 2) {
                osn = "分享文案";
            }
            return osn;
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
        el: '.j-rebate-group'
    });

})(window.Zepto);