/**
 * item.js
 */
(function ($) {
    /*  图文详情 */
    var itemCode = window.location.hash.replace(/#id-/, '');
    itemCode = itemCode.replace(/\?.*/, '');
    var g_chan = Base.cookie('USER_UIN');
    var vm = new Vue({
        el: '.j-main-imgexplain',
        data: {
            itemGraphicDetail: null
        },
        ready: function () {
            $.ajax({
                url: gConfig.PROJECT_REBATE + '/api/product/itemGraphicDetail',
                type: 'get',
                data: {
                    itemCode: itemCode
                },
                headers: { 'A-CID': gConfig.ACID },
                success: function (result) {
                    vm.itemGraphicDetail = result.data
                }.bind(this)
            });
        }
    })

    var tip;

    var viewPicDialog;

    var HASH;

    var productImgs, productImgsDialog, product, hashManager, favorControl;

    var dialogSwiper;
    /* 轮播图*/
    var ProductImgs = Base.klass.create({
        tpl: {
            item: '<div class="swiper-slide">\
						<div class="item j-item">\
							<img src="<%=src%>">\
						</div>\
					</div>'
        },
        elements: {
            '.j-list': 'elList'
        },
        events: {
            'click .j-item': 'showViewPic'
        },
        init: function () {
            HASH = window.location.hash;

            viewPicDialog = new Base.Widget.Dialog();

            $('.j-dialog-closer').click(function () {
                window.history.go(-1);
            });
        },
        /*  点击轮播图弹窗新的图
         showViewPic: function (e) {
         var $e = $(e.currentTarget),
         left = $e.offset().left,
         swiper = this.swiper;

         setTimeout(function () {
         var l = $e.offset().left;
         if (l === left) {

         hashManager.setHash('VIEWPIC');

         dialogSwiper.swipeTo(swiper.activeIndex);
         }
         }, 200);
         },*/
        setData: function (list) {
            var $list;

            if (list && list.length) {
                $list = this.elList;

                for (var i = 0, len = list.length; i < len; i++) {

                    $list.append(this.tmpl(this.tpl.item, {
                        src: list[i]
                    }));

                }

                this.initEvents();
            }
        },
        initEvents: function () {
            this.swiper = new Swiper('.j-imgs', {
                pagination: '.dotted'
            });
        }
    });
    /*
     var ProductImgsDialog = Base.klass.create({
     tpl: {
     item: '<div class="swiper-slide">\
     <div class="item">\
     <img src="<%=src%>">\
     </div>\
     </div>'
     },
     elements: {
     '.j-list': 'elList'
     },
     setData: function (list) {
     var $list;

     if (list && list.length) {
     $list = this.elList;

     for (var i = 0, len = list.length; i < len; i++) {

     $list.append(this.tmpl(this.tpl.item, {
     src: list[i]
     }));

     }

     this.initEvents();
     }
     },
     initEvents: function () {
     dialogSwiper = new Swiper('.j-imgs-dialog', {
     pagination: '.dotted-dialog'
     });
     }
     });*/
    /* 商品详情 */
    var Product = Base.klass.create({
        cgi: {
            product: gConfig.PROJECT_REBATE + '/api/product/getProductDetail'
        },
        pageParams: {
            // op: 1,
            // t_id: '',
            // g_chan: '',
            pid: null
        },
        events: {
            'click .j-create-share-data': 'createShareData'
        },
        hasWXTips: false,
        productData: {},
        tpl: {
            'attribute': '<p>\
							 <span class="title"><%=key%>：</span>\
							 <span><%=value%></span>\
						 </p>'
        },
        elements: {
            '.j-subtitle': 'elSubTitle',
            '.j-main-price': 'elPrice',
            '.j-main-desc': 'elDesc',
            '.j-main-editor': 'elEditor',
            '.j-main-deliver': 'elDeliver',
            '.j-main-attributes': 'elAttributes',
            '.j-main-seldout': 'elSeldout',
            '.j-main-imgexplain': 'elImgExplain',
            '.j-origin': 'elOrigin',
            '.j-acttime': 'elActtime',
            '.j-refprice': 'elRefprice',
            '.j-discount': 'elDiscount',
            '.j-delivertime': 'elDelivertime',
            '.j-share-btn': 'elShareBtn',
            '.j-one-buy': 'elOneBuy',
            '.j-quote_count': 'elQuoteCount'
        },
        init: function () {
            var id, WXTips;

            this.pageParams.t_id = Base.url.param('t_id') || '';
            this.pageParams.g_chan = Base.url.param('g_chan') || '';

            WXTips = Base.url.param('wxtips') || '';
            this.hasWXTips = (WXTips && WXTips == 1);

            id = window.location.hash.replace(/#id-/, '');
            id = id.replace(/\?.*/, '');

            this.flush(id);
        },
        flush: function (id) {

            this.pageParams.pid = id;
            this.getData();
        },
        getData: function (url) {
            if (!this.pageParams.pid) return;

            this.pageParams._ = new Date - 0;
            $.ajax({
                url: gConfig.PROJECT_REBATE + '/api/product/getProductDetail',
                type: 'post',
                dataType: 'json',
                data: { itemCode: this.pageParams.pid },
                headers: { 'A-CID': gConfig.ACID },
                success: function (result) {
                    if (result && result.code === 1000) {
                        this.getDataBack(result);
                    }
                }.bind(this)
            });

            // $.get(url || this.cgi.product, this.pageParams, this.proxy(this.getDataBack));
            // $.get(url || this.cgi.product, params, this.proxy(this.getDataBack));
        },
        getDataBack: function (result) {
            var list;

            if (result && result.code === 1000) {
                this.productData = result.data;
                this.render(this.productData);
            } else {
                // 获取数据失败！
            }
        },
        // 获取当前时间戳 ms
        getCurrentTimestamp: function (callBack) {
            var curTimestamp = 0,
                params = {
                    '_': new Date() - 0
                };

            $.ajax({
                async: true,
                type: 'get',
                dataType: 'json',
                url: '/api/common/getSystemTime.jsp',
                data: params,
                success: function (resule) {
                    if (resule && resule.errCode != 0) {
                        curTimestamp = resule.obj
                    } else {
                        curTimestamp = new Date() - 0
                    }
                    callBack.call(this, curTimestamp);
                },
                error: function () {
                    callBack.call(this, new Date() - 0);
                }
            });
        },
        heightRebateTip: function (beginTime) {
            beginTime && this.getCurrentTimestamp(function (curTimestamp) {
                (curTimestamp < beginTime) && tip.show('温馨提示：该商品高返开始时间还未到，现在分享按原佣金计算！');
            });
        },
        render: function (product) {
            var imgexplain = [], referance_price = '';
            var curtime = new Date() - 0;
            var discount = Math.round(product.salePrice / product.salePrice * 100) / 10;

            if (!product) return;
            productImgs.setData(product.imageList);

            // productImgsDialog.setData(product.detailpics);

            this.renderAttributes(product.attribute);
            this.elSubTitle.text(product.itemTitle);
            document.title = product.itemTitle + gConfig.siteTitile;

            this.elPrice.text(product.salePrice);
            product.sellingPoint && this.elEditor.html(product.sellingPoint.replace(/\n/g, '<br />'));

            if (product.bond_log_url == "") {
                imgexplain.push('<img src="' + product.transfer_log_url + '" />')
            } else {
                imgexplain.push('<img src="' + product.bond_log_url + '" />')
            }
            $(product.imgexplain).each(function (m, n) {
                imgexplain.push((n.search(/\<.*>/) > -1) ? n : '<img src="' + n + '" />')
            });

            // imgexplain.length && this.elImgExplain.html(imgexplain.join(''));

            this.elDeliver.text(product.warehouseName);

            this.elOrigin.text(product.country);
            if (product.act_endtime && product.act_endtime > 0 && (product.act_endtime - curtime) / 3600000 < 24) {
                Base.Widget.Countdown.push({
                    time: product.act_endtime - curtime,
                    $item: this.elActtime.removeClass('hide').find('i')
                });
            }
            referance_price = product.price < product.referance_price ? '<span>￥' + this.coverPrice(product.referance_price) + '</span>' : '';
            this.elRefprice.html(referance_price);
            if (discount < 10) {
                this.elDiscount.parent().removeClass('hide');
                this.elDiscount.text(discount + '折');
            }

            if (product.arriveDays && product.arriveDays > 0) {
                this.elDelivertime.text('预计' + product.arriveDays + '工作日送达');
            }

            // 无库存
            if (product.maxbuy < 1 || product.status === 0) {
                this.elSeldout.show();
            }

            // 限购一件
            product.maxbuy === 1 && this.elOneBuy.removeClass("hide");

            // 返利分享设置
            var sh_title = product.itemTitle;
            sh_pic = product.imageList[0];

            this.elShareBtn.attr({
                'data-title': sh_title,
                'data-img': sh_pic,
                'data-pid': product.itemCode,
                'data-say': product.sellingPoint || '暂无内容',
                'data-rebate-money': product.rebateMoney
            });

            if (g_chan) {
                this.elShareBtn.removeClass("disabled");
                $('.-mob-share-ui').attr('data-gchan', g_chan);
            }

            // 高返时间提示
            // (Base.url.param('heightRebate') == 1) && this.heightRebateTip(product.h_begintime);

            // 是否隐藏分享按钮
            (Base.url.param('hidebtn') != 1) && $(".j-hideBtn").removeClass("hide");

            // 返利金额
            $("#j-rebate-money").text('赚￥' + product.rebateMoney.toFixed(2));

            this.elQuoteCount.text('已有' + product.shareTimes + '人分享');

            if (Base.Browser.type === 'weixin') {
                var link = window.location.origin + '/item.html?t_id=P_' + product.pid + '#id-' + product.pid;
                var pid = this.pageParams.t_id.replace('P_', '');
                if (this.pageParams.t_id && this.pageParams.g_chan) {
                    link = window.location.origin + '/item.html?t_id=P_' + pid + '&g_chan=' + this.pageParams.g_chan + '#id-' + product.pid;
                }
                new Base.Widget.WXShare({
                    config: {
                        'title': product.name + gConfig.siteTitile,
                        'imgUrl': product.detailpics[0],
                        'desc': product.descword.replace(/\n/g, ''),
                        'link': link
                    }
                });
                // 微信分享提示
                if (this.hasWXTips) {
                    $('.wxtips-mark').on('click', function () {
                        $(this).hide();
                    }).show();
                }
            }
        },
        renderAttributes: function (attribute) {
            var tmpl = this.tmpl,
                tpl = this.tpl,
                $attributes = this.elAttributes;

            if (!attribute) {
                $attributes.html('暂无属性');
            } else {
                $attributes.html('');

                $(attribute.split('\n')).each(function (m, n) {
                    var item = n.split('###');

                    if (item && item[0] && item[1]) {
                        $attributes.append(tmpl(tpl.attribute, {
                            key: item[0],
                            value: item[1]
                        }));
                    }
                });
            }
        },
        createShareData: function () {
            var shareData = {
                fields: [
                    { type: "text", text: "" },
                    {
                        type: "product",
                        itemCode: this.productData.itemCode,
                        itemTitle: this.productData.itemTitle,
                        mainIcon: this.productData.mainIcon,
                        salePrice: this.productData.salePrice,
                        rate: this.productData.rate,
                        warehouseName: this.productData.warehouseName,
                        sellingPoint: this.productData.sellingPoint,
                        country: this.productData.country,
                    }
                ]
            };

            store.set("shareData", shareData);
            location.href = "share_found.html?addpro=1";
        }
    });
    /* var HashManager = Base.klass.create({
     init: function () {
     $(window).on('hashchange', this.proxy(this.hashChange));
     },
     setHash: function (hash) {
     window.location.hash = hash;
     },
     hashChange: function () {
     var hash = window.location.hash.replace('#', '');
     this.trigger('change', hash);
     }
     });*/

    tip = new Base.Widget.Tip();

    productImgs = new ProductImgs({
        el: '.j-imgs'
    });

    /* productImgsDialog = new ProductImgsDialog({
     el: '.j-imgs-dialog'
     });*/

    product = new Product();

    /*  favorControl = new Base.Widget.FavorControl();
     favorControl.setItemPageFavor().getFavorState();*/

    /*    hashManager = new HashManager();*/
    /*
     function hashChange(hash) {
     var id;

     if (hash === 'VIEWPIC') {
     viewPicDialog.html('.j-dialog-viewpic', {
     title: '图片预览'
     });
     } else {
     viewPicDialog.hide();
     }
     }*/

    /* hashManager.bind('change', hashChange);*/
})(window.Zepto);