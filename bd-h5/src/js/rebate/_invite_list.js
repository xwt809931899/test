/**
 * _invite
 */
(function ($) {

    var hashManager, inviteList;
    var is_webi = !!Base.url.param("is_webi");

    var InviteList = Base.klass.create({
        elements: {
            '.j-invite-list': 'elInviteList'
        },
        tpl: '<tr>\
				<td class="num"><%=nickName%></td>\
				<td class="reg-time"><%=regTime%></td>\
				<td class="isMicroShow"><%=reward_f%></td>\
			</tr>',
        cgi: {
            action: gConfig.PROJECT_REBATE+'/api/rebateuser/inviteUserList'
        },
        pageParams: {
            pageSize: 20,
            op: 4
        },
        init: function () {

            Base.App.checkApp();

            this.pager = new Base.Widget.Pager({
                el: '.j-pager'
            });

            this.pager.bind('go', this.proxy(this.pagerGo));

            this.loading = new Base.Widget.Loading({
                owner: this.el
            });

            this.flush();
            if (!is_webi) {
                this.el.addClass("noMicro")
            }
        },

        flush: function () {
            this.pageParams.pageNo = Base.url.getPageHash() || 1;

            this.getData();

            this.pager.setCurrent(this.pageParams.pageNo);

            this.isTotal = false;

            var top = this.el.offset().top;

            this.pager.getData = this.getData.bind(this)
            window.scrollTo(0, top);
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
//            $.get(this.cgi.action, this.pageParams, this.proxy(this.getDataBack));

            this.loading.show();
        },
        list: [],
        getDataBack: function (result) {
            var list,
                o;
            if (result.code === 1000) {
                o = result.data;
                list = this.list = this.list.concat(o.list || []);
                this.renderList(list);
            } else {
                // 获取数据失败！
            }
            this.pager.complete(result, list)
        },
        renderList: function (list) {
            var item,
                remaintime,
                elInnerHtml = '';
            if (list && list.length) {
                this.elInviteList.html('');
                for (var i = 0, len = list.length; i < len; i++) {
                    item = list[i];
                    elInnerHtml += this.tmpl(this.tpl,$.extend(item,{
                        reward_f: '￥' + item.reward.toFixed(2),
                    }));
                }
                this.elInviteList.html(elInnerHtml);
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
            inviteList.flush();
        }
    });

    hashManager = new HashManager();

    inviteList = new InviteList({
        el: '.js-container'
    });

})(window.Zepto);