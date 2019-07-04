/**
 * user
 */
(function ($) {

    var Setting = Base.klass.create({
        events: {
            'click .j-act-logout': 'logOut'
        },
        logOut: function () { //退出登录，清除cookie
            $.ajax({
                url: gConfig.PROJECT_USER+'/api/users/exitLogin',
                type: 'get',
                headers: {'A-CID': gConfig.ACID},
            });
            Base.cookie('sid', '', { expires: -1 });
            Base.cookie('USER_UIN', '', { expires: -1 });
            window.location.href = '/';
        }
    });

    var setting = new Setting({
        el: '.lg-btn-wrap'
    });

    /*var isWeixin = Base.Browser.type === 'weixin';

     if(isWeixin){
     $('.j-retrievepassword').addClass('hide');
     }*/

})(window.Zepto);