/**
 * user
 */
(function ($) {

    var User = Base.klass.create({
        events: {
            'click .j-act-logout': 'logOut'
        },
        logOut: function () {
            $.ajax({
                url: gConfig.PROJECT_USER+'/api/users/exitLogin',
                type: 'get',
                headers: {'A-CID': gConfig.ACID},
            });
            Base.cookie('sid', { expires: -1 });
            Base.cookie('USER_UIN', '', { expires: -1 });
            window.location.href = '/';
        }
    });
    new User();
})(window.Zepto);