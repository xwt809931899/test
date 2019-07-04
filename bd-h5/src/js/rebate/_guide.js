/**
 * rebate/guide.js
 */
(function($) {

	var Guide = Base.klass.create({
		events: {
			'click .j-act-register': 'clickRegister'
		},
		init: function() {
			this.g_chan = Base.url.param('g_chan');

			var swiper = new Swiper('.j-slider-container', {
				autoplay: 2000,
				loop: true
			});
		},
		clickRegister: function(e) {
			var $e;

			if (this.g_chan) {
				$e = $(e.currentTarget);

				window.location.href = $e.attr('href') + '?g_chan=' + this.g_chan;

				e.preventDefault();
			}
		}
	});

	new Guide();

})(window.Zepto);