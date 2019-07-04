(function () {
    var tip,
        msg = {
            feedback: '提交成功！感谢您的反馈！',
            back: '预约成功！请您在预约时间附近保持手机畅通'
        },
        feedbackId;

    var BackForm = Base.klass.create({
        elements: {
            '[name=oppointement]': 'elInputOppointement',
            '.j_submit': 'elSubmit'
        },
        events: {
            'submit': '_submit'
        },
        cgi: {
            changeData: gConfig.PROJECT_USER+'/api/feedback/makeAppointmentTime'
        },
        init: function () {
            window.location.href = '/contact.html';
            this.el.removeClass("hide");
            this.elSubmit[0].disabled = false;

//            this.setCurrentTime();
        },
        setCurrentTime: function () {
            this.elInputOppointement.val(this.formatTime(+new Date(), 'yyyy-MM-dd'));
        },
        check: function () {
            return /^(\d{4})(\-|\/)(\d{2})(\-|\/)(\d{2})$/.test(this.elInputOppointement.val());
        },
        _submit: function (event) {
            event.preventDefault();
            if (this.check()) {
                $.post(this.cgi.changeData, {
                    feedbackId: feedbackId,
                    appointmentTime: this.elInputOppointement.val()
                }, this.proxy(this._save));
            } else {
                tip.show("请输入正确日期格式，如1990-01-01");
            }
        },
        _save: function (result) {
            var o;
            if (result && result.code === 1000) {
                this.el.addClass("hide");
                this.showSuccess();
            } else {
                tip.show(result.errMsg);
            }
        },
        showSuccess: function () {
            var $msgWrap = $('#j_msgWrap');
            this.el.addClass("hide");
            $msgWrap.find('p').html(msg.back);
            $msgWrap.removeClass("hide");
        }
    });

    var FeedbackForm = Base.klass.create({
        elements: {
            '[name=phone]': 'elInputPhone',
            '.j_selectScene': 'elInputScene',
            '[name=content]': 'elInputContent'
        },
        cgi: {
            saveDate: '/api/customer/customerHandler.jsp?op=1'
        },
        events: {
            'submit': '_submit'
        },
        init: function () {
            window.location.href = '/contact.html';
            Base.App.checkApp();
        },
        checkContent: function () {
            var reBool = true;
            if (this.elInputContent.val() === '') {
                reBool = false;
                tip.show('请输入具体问题描述');
                this.elInputContent[0].focus();
            }
            return reBool;
        },
        checkCheckBox: function () {
            var reBool = true;
            if (!this.elInputScene.filter(":checked").length > 0) {
                reBool = false;
                tip.show('请至少选择一个问题场景');
            }
            return reBool;
        },
        checkPhone: function () {
            var reBool = true;
            if (!/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(14[5-7]{1})|(18[0-9]{1}))+\d{8})$/.test(this.elInputPhone.val())) {
                reBool = false;
                tip.show('请输入正确的手机号码');
                this.elInputPhone[0].focus();
            }
            return reBool;
        },
        check: function () {
            return this.checkPhone() && this.checkCheckBox() && this.checkContent();
        },
        _submit: function (event) {
            event.preventDefault();
            var els = [].slice.call(document.querySelectorAll('[name="scene"]'), 0)
            var sences = []
            els.forEach(function (el) {
                if (el.checked) {
                    sences.push(el.value)
                }
            })
            var params = {
                phone: this.elInputPhone.val(),
                sences: sences.join(','),
                content: this.elInputContent.val()
            }
            if (this.check()) {
                $.ajax({
                    url: gConfig.PROJECT_USER+'/api/feedback/saveUserFeedBack',
                    type: 'get',
                    data: params,
                    headers: { 'A-CID': gConfig.ACID },
                    success: this.proxy(this._save)
                });
//                $.post(this.cgi.saveDate,this.el.serialize(),this.proxy(this._save));
            }
        },
        _save: function (result) {
            var o;
            if (result && result.code === 1000) {
                o = result.data;
                this.el.addClass("hide");
                feedbackId = o.feedbackId;
                if (o.isLuck === 'Y') {
                    this.showBackForm()
                } else {
                    this.showSuccess();
                }
            } else {
                tip.show(result.desc);
            }
        },
        showSuccess: function () {
            var $msgWrap = $("#j_msgWrap");
            $msgWrap.find('p').html(msg.feedback);
            $msgWrap.removeClass("hide");
        },
        showBackForm: function () {
            new BackForm({
                el: '#j_backForm'
            });
        }
    });

    tip = new Base.Widget.Tip();

    new FeedbackForm({
        el: '#j_feedbackForm'
    });
})();
