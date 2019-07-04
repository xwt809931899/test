/**
 * user accountlist
 */
(function ($) {

    var AccountList = Base.klass.create({
        elements: {
            '.j-list': 'elList'
        },
        tpl: {
            item: '<li>\
					<a href="<%=editlink%>">\
						<div class="account-info">\
							<span class="icon">\
								<img src="<%=cardTypeImg%>">\
							</span>\
							<span class="info">\
								<strong><%=trueName%></strong>\
								<p><%=bankName%></p>\
							</span>\
						</div>\
						<div class="account-num"><%=card%></div>\
					</a>\
				</li>'
        },
        cgi: {
            data: gConfig.PROJECT_REBATE+'/api/rebateuser/userCash'
        },
        init: function () {
            this.cardType = null;

            this.getData();
        },
        getData: function () {
            var params;

            params = {
                op: 3,
                _: new Date - 0
            }

            // $.get(this.cgi.data, params, this.proxy(this.getDataBack));
            $.ajax({
                url: gConfig.PROJECT_REBATE+'/api/rebateuser/userCash',
                type: 'get',
                headers: { 'A-CID': gConfig.ACID },
                success: function (result) {
                    if (result && result.code === 1000) {
                        this.getDataBack(result);
                    }
                }.bind(this)
            });
        },
        getDataBack: function (result) {
            var o, $list;
            o = result.data;
            $list = this.elList;
            $list.append(this.tmpl(this.tpl.item, $.extend(o, {
                editlink: function (boundType) {
                    switch (boundType) {
                        case 'BANK':
                            return 'user_bindbank.html?act=edit';
                        case 'ALIPAY':
                            return 'user_bindzfb.html?act=edit';
                        case 'WX':
                            return 'user_bindwx.html?act=edit';
                        default:
                            return 'user_bindaccount.html';
                    }
                }(o.boundType),
                cardTypeImg: function (boundType) {
                    switch (boundType) {
                        case 'BANK':
                            return '../img/app2/ic_bank_yl.png';
                        case 'ALIPAY':
                            return '../img/app2/ic_bank_zfb.png';
                        case 'WX':
                            return '../img/app2/ic_bank_wx.png';
                    }
                }(o.boundType),
                trueName: function (trueName) {
                    return trueName.replace(/\w/g, function (j, k, x) {
                        return k > 0 ? '*' : j;
                    });
                }(o.userName),
                card: function (card) {
                    return card.replace(/\w/g, function (j, k, x) {
                        return k > 3 && k < x.length - 3 ? '*' : j;
                    });
                }(o.account)
            })));
        }
    });

    new AccountList();

})(window.Zepto);