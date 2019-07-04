/**
 * user coin
 */
(function ($) {

    var userCoin;

    var UserCoin = Base.klass.create({
        elements: {
            '.j-text-totalCoin': 'elTotalCoin',
            '.j-list': 'elList',
            '.j-totalGet': 'elTotalGet',
            '.j-totalUsed': 'elTotalUsed',
            'j-pager': 'elPager'
        },
        tpl: {
            item: '<li>\
						<span class="coin"><%=coin%></span>\
						<%=coinName%>\
						<p><%=createTime%></p>\
					</li>'
        },
        cgi: {
            data: gConfig.PROJECT_REBATE+'/api/rebateuser/coinList'
        },
        init: function () {
            this.isTotal = false;

            this.isFirst = false;

            this.pageSize = 10;

            this.pager = new Base.Widget.Pager({
                el: '.j-pager'
            });
            this.pager.bind('go', this.proxy(this.pagerGo));

            this.loading = new Base.Widget.Loading({
                owner: this.elList
            });

            $.ajax({
                url: gConfig.PROJECT_REBATE+'/api/rebateuser/coinTotal',
                type: 'get',
                headers: { 'A-CID': gConfig.ACID },
                success: function (result) {
                    if (result && result.code === 1000) {
                        this.elTotalCoin.text(result.data.totalCoin);
                        this.elTotalGet.text(result.data.totalEarn);
                        this.elTotalUsed.text(result.data.totalUsed);
                        this.getDataBack(result);
                    }
                }.bind(this)
            });

            this.flush();
        },
        flush: function (page) {

            this.page = page || 1;

            this.getData();
            this.pager.getData = this.getData.bind(this)

        },
        pagerGo: function (page) {
            hashManager.setHash('pg-' + page);
        },
        getData: function (startNum) {
            $.ajax({
                url: this.cgi.data,
                type: 'get',
                data: { pageSize: this.pageSize, startNum: startNum || 0 },
                headers: { 'A-CID': gConfig.ACID },
                success: function (result) {
                    if (result && result.code === 1000) {
                        this.getDataBack(result);
                    }
                }.bind(this)
            });

//            $.get(this.cgi.data, params, this.proxy(this.getDataBack));

            this.loading.show();
        },
        list: [],
        getDataBack: function (result) {
            var list,
                o;

            if (result && result.code === 1000) {
                o = result.data;
                list = this.list = this.list.concat(o.list);
                this.renderList(list);

                if (!this.isTotal) {
                    this.pager.total(o.totalNum, this.pageSize);
                    this.isTotal = true;
                }

            } else {
                this.loading.html('获取数据失败');
            }
            this.pager.complete(result, list)

            /*  if (!this.isFirst) {
             this.isFirst = true;
             } else {
             $(window).scrollTop(this.elList.offset().top);
             }*/
        },
        renderList: function (list) {
            var $list = this.elList,
                tmpl = this.tmpl,
                tpl = this.tpl,
                formatTime = this.formatTime;

            if (list && list.length) {
                $('.pager').removeClass('hide');
                $list.html('');

                $(list).each(function (m, n) {
                    $list.append(tmpl(tpl.item, n));
                });

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
            userCoin.flush(pageNo);
        }
    });

    hashManager = new HashManager();

    userCoin = new UserCoin();

})(window.Zepto);