/**
 * rebate/income.js
 */
(function ($) {
    var addParam = function (url, param, value) {
        var a = document.createElement('a'), regex = /(?:\?|&amp;|&)+([^=]+)(?:=([^&]*))*/gi;
        var params = {}, match, str = [];
        a.href = url;
        while (match = regex.exec(a.search))
            if (encodeURIComponent(param) != match[1])
                str.push(match[1] + (match[2] ? "=" + match[2] : ""));
        str.push(encodeURIComponent(param) + (value ? "=" + encodeURIComponent(value) : ""));
        a.search = str.join("&");
        return a.href;
    }

    var formatTime = function (time, F) {
        var date = new Date(time),
            F = F || 'yyyy-M-d H:m:s';

        return F.replace(/\b[ymMdHs]+\b/g, function (i) {
            switch (i) {
                case 'yyyy':
                    return date.getFullYear();
                case 'yy':
                    return String(date.getFullYear()).slice(2);
                    break;
                case 'M':
                    return date.getMonth() + 1;
                case 'MM':
                    return date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
                case 'd':
                    return date.getDate();
                case 'dd':
                    return date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                case 'HH':
                case 'H':
                    return date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
                case 'mm':
                case 'm':
                    return date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
                case 'ss':
                case 's':
                    return date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            }
        });
    }
    /*把字符串格式的时间转为时间戳*/
    var converDate = function (str) {
        return new Date(str).getTime()
    }
    /*   banner  返利头条  限时高返   塔客基础数据  */
    var vm = new Vue({
        el: 'body',
        data: {
            list: [],
            curTime: Date.now(),
            /* 时间戳转一年中的天数，和当年的总天数*/
            monthData: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            takeHeadline: null

        },
        methods: {
            /*把字符串格式的时间转为时间戳*/
            converDate: function (str) {
                return new Date(str).getTime()
            },
            /*  获取开始时间*/
            getStartDays: function (currentTimestamp, beginTime, endTime) {
                var cDaysObj = this.getNowNumberDays(currentTimestamp),
                    bDaysObj = this.getCurrentNumberDays(beginTime),
                    reText = '';
                if (beginTime < currentTimestamp) {
                    // 已开始
                    reText = '00:00:00';
                } else {
                    // 未开始

                    // 如果跨年 天数会小于 0
                    if (bDaysObj.curDay - cDaysObj.curDay < 0) {
                        bDaysObj.curDay += cDaysObj.totalDays;
                    }
                    switch (bDaysObj.curDay - cDaysObj.curDay) {
                        case 0:
                            // 倒计时
                            // reText = '00:00:00';
                            reText = formatTime(beginTime, 'H:m') + '开始';
                            break;
                        case 1:
                            // 明天
                            reText = '明天' + formatTime(beginTime, 'H:m') + '开始';
                            // console.log(reText);
                            break;
                        case 2:
                            // 后天
                            reText = '后天' + formatTime(beginTime, 'H:m') + '开始';
                            break;

                        default :
                            reText = formatTime(beginTime, 'M月d日') + '开始';
                            break;
                    }
                }
                // console.log(reText);
                return reText;
            },
            /*   简单缓存当前时间的天数当年的总天数*/
            getNowNumberDays: function (t) {
                if (this.nowNumberDay == undefined) {
                    this.nowNumberDay = this.getCurrentNumberDays(t)
                }
                return this.nowNumberDay;
            },
            getCurrentNumberDays: function (timestamp) {
                var date = new Date(timestamp),
                    day = date.getDate(),
                    month = date.getMonth(),
                    year = date.getFullYear(),
                    curDay = 0,
                    totalDays = 365;
                for (var i = 0; i < month; i++) {
                    curDay += this.monthData[i];
                }
                curDay += day;

                // 闰年
                if (month > 1 && (year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                    curDay += 1;
                    totalDays += 1;
                }
                return {
                    curDay: curDay,
                    totalDays: totalDays
                }
            },

        },
        filters: {
            /*倒计时过滤器*/
            'countdown': (function () {
                function fix(i) {
                    return i < 10 ? '0' + i : i;
                }

                return function (time, curTime, fmt, noDay) {
                    if (fmt === void 0) {
                        fmt = 'hh:mm:ss';
                    }
                    if (noDay === void 0) {
                        noDay = false;
                    }
                    time = new Date(time).getTime()
                    if (time < curTime)
                        return '结束时间小于当前时间';
                    var remain = (time - curTime) / 1000, h = parseInt(remain / 3600), m = parseInt(remain / 60 % 60), s = parseInt(remain % 60), day = 0;
                    if (!noDay && h >= 24) {
                        day = parseInt(h / 24);
                        h = h % 24;
                    }
                    var fmtData = {
                        dd: fix(day),
                        hh: fix(h),
                        mm: fix(m),
                        ss: fix(s),
                    };
                    var r = fmt;
                    for (var k in fmtData) {
                        r = r.replace(new RegExp(k, 'g'), fmtData[k]);
                    }
                    return r;
                };
            })(),
            'addParams': function (v, key) {
                var vals = [].slice.call(arguments, 2)
                return addParam(v, key, vals.join(''))
            },
        },
        ready: function () {
            /*定时器获取当前时间*/
            setInterval(function () {
                vm.curTime = Date.now()
            }, 1000)
            $.ajax({
                url: gConfig.PROJECT_REBATE + '/api/homePage/home',
                type: 'get',
                headers: { 'A-CID': gConfig.ACID },
                success: function (result) {
                    this.list = result.data
                    // 实例化轮播组件
                    this.$nextTick(function () {
                        new Swiper('.j-slider-container', {
                            autoplay: 2000,
                            autoplayDisableOnInteraction: false,
                            loop: true,
                            calculateHeight: true,
                            pagination: '.dotted'
                        });
                    })
                    /* 返利头条*/
                    var index = 0;
                    /* 初始化显示第一位*/
                    this.takeHeadline = this.list.takeHeadlineList[0]
                    setInterval(function () {
                        if (index === this.list.takeHeadlineList.length - 1) {
                            /* 到list最后一位，再从头开始*/
                            index = 0
                        } else {
                            this.takeHeadline = this.list.takeHeadlineList[index]
                            index++;
                        }
                    }.bind(this), 5000);
                    for (var i = 0; i < this.list.rebateTimeLimitProductList.length; i++) {
                        this.list.rebateTimeLimitProductList[i].endTime = this.list.rebateTimeLimitProductList[i].endTime.replace(/-/g, "/");
                        this.list.rebateTimeLimitProductList[i].startTime = this.list.rebateTimeLimitProductList[i].startTime.replace(/-/g, "/");
                    }
                }.bind(this)
            });
        }
    })


    var action, hashManager, sliderAction, commission, heightRate;
    var FINEID = '-200';
    var HRETURNID = 2147483646;  //高返分类ID
    var g_def_fid = FINEID;
    var createList = [];
    var dataCache = {}; //数据缓存
    // 获取返利首页商品列表
    var Action = Base.klass.create({
        tpl: {
            pdt: '<li>\
					<div class="item-wrap">\
						<a href="/rebate/item.html#id-<%=itemCode%>" pprd="21001.6.<%=index%>">\
							<div class="thumbnail"><img class="img" src="<%=mainIcon%>"><%=tag%></div>\
							<div class="details">\
								<p class="title"><%=itemTitle%></p>\
								<p class="income"><i>单笔收入</i>&nbsp;&nbsp;<span>￥<%=unit_commission_fm%></span></p>\
								<p class="txt-group"><span class="price">价格：￥<%=price_fm%></span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="share hide">分享次数：<%=shareTimes%></span></p>\
							</div>\
						</a>\
						<a data-img="<%=mainIcon%>" data-title="<%=itemTitle%>" data-pid="<%=itemCode%>" class="share-btn j-share-btn" href="javascript:void(0);" data-des="<%=sellingPoint%>" data-rebate-money="<%=unit_commission_fm%>">分享</a>\
						<div class="take-say hide <%=isHideTake%>">\
							<p class="say-title">' + gConfig.rebateName + '说</p>\
							<p class="say-content"><%=sellingPoint%></p>\
						</div>\
					</div>\
				</li>'
        },
        sodaTpl: {
            categoryList: "#j-funcscript"
        },
        elements: {
            //'.j-sort-tabbar': 'elSortTabber',
            '.j-func': 'elFunc',
            '.j-action-list': 'elActionList'
        },
        events: {
            'click .j-sel-category': 'selCategory',
            'click .j-sel-func': 'selFunc',
            // 'click .j-sort-tab': 'switchTab'
        },
        cgi: {
            action: gConfig.PROJECT_REBATE + '/api/product/getList',
            categoryList: gConfig.PROJECT_REBATE + '/api/category/categListFromHome'
        },
        pageParams: {
            op: 5,
            pageSize: 20,
            sortField: "RANDOM",  //ASC，DESC，RANDOM
            categoryId: g_def_fid,
        },
        init: function () {
            this.isTotal = false;

            // liu - 去掉两种排序方式
            // this.pageParams.sortType = this.getSortID();

            this.pageParams.sortType = 3;
            this.pageParams.pageNo = Base.url.getPageHash() || 1;

            this.pager = new Base.Widget.Pager({
                el: '.j-pager'
            });

            //this.pager.bind('go', this.proxy(this.pagerGo));

            this.loading = new Base.Widget.Loading({
                owner: this.elActionList
            });

            this.loading.tpl = '<div class="j-ui-loading"><img src="../img/loading.gif" align="absmiddle"> 数据加载中，请稍等...</div>';
            this.pager.getData = this.getData.bind(this)
            this.flush();

            // $.get(this.cgi.categoryList, { style: 1 }, this.proxy(this.getCeategoryBack));
            $.ajax({
                url: gConfig.PROJECT_REBATE + '/api/category/categListFromHome',
                type: 'get',
                headers: { 'A-CID': gConfig.ACID },
                success: function (result) {
                    if (result && result.code === 1000) {
                        this.getCeategoryBack(result);
                    }
                }.bind(this)
            });

            $(document).scroll(function () {
                var stop = $("body").scrollTop();
                var etop = $(".createListWrap").offset().top;
                if (stop + 44 > etop) {

                    this.elFunc.addClass("fixed");
                } else {

                    this.elFunc.removeClass("fixed");
                }
            }.bind(this));
        },
        rebateListScrollTop: function () {
            var top = $('.j-rebate-group').offset().top - 50;
            $(window).scrollTop(top);
        },
        getCeategoryBack: function (result) {
            createList = result.data;
            this.renderCreateList();
        },
        renderCreateList: function () {
            var listHtml = this.sodaTmpl(this.sodaTpl.categoryList, {
                list: createList,
                actionId: g_def_fid
            });
            this.elFunc.html(listHtml);
        },
        flush: function () {
            this.list = []
            this.pageParams.pageNo = Base.url.getPageHash() || 1;
            this.pageParams.categoryId = g_def_fid;
            this.getData();
            this.pager.setCurrent(this.pageParams.pageNo);
            this.isTotal = false;
            // window.scrollTo(0, 0);
        },
        pagerGo: function (pageNo) {
            hashManager.setHash('pg-' + pageNo);
            this.rebateListScrollTop();
        },
        getData: function (startNum) {
            // if (this.pageParams.categoryId == HRETURNID) {
            //     this.pageParams.sortField = undefined;
            //     this.pageParams.sortType = "3"
            // } else if (this.pageParams.categoryId == FINEID) {
            //     this.pageParams.sortField = undefined;
            //     this.pageParams.sortType = "6"
            // } else {
            //     this.pageParams.sortField = "RANDOM";
            //     this.pageParams.sortType = "6"
            // }
            this.pageParams = { categId: g_def_fid, startNum: startNum || 0 };

//            this.pageParams._ = new Date() - 0;
            var key = JSON.stringify(this.pageParams);// 缓存请求数据，以请求数据做键
            if (key in dataCache) {
                this.getDataBack(dataCache[key]);//如果请求数据存在缓存中，直接通过键获取相应的接口数据
            } else {//如果请求数据不在缓存中，重新发送请求请求数据
                this.loading.show();//发送请求才出现加载
                // $.get(this.cgi.action, this.pageParams, function (result) {
                //     dataCache[key] = result; //每次发送请求都把返回的数据缓存起来
                //     this.getDataBack(result)
                // }.bind(this));
                $.ajax({
                    url: gConfig.PROJECT_REBATE + '/api/product/getList',
                    type: 'get',
                    headers: { 'A-CID': gConfig.ACID },
                    data: this.pageParams,
                    success: function (result) {
                        if (result && result.code === 1000) {
                            dataCache[key] = result; //每次发送请求都把返回的数据缓存起来
                            this.getDataBack(result)
                        }
                    }.bind(this)
                });
            }
        },
        list: [],
        getDataBack: function (result) {
            var list,
                o;

            if (result && result.code === 1000) {

                o = result.data;
                list = this.list = this.list.concat(o.list);

                if (o.g_chan) $('.-mob-share-ui').attr('data-gchan', o.g_chan);

                if (list) {
                    this.renderList(list);
                    if (!this.isTotal) {
                        this.pager.total(o.totalNum, this.pageParams.pageSize);
                        this.isTotal = true;
                    }
                } else {
                    this.renderList([]);
                    //this.loading.html('暂时没有数据');
                }

            } else {
                this.loading.html('获取数据失败。【' + result.errMsg + '】');
            }
            this.pager.complete(result, list)
        },
        // 选择分类
        selCategory: function (e) {
            g_def_fid = $(e.currentTarget).attr('data-categoryid');
            this.pager.noMore = false
            this.flush();
            // if (this.pager.currentPage === 1) {
            //     this.flush();
            // } else {
            //     this.pager.go(1)
            // }
            this.rebateListScrollTop();
            this.renderCreateList();
        },
        renderList: function (list) {
            var item = '',
                rsl_dom = '',
                itemVals;
            var self = this;
            var stab = this.pageParams.sortType;

            this.elActionList.html('');
            if (list && list.length > 0) {

                for (var i = 0, len = list.length; i < len; i++) {
                    itemVals = list[i];
                    itemVals.tag = itemVals.tags && itemVals.tags.length > 0 && itemVals.tags[0].mainIcon ? '<img class="tag" src="' + itemVals.tags[0].mainIcon + '" alt="' + itemVals.tags[0].itemTitle + '">' : '';
                    itemVals.price_fm = itemVals.salePrice.toFixed(2);
                    itemVals.unit_commission_fm = itemVals.rebateMoney.toFixed(2);
                    itemVals.title = itemVals.itemTitle;
                    itemVals.isHideTake = (itemVals.sellingPoint) == '' ? 'hide' : '';
                    itemVals.say = itemVals.sellingPoint || '暂无内容！';
                    itemVals.index = i + 1;
                    item = this.tmpl(this.tpl.pdt, itemVals);
                    rsl_dom += item;
                }
                this.elActionList.html('<ul>' + rsl_dom + '</ul>');
                this.loading.hide();
            } else {
                this.loading.show();
                this.loading.html();
            }
        },
        rebateListScrollTop: function () {
            var top = $('.j-rebate-group').offset().top;
            $(window).scrollTop(top - 50);
        }
    });

    // 获取返利首页轮播图
    var SliderAction = Base.klass.create({
        elements: {
            '.j-list': 'elList'
        },
        tpl: {
            item: '<div class="swiper-slide"><div class="item j-item"><a href="<%=actlink%>"><img src="<%=acturl3%>"></a></div></div>'
        },
        cgi: {
            action: '/api/product/getActList.jsp'
        },
        pageParams: {
            chanid: 102,
            pageNo: 1,
            pageSize: 10
        },
        doScrollTop: false,
        init: function () {
            var self = this;
            var scroll = Base.url.param('scroll') || '';

            // 如果url有scroll＝1参数，定位到商品列表
            this.doScrollTop = (scroll && scroll == 1);

            this.swiper = null;

            this.getData();

            $(window).bind('resize', function () {
                if (self.swiper) self.swiper.reInit();
            });
        },
        getData: function () {

            this.pageParams._ = new Date() - 0;

            $.get(this.cgi.action, this.pageParams, this.proxy(this.getDataBack));
        },
        getDataBack: function (result) {
            var list,
                o;

            if (result && result.errCode === 0) {
                o = result.obj;

                if ((list = o.activityList)) {
                    this.renderList(list);
                } else {
                    this.renderList([]);
                }
            } else {
                // 获取数据失败！
            }
        },
        renderList: function (list) {
            var tmpl = this.tmpl,
                tpl = this.tpl,
                $list = this.elList,
                item;

            $list.html('');

            if (list.length) {
                this.show();

                $(list).each(function (m, n) {
                    item = n;
                    $list.append(tmpl(tpl.item, $.extend(item, {
                        actlink: function (t) {
                            if (t === 0) {
                                return 'list.html?chan=' + item.actid;
                            } else if (t === 1) {
                                return item.actlink;
                            }
                        }(item.acttype)
                    })));

                });

                if (this.swiper) {
                    this.swiper.destory(true);
                }

                this.swiper = new Swiper('.j-slider-container', {
                    autoplay: 2000,
                    autoplayDisableOnInteraction: false,
                    loop: true,
                    calculateHeight: true,
                    pagination: '.dotted'
                });

                if (this.doScrollTop) setTimeout(this.rebateListScrollTop, 500);

            } else {
                this.hide();
            }
        },
        show: function () {
            this.el.show();
            if (this.swiper) this.swiper.startAutoplay();
        },
        hide: function () {
            this.el.hide();
            if (this.swiper) this.swiper.stopAutoplay();
        },
        rebateListScrollTop: function () {
            console.log("rebateListScrollTop")
            var top = $('.j-rebate-group').offset().top;
            $(window).scrollTop(top);
        }
    });

    // 获取返利首页个人信息
    var Commission = Base.klass.create({
        elements: {
            '.j-share': 'elShare',
            '.j-complete': 'elComplete',
            '.j-icome': 'elIcome'
        },
        cgi: {
            action: '/api/commission/HomeCommission.jsp'
        },
        pageParams: {},
        init: function () {

            this.getData();

        },
        getData: function () {

            this.pageParams._ = new Date() - 0;
            $.get(this.cgi.action, this.pageParams, this.proxy(this.getDataBack));

        },
        getDataBack: function (result) {
            var o;

            if (result && result.errCode === 0) {
                o = result.obj;
                this.renderList(o);
            } else {
                // 获取数据失败！
            }
        },
        renderList: function (o) {
            var shareCount = o.shareCount || 0;
            var tradeCount = o.tradeCount || 0;
            var commission = o.commission || 0;
            commission = commission.toFixed(2);
            this.elShare.text(shareCount);
            this.elComplete.text(tradeCount);
            this.elIcome.text('￥' + commission);
        }
    });
    // 获取返利头条数据
    var FirstNews = Base.klass.create({
        elements: {
            '.j-user-head': 'elUserHead',
            '.j-desc': 'elDesc',
        },
        cgi: {
            action: '/api/rebate/takeHeadline.jsp'
        },
//        pageParams: {},
        init: function () {
            this.getData();

        },
        getData: function () {
//            this.pageParams._ = new Date() - 0;
            $.get(this.cgi.action, this.proxy(this.getDataBack));
        },
        getDataBack: function (result) {
            var o;
            if (result && result.errCode === 0) {
                o = result.obj;
                this.renderList(o);
            } else {
                // 获取数据失败！
            }
        },
        renderList: function (o) {
            var firstMessage = o.list;
            var index = 1;
            headImg = o.list[0].headimgurl;
            this.elUserHead.attr('src', headImg);
            this.elDesc.text(o.list[0].content);
            setInterval(function () {
                if (index === firstMessage.length - 1) {
                    index = 0
                } else {
                    headImg = o.list[index].headimgurl;
                    this.elUserHead.attr('src', headImg);
                    this.elDesc.text(o.list[index].content);
                    index++;
                }
            }.bind(this), 5000);
        }
    });
    // 获取广告数据
    var AdverWrap = Base.klass.create({
        elements: {
            '.j-adver': 'elAdver',
        },
        events: {
            'click .j-close': 'clickClose'
        },
        cgi: {
            action: '/api/rebate/takeHeadline.jsp'
        },
        init: function () {
            $.ajax({
                url: gConfig.PROJECT_CONTENT + '/api/showNotice/rebateAdvertisement',
                type: 'get',
                headers: {'A-CID': gConfig.ACID },
                success: function (result) {
                    if (result.data && result.code === 1000) {
                        if (Date.now() > converDate(result.data.startTime) && Date.now() < converDate(result.data.endTime) && result.data.advertImg) {
                            $('.adver-wrap').removeClass('hide');
                            $('.j-adver').attr('src', result.data.advertImg);
                            $('.actUrl').attr('href', result.data.advertLink);
                            $('.actUrl').attr('alt', result.data.advertContent);
                        }
                    }
                }.bind(this)
            });
        },
        clickClose: function () {
            $('.adver-wrap').addClass('hide');
        }

    });
    // 通过changeHash事件触发分页
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

    var DialogMain = Base.klass.create({
        events: {
            'click .j-act-closer': 'clickCloser'
        },
        init: function () {
            if (Base.cookie('ISNEWREBATE')) {
                this.show();
                Base.cookie('ISNEWREBATE', null);
            }
        },
        clickCloser: function () {
            this.hide();
        },
        show: function () {
            this.el.removeClass('hide');
        },
        hide: function () {
            this.el.addClass('hide');
        }
    });

    // 首页限时高返模块
    var HeightRebate = Base.klass.create({
        ajaxRequestParams: {
            '_': new Date() - 0
        },
        tpl: '<li>\
            <div  class="display-flex">\
                <a href="/rebate/item.html?heightRebate=1#id-<%=pid%>" pprd="21001.4.<%index%>">\
                        <img src="<%=bannerurl%>" alt="<%=name%>"/>\
                </a>\
                <div class="<%=isActive%>">\
                    <div><span class="text j-time-text"><%=formatLimitTime%></span></div>\
                    <div class="title"><%=name%></div>\
                    <div class="formatCommission">赚 ￥<span class="price"><%=formatCommission%></span></div>\
                    <p class="goods-share<%=isActive%>" data-img="<%=logourl%>" data-title="<%=name%>" data-pid="<%=pid%>" data-say="<%=say%>" data-rebate-money="<%=formatHighcommission%>">\
                        <a href="javascript:;">赚￥<%=formatHighcommission%></a>\
                    </p>\
                </div>\
                <div class="<%=notBegin%>"><%=notBeginTime%></div>\
			</div>\
		</li>',

        cgi: {
            getHeightRebateListUri: '/api/product/queryHighRateProductList.jsp',
            getServiceTimestamp: '/api/common/getSystemTime.jsp'
        },
        init: function () {
            this.loading = new Base.Widget.Loading({
                owner: this.el
            });
            this.getHeightRebateData();
        },
        getHeightRebateData: function () {
            $.get(this.cgi.getHeightRebateListUri, this.ajaxRequestParams, this.proxy(this._getHeightRebateDataCall));
            this.loading.show();
        },
        _getHeightRebateDataCall: function (result) {
            if (result && result.errCode === 0) {
                // render data
                this._render(result.obj);
            } else {
                this.loading.html('获取数据失败。【' + result.errMsg + '】');
            }
        },
        getCurrentClientTimestamp: function () {
            return (new Date()).getTime();
        },

        // 获取当前时间戳 ms
        getCurrentTimestamp: function (callBack) {
            if (this.currentTimestamp == undefined) {
                var self = this,
                    curTimestamp = 0,
                    params = {
                        '_': this.getCurrentClientTimestamp()
                    };
                $.ajax({
                    async: false,
                    type: 'get',
                    dataType: 'json',
                    url: this.cgi.getServiceTimestamp,
                    data: params,
                    success: function (resule) {
                        if (resule && resule.errCode != 0) {
                            curTimestamp = resule.obj
                        } else {
                            curTimestamp = self.getCurrentClientTimestamp()
                        }
                    },
                    error: function () {
                        curTimestamp = self.getCurrentClientTimestamp()
                    }
                });
                self.currentTimestamp = curTimestamp;
            }

            callBack.call(this, this.currentTimestamp);
        },


        // 时间戳转一年中的天数，和当年的总天数
        monthData: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        getCurrentNumberDays: function (timestamp) {
            var date = new Date(timestamp),
                day = date.getDate(),
                month = date.getMonth(),
                year = date.getFullYear(),
                curDay = 0,
                totalDays = 365;
            for (var i = 0; i < month; i++) {
                curDay += this.monthData[i];
            }
            curDay += day;

            // 闰年
            if (month > 1 && (year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                curDay += 1;
                totalDays += 1;
            }
            return {
                curDay: curDay,
                totalDays: totalDays
            }
        },

        // 简单缓存当前时间的天数当年的总天数
        getNowNumberDays: function (t) {
            if (this.nowNumberDay == undefined) {
                this.nowNumberDay = this.getCurrentNumberDays(t)
            }
            return this.nowNumberDay;
        },

        // 获取开始时间
        // getStartDays: function (currentTimestamp, beginTime, endTime) {
        //     var cDaysObj = this.getNowNumberDays(currentTimestamp),
        //         bDaysObj = this.getCurrentNumberDays(beginTime),
        //         reText = '';
        //     alert()
        //     if (beginTime < currentTimestamp) {
        //         // 已开始
        //         reText = '00:00:00';
        //     } else {
        //         // 未开始
        //
        //         // 如果跨年 天数会小于 0
        //         if (bDaysObj.curDay - cDaysObj.curDay < 0) {
        //             bDaysObj.curDay += cDaysObj.totalDays;
        //         }
        //
        //         switch (bDaysObj.curDay - cDaysObj.curDay) {
        //             case 0:
        //                 // 倒计时
        //                 // reText = '00:00:00';
        //                 reText = this.formatTime(beginTime, 'H:m') + '开始';
        //                 break;
        //             case 1:
        //                 // 明天
        //                 reText = '明天' + this.formatTime(beginTime, 'H:m') + '开始';
        //                 break;
        //             case 2:
        //                 // 后天
        //                 reText = '后天' + this.formatTime(beginTime, 'H:m') + '开始';
        //                 break;
        //
        //             default :
        //                 reText = this.formatTime(beginTime, 'M月d日') + '开始';
        //                 break;
        //         }
        //     }
        //     console.log(reText);
        //     return reText;
        // },
        _render: function (list) {
            this.getCurrentTimestamp(function (currentTimestamp) {
                if (!currentTimestamp) return false;

                //
                var listLength = list.length,
                    reHtml = '<ul class="height-list">',
                    isCurrent = 0,
                    curListArr = [],
                    $currentCountdown = null,   // 倒计时元素 jQuery Obj
                    currentData;
                if (listLength > 0) {
                    for (var i = 0; i < listLength; i++) {
                        currentData = list[i];

                        // 获取到当前进行的活动
                        isCurrent = currentTimestamp >= currentData.begin_time && currentTimestamp <= currentData.end_time;
                        if (isCurrent) {
                            curListArr.push({
                                curIndex: i,
                                syTimestamp: currentData.end_time - currentTimestamp
                            });
                        }
                        var tempTme = this.getStartDays(currentTimestamp, currentData.begin_time, currentData.end_time);
                        reHtml += this.tmpl(this.tpl, $.extend({
                            isActive: isCurrent ? ' j-share-btn active' : '',
                            notBegin: currentData.begin_time > currentTimestamp ? 'not-begin' : '',
                            isHide: isCurrent ? '' : ' hide',
                            say: currentData.sellingpoint || '暂无内容！',
                            formatCommission: currentData.commission,
                            formatHighcommission: currentData.highcommission,
                            formatLimitTime: tempTme,
                            notBeginTime: tempTme === '00:00:00' ? '' : tempTme,
                            index: i + 1
                        }, currentData));
                    }
                    reHtml += '</ul>';
                    this.el.html(reHtml);

                    // // 倒计时
                    curListArr.forEach(function (v) {
                        this.setCountdown(v.syTimestamp, this.el.find('.j-time-text').eq(v.curIndex));
                    }.bind(this));

                    this.loading.hide();
                } else {
                    this.loading.html();
                }
            });
        },

        // 设置倒计时
        setCountdown: function (syTimestamp, $currentCountdown) {
            Base.Widget.Countdown.push({
                time: syTimestamp,
                $item: $currentCountdown,
                zero: '00:00:00'
            });
        }
    });

    var Topic = Base.klass.create({
        sodaTpl: {
            list: "#j-topicscript"
        },
        init: function () {
            $.get('/api/product/getActList.jsp', { pageNo: 1, pageSize: 10, chanid: 103 }, function (result) {
                var list = result.obj.activityList
                var listHtml = this.sodaTmpl(this.sodaTpl.list, {
                    list: list,
                });

                $('.topic-list').html(listHtml);

            }.bind(this));
        },
    })

    $(function () {
        hashManager = new HashManager();

        /*    sliderAction = new SliderAction({
         el: '.j-slider-container'
         });*/

        action = new Action({
            el: '.j-rebate-group'
        });

        /* commission = new Commission({
         el: '.j-stat-group'
         });*/

        /*      firstNews = new FirstNews({
         el: '.j-first-news'
         });
         adverWrap = new AdverWrap({
         el: '.j-adver-wrap'
         });*/
        adverWrap = new AdverWrap({
            el: '.j-adver-wrap'
        });
        new DialogMain({
            el: '.j-dialog-container'
        });
        /*
         heightRate = new HeightRebate({
         el: '.j-height-list'
         });*/

        new Base.Widget.RebaetBottomBar({
            el: '#j-bottomWrap'
        });
    });

})(window.Zepto);
