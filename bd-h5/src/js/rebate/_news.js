(function () {

	var tip;

	var News = Base.klass.create({
		sodaTpl: {
			newsList: '#j_newsTpl'
		},
		elements: {
			'#j_newsList': 'elNewsList'
		},
		cgi: {
			action:gConfig.PROJECT_REBATE+'/api/notify/center'
		},
		init : function () {
			this.loading = new Base.Widget.Loading({
				owner: this.el
			});

			this.getNewsList();
		},
		getNewsList : function () {
			$.ajax({
				url: this.cgi.action,
				headers: { 'A-CID': gConfig.ACID },
				success: function (result) {
					this._getNewListCall(result);
				}.bind(this)
			});
			this.loading.show();
		},
		_getNewListCall : function (result) {

			if(result && result.code === 1000){
				this._render(result.data);
			}else{
				tip.show(result.errMsg);
			}
		},
		_render: function (list) {
			if(list && list.length > 0){
				this.elNewsList.html(this.sodaTmpl(this.sodaTpl.newsList,{newsList:list}));
				this.loading.hide();
			}else{
				this.loading.html();
			}
		}
	});

	tip = new Base.Widget.Tip();

	new News({
		el : '.j_container'
	});


	new Base.Widget.RebaetBottomBar();
	
})();