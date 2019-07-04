/**
 * userinfoedit.js
 */
(function ($) {
    var tip;

    var Tools = {
        trim: function (str) {
            return String(str).replace(/^\s*|\s*$/g, '');
        },
        isEmpty: function (str) {
            return this.trim(str) === '';
        },
        isPassword: function (str) {
            return /^[a-zA-Z0-9]{6,16}$/.test(str);
        },
        isEmail: function (str) {
            return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(str);
        },
        isMobile: function (str) {
            return /^((13[0-9])|(1[478][0-9])|(15[^4\D]))\d{8}$/.test(str);
        },
        isHKMobile: function (str) {
            return /^[0-9]{8}$/.test(str);
        },
        isCode: function (str) {
            return /^[0-9]{6}$/.test(str);
        },
        isDate: function (str) {
            // 匹配 YYYY-MM-DD 或 YYYY/MM/DD
            return /^(\d{4})(\-|\/)(\d{2})(\-|\/)(\d{2})$/.test(str);
        }
    };

    // 获取用户信息
    var Userinfoedit = Base.klass.create({
        elements: {
            '.j-user-avater': 'elUserAvater',
            '.j-changeimg-ipt': 'elChangeImgIpt',
            '.j-nickName': 'elNickName',
            '.j-sex': 'elSex',
            '.j-birthday': 'elBirthday',
            '.j-constellatory': 'elConstellatory',
            '.j-constellatory-txt': 'elConstellatoryTxt',
            '.j-email': 'elEmail',
            '.j-phone': 'elPhone',
            '.j-remark': 'elRemark'
        },
        events: {
            'click .j-changeimg-btn': 'addNewImg',
            'change .j-changeimg-ipt': 'changeImg',
            'change .j-birthday': 'chkBirthday',
            'change .j-email': 'chkEmail',
            'change .j-phone': 'chkPhone',
            'change .j-remark': 'chkRemark',
            'click .j-confirm': 'confirm',
            'click .j-nickName': 'chkNickName',
        },
        cgi: {
            // 获取用户信息
            getuserinfo: gConfig.PROJECT_USER+'/api/users/getUsersInfo',
            // 更新用户信息
            updateuserinfo: gConfig.PROJECT_USER+'/api/users/updateUserBaseInfo',
            // 更新用户头像
            changeavater: '/api/user/changeheadimg.jsp'
        },
        pageParams: {
            op: 1
        },
        init: function () {
            this.getUserInfo();
        },
        getUserInfo: function () {
            $.ajax({
                url: this.cgi.getuserinfo,
                type: 'get',
                headers: { 'A-CID': gConfig.ACID },
                success: function (result) {
                    if (result && result.code === 1000) {
                        this.render(result.data);
                    }
                }.bind(this)
            });
        },
        render: function (o) {
            var headImgUrl = $.trim(o.headImgUrl);
            headImgUrl = headImgUrl || '/img/user/ic_avatar_default.png';
            this.elUserAvater.attr('src', headImgUrl);
            this.elNickName.val(o.nickName);
            this.elSex.val(o.sex);
            if (o.birthday) {
                this.elBirthday.val(o.birthday);
            }
            this.elConstellatory.val(o.constellatory || '摩羯座');
            if (o.constellatory) {
                this.elConstellatoryTxt.text(o.constellatory);
            }
            this.elEmail.val(o.email);
            this.elPhone.val(o.phone);
            if (o.isSpecialUser) {
                this.elRemark.val(o.remark);
                $('.desc-wrap').removeClass('hide');
            }
        },
        confirm: function () {
            var self = this,
                can = true,
                $form;

            if (this.isSubmit) return;

            can = can && this.chkBirthday();

            can = can && this.chkEmail();
            can = can && this.chkNickName();
            // can = can && this.chkPhone();

//            can = can && this.chkPhone();
//            can = can && this.chkRemark();

            if (can) {
                $form = this.el.find('form.txtInfo');

                $.ajax({
                    type: 'get',
                    url: this.cgi.updateuserinfo,
                    headers: { 'A-CID': gConfig.ACID },
                    data: $form.serialize(),
                    success: this.proxy(this.confirmBack),
                    error: function () {
                        self.isSubmit = false;
                    }
                });

                this.isSubmit = true;
            }
        },
        confirmBack: function (result) {

            if (result && result.code === 1000 && result.data && result.data.result) {
                tip.show('更新个人信息成功');
                this.getUserInfo();
            } else {
                var errMsg = result.desc || '更新个人信息失败';
                tip.show(errMsg);
            }

            this.isSubmit = false;
        },
        setConstellatory: function () {
            var bDate = this.elBirthday.val();
            var bDateArr = bDate.split('-');
            if (bDateArr.length !== 3) return;
            var bMonth = bDateArr[1];
            var bDay = bDateArr[2];
            var con = this.getConstellatory(bMonth, bDay);
            this.elConstellatory.val(con);
            this.elConstellatoryTxt.text(con);
        },
        getConstellatory: function (v_month, v_day) {
            v_month = parseInt(v_month, 10);
            v_day = parseInt(v_day, 10);
            if ((v_month == 12 && v_day >= 22) || (v_month == 1 && v_day <= 20)) {
                return "摩羯座";
            } else if ((v_month == 1 && v_day >= 21) || (v_month == 2 && v_day <= 19)) {
                return "水瓶座";
            } else if ((v_month == 2 && v_day >= 20) || (v_month == 3 && v_day <= 20)) {
                return "双鱼座";
            } else if ((v_month == 3 && v_day >= 21) || (v_month == 4 && v_day <= 20)) {
                return "白羊座";
            } else if ((v_month == 4 && v_day >= 21) || (v_month == 5 && v_day <= 21)) {
                return "金牛座";
            } else if ((v_month == 5 && v_day >= 22) || (v_month == 6 && v_day <= 21)) {
                return "双子座";
            } else if ((v_month == 6 && v_day >= 22) || (v_month == 7 && v_day <= 22)) {
                return "巨蟹座";
            } else if ((v_month == 7 && v_day >= 23) || (v_month == 8 && v_day <= 23)) {
                return "狮子座";
            } else if ((v_month == 8 && v_day >= 24) || (v_month == 9 && v_day <= 23)) {
                return "处女座";
            } else if ((v_month == 9 && v_day >= 24) || (v_month == 10 && v_day <= 23)) {
                return "天秤座";
            } else if ((v_month == 10 && v_day >= 24) || (v_month == 11 && v_day <= 22)) {
                return "天蝎座";
            } else if ((v_month == 11 && v_day >= 23) || (v_month == 12 && v_day <= 21)) {
                return "射手座";
            }
            return "";
        },
        chkRemark: function () {
            var $e = this.elRemark,
                val = Tools.trim($e.val()),
                err;

            $e.val(val);
            if (Tools.isEmpty(val)) {
                err = '描述不能为空';
            }
            if (err) {
                this.showErr(err);
                return false;
            } else {
                this.setConstellatory();
                return true;
            }
        },
        chkBirthday: function () {
            var $e = this.elBirthday,
                val = Tools.trim($e.val()),
                err;

            $e.val(val);
            if (Tools.isEmpty(val)) {
                // err = '请输入生日日期';
            } else if (!Tools.isDate(val)) {
                err = '请输入正确日期格式，如1990-01-01';
            }
            if (err) {
                this.showErr(err);
                return false;
            } else {
                this.setConstellatory();
                return true;
            }
        },
        chkEmail: function () {
            var $e = this.elEmail,
                val = Tools.trim($e.val()),
                err;

            $e.val(val);

            if (Tools.isEmpty(val)) {
                // err = '请输入邮箱';
            } else if (!Tools.isEmail(val)) {
                err = '请输入正确邮箱格式。';
            }
            if (err) {
                this.showErr(err);
                return false;
            } else {
                return true;
            }
        },
        chkPhone: function () {
            var $e = this.elPhone,
                val = Tools.trim($e.val()),
                err;

            $e.val(val);

            if (Tools.isEmpty(val)) {
                // err = '请输入手机号';
            } else if (!Tools.isMobile(val)) {
                err = '请输入正确手机号格式。';
            }
            if (err) {
                this.showErr(err);
                return false;
            } else {
                return true;
            }
        },
        chkNickName: function () {
            var $e = this.elNickName,
                val = Tools.trim($e.val());

            if (val.length > 20) {
                this.showErr('昵称不能超过20个字符');
                return false;
            } else {
                return true;
            }
        },
        showErr: function (s) {
            tip.show(s);
        },
        addNewImg: function () {
            this.elChangeImgIpt.trigger('click');
        },
        // 刷新头像图片
        renderHeadImg: function (src) {
            var headImgUrl = $.trim(src);
            headImgUrl = headImgUrl || '/img/app2/userDefaultAvater.png';
            this.elUserAvater.attr('src', headImgUrl);
        },
        updateHeaderImg: function (imgUrl, dataUrl) {
            var self = this;
            $.ajax({
                type: 'get',
                url: gConfig.PROJECT_USER+'/api/users/changeheadimg',
                data: { headImgUrl: imgUrl },
                // dataType: "json",
                success: function (result) {
                    if (result && result.code === 1000) {
                        tip.show('更新头像成功');
                        self.renderHeadImg(imgUrl);
                    } else {
                        var errMsg = result.desc || '更新头像失败';
                        tip.show(errMsg);
                    }
                    self.isSubmit = false;
                }
            })
        },
        // 更改头像图片
        changeImg: function () {
            var self = this;
            if (self.isSubmit) return;
            if (typeof FileReader == "undefined") {
                tip.show("你的浏览器不支持上传图片，请下载新版浏览器");
                return;
            }

            var file = self.elChangeImgIpt[0].files[0];

            if (file.type.match(/image.*/)) {

                var reader = new FileReader();
                reader.onload = function (readerEvent) {
                    var image = new Image();
                    image.onload = function (imageEvent) {

                        var canvas = document.createElement('canvas'),
                            max_size = 100,
                            width = image.width,
                            height = image.height;
                        // 按比例缩放
                        if (width > height) {
                            if (width > max_size) {
                                height *= max_size / width;
                                width = max_size;
                            }
                        } else {
                            if (height > max_size) {
                                width *= max_size / height;
                                height = max_size;
                            }
                        }
                        canvas.width = width;
                        canvas.height = height;
                        canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                        var dataUrl = canvas.toDataURL();
//                        var idx = dataUrl.indexOf(',');
//                        dataUrl = dataUrl.substring(idx + 1);
                        self.isSubmit = true;
                        $.ajax({
                            type: 'post',
                            url: gConfig.PROJECT_USER+'/api/imgUpload/upload',
                            data: { imgFile: dataUrl },
                            // dataType: "json",
                            success: function (result) {
                                self.updateHeaderImg(result.data.imgUrl);
                            },
                            error: function () {
                                self.isSubmit = false;
                            }
                        });
                    };
                    image.src = readerEvent.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                tip.show("请选择图片格式文件");
            }
        }
    });

    tip = new Base.Widget.Tip();

    new Userinfoedit({
        el: '.j-userinfoedit-container'
    });

    // Base.url.coverFrom();

})(window.Zepto);