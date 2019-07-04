/**
 * rebate/regsuc3.js
 */
(function($) {

	var action;

	var Action = Base.klass.create({
		elements:{
			'.j-tips-mark':'elTipsMark'
		},
		events: {
			'click .j-act-gohome': 'clickGohome'
		},
		cgi: {
			// 领取红包接口
			gainGift:'/api/user/gainGift.jsp'
		},
		init: function() {
			var self = this;
			this.loading = new Base.Widget.Loading({
				owner: this.el
			});

			this.getData();
		},
		clickGohome: function(e){
			Base.cookie('ISNEWREBATE', 1);

			window.location.href = $(e.currentTarget).attr('href');

			e.preventDefault();
		},
		getData: function() {
			
			var params = {};
			params._ = new Date() - 0;
			$.get(this.cgi.gainGift, params, this.proxy(this.getDataBack));
			
		},
		getDataBack: function(result) {
			var list,
				o;
			if (result && result.errCode === 0) {
				o = result.obj;
				return false;
			}else{
				return false;
			}
		}
	});

	action = new Action({
		el:'.j-container'
	});

})(window.Zepto);