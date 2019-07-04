(function () {

    var tip;

    var News = Base.klass.create({
        sodaTpl: {
            newsList: '#j_newsTpl'
        },
        elements: {
            '#j_newsList': 'elNewsList'
        },
        cgi: {
            action: '/api/notice/b2cNotifyCenter.jsp'
        },
        init: function () {
            this.loading = new Base.Widget.Loading({
                owner: this.el
            });
            this.getNewsList();
            window.addEventListener("popstate", function () {
                if (!history.state) { //消息中心页面，history.state为null,
                    $('.list').removeClass('hide');
                    $('.code').addClass('hide');
                    // console.log(history.state);
                }
            });
            // setTimeout(function () {
            //     this.redPoint();
            // }.bind(this), 2000);
        },
        redPoint: function () {
            $.get('/api/redpoint/redpoint.jsp', {
                op: 21
            }, function (result) {
                if (result && result.errCode === 0) {
                    if (result.obj.newsCenterFinance === 1) {
                        $('.coupon-msg').addClass('has-msg');
                    } else {
                        $('.coupon-msg').removeClass('has-msg');
                    }
                    if (result.obj.newsCenterLogistics === 1) {
                        $('.logistic-msg').addClass('has-msg');
                    } else {
                        $('.logistic-msg').removeClass('has-msg');
                    }
                } else {
                    tip.show(result.errMsg || '未知错误');
                }
            });
        },
        getNewsList: function () {
            $.ajax({
                url: gConfig.PROJECT_USER+'/api/messageCenter/initMessagePage',
                type: 'get',
                dataType: 'json',
                headers: {'A-CID': gConfig.ACID},
                success: function (result) {
                    if (result && result.code === 1000) {
                        this._getNewListCall(result);
                    }else{
                        tip.show(result.desc);
                    }
                }.bind(this)
            });
//            $.get(this.cgi.action, {
//                '_': +new Date()
//            }, this.proxy(this._getNewListCall));
            this.loading.show();
        },
        _getNewListCall: function (result) {
            if (result && result.code === 1000) {
                this._render(result.data);
            } else {
                tip.show(result.errMsg);
                this.loading.html();
            }
        },
        _render: function (list) {
            if (list && list.length > 0) {
                this.elNewsList.html(this.sodaTmpl(this.sodaTpl.newsList, { newsList: list, udesk: udesk }));
                this.loading.hide();
                // $('.j-news-item').click(function () {
                //     if ($(this).attr('_title') === '客户反馈') {
                //         $('.code').removeClass('hide');
                //         $('.list').addClass('hide');
                //         history.pushState({ name: 'weixinCode' }, '');
                //     }
                // })
            } else {
                this.loading.html();
            }
        }
    });

    tip = new Base.Widget.Tip();

    new News({
        el: '.j_container'
    });

})();