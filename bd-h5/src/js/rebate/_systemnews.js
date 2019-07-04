/**
 * rebate/systemnews.js
 */
(function ($) {

    var action, hashManager;

    // 获取系统消息列表
    var Action = Base.klass.create({
        tpl: {
            item: '<li><div class="item-wrap">' +
            '<a href="systemnew.html?nid=<%=content%>">' +
            '<div class="thumbnail">' +
            '<img src="<%=title_img_f%>"></div>' +
            '<div class="details">' +
            '<p class="title"><%=title%></p>' +
            '<p class="content"><%=content%></p>' +
            '<p class="time"><%=notifyTime%></p></div></a></div></li>'
        },
        elements: {
            '.j-action-list': 'elActionList',
        },
        cgi: {
            action: gConfig.PROJECT_REBATE+'/api/notify/notice'
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
                headers: { 'A-CID': gConfig.ACID },
                data: { pageSize: this.pageParams.pageSize, startNum: startNum || 0 },
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

            if (result && result.code === 1000) {

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

            if (list && list.length > 0) {
                this.elActionList.html('');
                for (var i = 0, len = list.length; i < len; i++) {
                    itemVals = list[i];
                    itemVals.title_img_f = itemVals.titleImg;
                    item = this.tmpl(this.tpl.item, itemVals);
                    rsl_dom += item;
                }
                this.elActionList.html('<ul>' + rsl_dom + '</ul>');
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
        el: '.j-rebate-group'
    });


})(window.Zepto);