/**
 * user
 */
(function ($) {

    var User = Base.klass.create({
        elements: {
            '.j-img-face': 'elFace',
            '.j-text-account': 'elAccount',
            '.j-text-amount': 'elAmount',
            '.j-text-bank': 'elBank',
            '.j-text-coin': 'elCoin',
            '.j-login-show': 'elLoginShow',
            '.j-login-btn': 'elLoginBtn'
        },
        events: {
            'click .j-act-withdrawals': 'clickWithdrawals',
            'click .j-act-logout': 'logOut'
        },
        cgi: {
            userInfo: gConfig.PROJECT_REBATE + '/api/rebateuser/userCenter'
        },
        init: function () {
            this.isBindCard = false; // 默认未绑定银行

            this.getUserInfo();
        },
        clickWithdrawals: function () {
            window.location.href = this.resultData.cashType === '未绑定' ? 'user_bindaccount.html' : 'user_accountlist.html';
        },
        getUserInfo: function () {
            var params;

            params = {
                _: new Date - 0
            }

            // $.get(this.cgi.userInfo, params, this.proxy(this.getUserInfoBack));
            $.ajax({
                url: gConfig.PROJECT_REBATE + '/api/rebateuser/userCenter',
                type: 'get',
                headers: { 'A-CID': gConfig.ACID },
                data: { _t: Date.now() },
                success: function (result) {
                    if (result && result.code === 1000) {
                        this.getUserInfoBack(result);
                    } else {
                        alert(result.desc);
                    }
                }.bind(this)
            });
        },
        resultData: null,
        getUserInfoBack: function (result) {
            var o, headImg;
            o = result.data;
            this.resultData = o;
            /* if (o.utype && o.utype != -1) {
             this.elLoginShow.removeClass('hide');
             this.elLoginBtn.remove();//登录了，隐藏注册登录按钮
             this.elAccount.text(o.nickname);
             } else {//没有登录，显示注册登录按钮

             this.elLoginBtn.removeClass('hide');
             }*/
            this.elAccount.text(o.nickName);
            headImg = o.headImg ? o.headImg : '/img/rebate/ic_avatar_default.png';
            this.elFace.attr('src', headImg);
            this.elAmount.text('￥' + o.usableMoney);
            this.elBank.text(o.cashType ? o.cashType : '未绑定');
            this.elCoin.text(o.coin);
            this.isBindCard = !!o.cashType;
        },
        logOut: function () {
            Base.cookie('sid', null);
            window.location.href = '/';
        }
    });

    new User();

    new Base.Widget.RebaetBottomBar();

})(window.Zepto);