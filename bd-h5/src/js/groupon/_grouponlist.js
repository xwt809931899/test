/**
 * 未支付订单
 */
(function ($) {

    var tip;

    var Groupon = Base.klass.create({
        elements: {
            '.j-tab': 'elTab',
            '.j-list': 'elList',
            '.j-empty': 'elEmpty'
        },
        tpl: {
            item: '<div class="item" data-id="<%=groupId%>">\
					<div class="display-flex info" onclick="location.href=\'/groupon.html#!/join-status/<%=groupOpenId%>\'">\
						<div>\
							<img src="<%=groupImg%>">\
						</div>\
						<div class="display-flex">\
							<div class="name"><%=tittle%></div>\
							<div class="status"><%=groupStatus%></div>\
							<div class="num-price"><%=groupMember%>人团　单价：￥<%=groupPrice_f%></div>\
						</div>\
						<div class="group-status-img flag-<%=groupStatus%>">\
							<img class="buy_ing" src="../img/groupon/bg_mygroupbuy_ing.png">\
							<img class="buy_refunded" src="../img/groupon/bg_mygroupbuy_refunded.png">\
							<img class="buy_refunding" src="../img/groupon/bg_mygroupbuy_refunding.png">\
							<img class="buy_succeed" src="../img/groupon/bg_mygroupbuy_succeed.png">\
						</div>\
					</div>\
					<div class="oper">\
						<a href="/groupon.html#!/join-status/<%=groupOpenId%>">查看团购详情</a>\
						<a href="/order.html#!/detail/<%=orderNo%>">查看订单详情</a>\
					</div>\
				</div>'
        },
        cgi: {
            data: gConfig.PROJECT_MARKETING + '/api/group/groupList'
        },
        events: {
            'click .j-act-received': 'clickReceived'
        },
        init: function () {
            this.lt = Base.url.param('lt');

            this.isTotal = false;

            this.list = [];
            this.currentPage = 1;
            this.pageSize = 10;

            this.pager = new Base.Widget.Pager({
                el: '.j-pager'
            });
            this.pager.bind('go', this.proxy(this.pagerGo));
            this.pager.getData = this.getData.bind(this)

            this.loading = new Base.Widget.Loading({
                owner: this.elList
            });

            this.initTab();
            this.getData();
        },
        initTab: function () {
            var $tabs = this.elTab;

            if (this.lt) {
                $tabs.find('.active').removeClass('active');
                this.elTab.find('li').eq(+this.lt).addClass('active');
            }
        },
        pagerGo: function (page) {
            this.currentPage = page;
            this.getData();
        },
        getData: function (startNum) {
            var params;

            params = {
                startNum: startNum || 0,
                pageSize: this.pageSize,
                groupStatus: 'ALL'
            };


            // 状态
            if (this.lt) {
                params.groupStatus = ({
                    1: 'ING',
                    2: 'SUC',
                    3: 'FAILREFUND'
                })[this.lt]
            }

            // $.get(this.cgi.data, params, this.proxy(this.getDataBack));
            $.ajax({
                url: gConfig.PROJECT_MARKETING + '/api/group/userGroupList',
                type: 'get',
                headers: { 'A-CID': gConfig.ACID },
                data: params,
                success: function (result) {
                    if (result && result.code === 1000) {
                        this.getDataBack(result);
                    }
                }.bind(this)
            });

            this.loading.show();

        },
        getDataBack: function (result) {
            var list;
            /* $.get('/api/redpoint/redpoint.jsp', { op: 22 }, function (result) {
             if (result && result.errCode === 0) {
             if (result.obj.groupFailureAdd === 1) {
             $('.group-failed').addClass('has-msg');
             } else {
             $('.group-failed').removeClass('has-msg');
             }
             if (result.obj.groupSuccessAdd === 1) {
             $('.group-success').addClass('has-msg');
             } else {
             $('.group-success').removeClass('has-msg');
             }
             } else {
             tip.show(result.errMsg || '未知错误');
             }
             });*/
            if (result && result.code === 1000) {
                list = this.list = this.list.concat(result.data.list);
                if (list.length) {

                    this.render(result.data.list);

                    if (!this.isTotal) {
//                        this.pager.total(result.obj.totalNum, this.pageSize);
                        this.isTotal = true;
                    }
                } else {
                    this.elEmpty.removeClass('hide');
                }

                this.loading.hide();
            } else {
                tip.show('获取订单列表失败：【' + result.errMsg + '】');
                this.loading.hide();
            }
            this.pager.complete(result, list)
        },
        render: function (list) {
            var $list,
                tmpl,
                tpl,
                coverPrice,
                self = this;

            if (list && list.length) {
                $list = this.elList;
                tmpl = this.tmpl;
                tpl = this.tpl;
                coverPrice = this.coverPrice;

                this.cacheList = list;
                $(list).each(function (m, n) {
                    n.groupPrice_f = 0
                    if (n.groupPrice) {
                        n.groupPrice_f = n.groupPrice.toFixed(2)
                    }
                    $list.append(tmpl(tpl.item, $.extend(n, {})))
                });
            }
        }
    });

    tip = new Base.Widget.Tip();

    new Groupon();

})(window.Zepto);