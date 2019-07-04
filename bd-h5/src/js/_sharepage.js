import Vue from 'vue'
import ajaxloading from '../components/ajaxloading.vue'
import wxTool from '../common/wx.tool'
import cookie from '../common/cookie'

Vue.use(require('vue-resource'));
Vue.component("ajaxloading", ajaxloading);
Vue.http.options.emulateJSON = true;

Vue.filter('proItemUrl', function (value, isSharePage) {
    if (isSharePage) {
        return '/item.html#id-' + value;
    } else {
        return `/item.html?appJson={"type":304,"obj":{"pid":"${value}"}}&hide_btns=1#id-${value}`;
    }
});
Vue.filter('editUrlFilter', function (value) {
    return '/rebate/share_found.html#!/' + value;
});

Vue.filter('coverPrice', function (s) {
    if (isNaN(s)) {
        return "";
    }

    return +s > 99 ?
        String(s).replace(/(\d+)(\d{2})$/, '$1.$2') :
        +s > 9 ?
            '0.' + s :
            '0.0' + s;
});
var _format = function (date, fmt) { //author: meizz
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
Vue.filter("formatTime", function (date, fmt) {
    if (Object.prototype.toString.call(date) !== "[object Date]") {
        if (Object.prototype.toString.call(date) === "[object String]") {
            date = new Date(date.replace(/-/g, '/'))
        } else {
            date = new Date(date)
        }
    }
    return _format(date, fmt);
});
Vue.filter("decodeURIComponent", function (value) {
    try {
        return decodeURIComponent(value);
    } catch (e) {
        return value
    }
});
Vue.filter('toFixed', (v, n = 2) => {
    if (typeof v !== 'number') {
        return v
    }
    return v.toFixed(2)
})
Vue.component("slide-left-btns", require('../components/slide.left.btns.vue'));

new Vue({
    el: 'body',
    data: {
        newEid: 0,
        coinNum: 0,
        succLayer: false,
        isInApp: true,
        isSharePage: false,
        showWxTips: false,
        pageParams: {
            t_id: '',
            eid: '',
            g_chan: '',
        },
        text: "",
        imgUrl: "",
        fields: [],
        found: {},
        otherList: [],
        otherGChan: 0,
        isZan: false,
        likeNums: 0,
        likeEssay: 0,
        uin: cookie.get('USER_UIN'),
    },
    components: {
        ajaxloading,
    },
    computed: {
        shareDesc(){
            return JSON.stringify(this.fields)
        },
        isOwner(){
            return this.uin === this.found.uin
        },
    },
    methods: {
        golist(){
            location.href = "rebate/myrebate.html?lt=atc";
        },
        goOtherArticle(item){
            var appJson = {
                type: 531,
                obj: {
                    isOwner: this.isOwner,
                    eid: item.eid,
                    can_quote: item.canQuote,
                    g_chan: this.found.uin,
                }
            }
            location.href = `/sharepage.html?appJson=${JSON.stringify(appJson)}&g_chan=${this.g_chan}&id=E_${item.eid}&head=no`
        },
        // 查看清单 区分自己的和别人的
        goOtherMore(){
            var appJson = {
                type: 540,
                obj: {
                    isOwner: this.isOwner,
                    eid: this.found.eid,
                    g_chan: this.found.uin,
                }
            }
            if (this.isOwner) {
                location.href = `/rebate/account.html?appJson=${JSON.stringify(appJson)}#!/share-list/${this.found.eid}`
            } else {
                location.href = `/rebate/account.html?appJson=${JSON.stringify(appJson)}&g_chan=${this.found.uin}#!/share-list/${this.found.eid}`
            }

        },
        quote(){
            this.$http.get(gConfig.PROJECT_REBATE + '/api/essay/quoteEssay', {
                eid: this.pageParams.eid,
            }).success(({ data, code }) => {
                if (code !== 1000) return
                // 已经引用过
                if (data.isQuote === 'Y') {
                    var tip = new Base.Widget.Tip();
                    tip.show('您已引用过该文案')
                } else if (data.isQuote === 'N') {
                    this.newEid = data.eid;
                    this.coinNum = data.coinNum;
                    (data.g_chan) && $('.-mob-share-ui').attr('data-gchan', data.g_chan);
                    this.succLayer = true;
                }
            });
        },
        edit(){
            window.location.href = '/rebate/share_found.html#!/' + this.pageParams.eid;
        },
        closeWxTips(){
            this.showWxTips = false;
        },
        zan(){
            if (this.isZan) {//如果当前用户已经点赞了，再次点击无效
                return false;
            } else {
                this.$http.get(gConfig.PROJECT_REBATE + '/api/essay/likeEssay', {
                    eid: this.pageParams.eid
                }).then(({ data:{code, data} }) => {
                    if (code === 1000) {
                        this.isZan = true;//点赞成功
                        this.likeEssay = this.likeEssay + 1;
                    }
                });
            }
        },
    },
    ready() {
        this.isInApp = !!Base.cookie(gConfig.appCookieKey);
        this.g_chan = Base.url.param("g_chan")
        if (this.g_chan) {
            this.isSharePage = true;
        }
        var t_id = this.pageParams.t_id = Base.url.param('t_id') || Base.url.param('id') || '';
        var g_chan = this.pageParams.g_chan = Base.url.param('g_chan') || '';
        var eid = this.pageParams.eid = this.pageParams.t_id.replace('E_', '');

        /*发现其他文案*/
        this.$http.get(gConfig.PROJECT_REBATE + '/api/essay/otherEssay', {
            eid,
        }).then(({ data:{code, data} }) => {
                if (code === 1000) {
                    this.otherList = data.list
                }
            }
        )
        return this.$http.get(gConfig.PROJECT_REBATE + '/api/essay/viewEssay', {
            eid,
            t_id,
            g_chan
        }).then(({ data :{ data } }) => {
            if (!data) {
                alert("没有找到该文案");
                location.replace('/')
                return;
            }

            this.text = data.title;
            this.imgUrl = data.titleImg;
            this.likeEssay = data.likeEssay;
            this.fields = data.content ? JSON.parse(data.content.replace(/\\r|\\n|\r|\n/g, "\\n")) : '';
            this.found = data;
            (data.g_chan) && $('.-mob-share-ui').attr('data-gchan', data.g_chan);
            var proIndex = 1;
            this.fields.forEach(function (item) {
                if (item.type == "product") {
                    item.proIndex = proIndex++;
                }
            });

            var link = window.location.href;
            if (t_id && g_chan) {
                link = window.location.origin + '/sharepage.html?t_id=E_' + eid + '&g_chan=' + g_chan;
            }
            var config = {
                'title': data.title,
                'imgUrl': data.titleImg || gConfig.shareImg,
                'desc': '我在' + gConfig.siteNameZH + '发现的这篇文章实在太给力了，没理由不分享！',
                'link': link
            };
            wxTool.setShare(config)
//            new Base.Widget.WXShare({ config: config });

            if (!!Base.url.param('wxtips')) {
                this.showWxTips = true;
            }
        });


    }
});
