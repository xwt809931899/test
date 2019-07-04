/**
 * rebate withdrawals_record
 */
(function ($) {
    var withdrawalsList, hashManager;


    var WithdrawalsList = Base.klass.create({
        tpl: '<li class="item">\
                    <div class="dis-table">\
                        <div class="dis-table-cell tl type"><%=cashName%></div>\
                        <div class="dis-table-cell tr money">￥<%=cashMoney%></div>\
                    </div>\
                    <div class="dis-table">\
                        <div class="dis-table-cell tl date"><%=cashTime%></div>\
                        <div class="dis-table-cell tr status"><%=cashStatus%></div>\
                    </div>\
                </li>',
        cgi: {
            action: gConfig.PROJECT_REBATE+'/api/rebateuser/cashList'
        },
        pageParams: {
            pageSize: 10,
            op: 3
        },
        init: function () {
            this.pager = new Base.Widget.Pager({
                el: '.j-pager'
            });

            this.pager.bind('go', this.proxy(this.pagerGo));

            this.loading = new Base.Widget.Loading({
                owner: this.el
            });

            this.flush();
        },
        flush: function () {
            this.pageParams.pageNo = Base.url.getPageHash() || 1;
            this.pageParams._ = new Date() - 0;

            this.getData();

            this.pager.setCurrent(this.pageParams.pageNo);

            this.isTotal = false;

            window.scrollTo(0, this.el.offset().top);
        },
        getData: function (startNum) {
            $.ajax({
                url: this.cgi.action,
                type: 'get',
                data: { pageSize: this.pageParams.pageSize, startNum: startNum || 0 },
                headers: { 'A-CID': gConfig.ACID },
                success: function (result) {
                    if (result && result.code === 1000) {
                        this.getDataBack(result);
                    }
                }.bind(this)
            });
//            $.get(this.cgi.action, this.pageParams, this.proxy(this.getDataBack));
            this.loading.show();
        },
        list: [],
        getDataBack: function (result) {
            var list,
                o;
            if (result && result.code === 1000) {
                o = result.data;
                list = this.list = this.list.concat(o.list || []);
                this.renderList(list);
                if (!this.isTotal) {
                    this.pager.total(o.totalNum, this.pageParams.pageSize);
                    this.isTotal = true;
                }
            } else {
                // 获取数据失败！
            }
            this.pager.complete(result, list)
        },
        renderList: function (list) {
            var item,
                elInnerHtml = '';
            if (list && list.length) {
                for (var i = 0, len = list.length; i < len; i++) {
                    item = list[i];
                    elInnerHtml += this.tmpl(this.tpl, $.extend({}, item, {
                        cashMoney: item.cashMoney.toFixed(2)
                    }));
                }
                this.el.html(elInnerHtml);
                this.loading.hide();
            } else {
                this.loading.html();
            }
        },
        pagerGo: function (pageNo) {
            hashManager.setHash('pg-' + pageNo);
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
            withdrawalsList.flush();
        }
    });


    new WithdrawalsList({
        el: '.j-withdrawals-list'
    });
})(window.Zepto);