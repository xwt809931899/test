/**
 * rebate/income.js
 */
(function ($) {

    var action, hashManager;

    // 获取返利商品收入信息
    var Action = Base.klass.create({
        tpl: {
            order: '<li>\
				<div class="item-wrap">\
					<a href="<%=href_f%>">\
						<div class="content">\
							<div class="detail">\
								<p class="order">订单编号:<%=orderNo%></p>\
							</div>\
						</div>\
						<p class="comm">最终返利收入：￥<%=commission_f%> <span class="fr time"><%=commissionTime_f%></span></p>\
					</a>\
				</div>\
			</li>'
        },
        elements: {
            '.j-product-info': 'elProductInfo',
            '.j-stat-info': 'elStatInfo',
            '.j-action-list': 'elActionList',
            '.j-no-data': 'elNoData',
            '.j-nolist': 'elNoList'
        },
        cgi: {
            action: '/api/commission/queryCommissionList.jsp'
        },
        pageParams: {
            startNum: 0
        },
        listType: '',
        init: function () {
            this.isTotal = false;

            this.pageParams.startNum = Base.url.getPageHash() || 0;

            this.pageParams.contentId = Base.url.param('content');
            this.listType = Base.url.param('lt') || 'pdt';

            this.pager = new Base.Widget.Pager({
                el: '.j-pager'
            });

            this.pager.bind('go', this.proxy(this.pagerGo));

            this.loading = new Base.Widget.Loading({
                owner: this.el
            });

            this.loading.tpl = '<div class="j-ui-loading"><img src="../img/loading.gif" align="absmiddle"> 数据加载中，请稍等...</div>';
            this.getProIn();
            this.flush();

        },
        flush: function () {
            // this.pageParams.listType = this.listType === 'atc' ? 2 : 1;  判断是文案还是商品
            this.pageParams.startNum = Base.url.getPageHash() || 1;
            this.getData();
            this.pager.setCurrent(this.pageParams.startNum);
            this.isTotal = false;
            this.pager.getData = this.getData.bind(this)
            window.scrollTo(0, 0);
        },
        pagerGo: function (startNum) {
            hashManager.setHash('pg-' + startNum);
        },
        getData: function (startNum) {
            $.ajax({
                url: gConfig.PROJECT_REBATE+'/api/rebateuser/incomeList',
                type: 'get',
                headers: { 'A-CID': gConfig.ACID },
                data: { pageSize: 10, startNum: startNum || 0 },
                success: function (result) {
                    this.getDataBack(result);
                }.bind(this)
            });

            this.loading.show();

        },
        getProIn: function () {
            $.ajax({
                url: gConfig.PROJECT_REBATE+'/api/rebateuser/incomeStatistics',
                type: 'get',
                headers: { 'A-CID': gConfig.ACID },
                data: { shareId: this.pageParams.contentId },
                success: function (result) {
                    if (result && result.code === 1000) {
                        data = result.data || [];
                        this.loading.hide();
                        if (!data.itemImg && !data.itemTitle && !data.salePrice) {
                            this.elNoData.removeClass('hide');
                            return false;
                        }
                        // 商品信息
                        this.elProductInfo.find('img').attr('src', data.itemImg || '');
                        this.elProductInfo.find('.title').text(data.itemTitle || '');

                        if (this.listType === 'atc') {
                            this.elProductInfo.find('.income').addClass('hide');
                        } else {
                            this.elProductInfo.find('.price').text('￥' + data.salePrice);
                        }
                        this.elProductInfo.removeClass('hide');
                        // 首页统计信息
                        this.elStatInfo.find('.j-share').text(data.shareCount || 0);
                        this.elStatInfo.find('.j-order').text(data.orderCount || 0);
                        this.elStatInfo.find('.j-icome').text('￥' + (data.totalIncome).toFixed(2));
                        this.elStatInfo.removeClass('hide');

                    } else {
                        this.loading.html('获取数据失败。【' + result.desc + '】');
                    }
                }.bind(this)
            });
        },
        list: [],
        getDataBack: function (result) {
            var list, o;
            if (result && result.code === 1000) {
                o = result.data.list || [];
                list = this.list = this.list.concat(o);
                this.renderList(list);

            } else {
                this.loading.html('获取数据失败。【' + result.desc + '】');
            }
            this.pager.complete(result, list);
        },
        renderList: function (list) {
            var item = '', rsl_dom = '',
                curTpl = this.tpl.order;
            this.loading.hide();
            // 佣金列表
            if (list && list.length > 0) {
                for (var i = 0, len = list.length; i < len; i++) {
                    itemVals = list[i];
                    itemVals.commission_f = (itemVals.commission).toFixed(2);
                    itemVals.commissionTime_f = itemVals.createTime;
                    // itemVals.unit_commission = (itemVals.unit_commission).toFixed(2);
                    // itemVals.payfee = (itemVals.payfee).toFixed(2);
                    itemVals.href_f = '/rebate/item.html#id-' + this.pageParams.contentId;
                    item = this.tmpl(curTpl, itemVals);
                    rsl_dom += item;
                }

                this.elActionList.html(rsl_dom).removeClass('hide');
            } else {
                this.elNoList.removeClass('hide');
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
            var startNum = Base.url.getPageHash();
            action.flush();
        }
    });

    hashManager = new HashManager();

    action = new Action({
        el: '.j-action-case'
    });


    // Base.url.coverFrom();

})(window.Zepto);