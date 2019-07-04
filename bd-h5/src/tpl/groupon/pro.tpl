<!DOCTYPE html>
<html>
<head>
	@@include('../inc/head.tpl')
	<title>海拼团商品</title>
	<link rel="stylesheet" href="../css/groupon/item.css?@@version">
</head>
<body>
	<header class="j-share-control">
		<a href="javascript:window.history.go(-1);" class="goback hide"></a>
		<h1><div class="title j-main-name">海拼团商品</div></h1>
		<a href="javascript:void(0);" class="share j-share-btn"></a>
	</header>

	<div class="container">
		<div class="imgs swiper-container j-imgs">
			<div class="list swiper-wrapper j-list"></div>
			<div class="dotted"></div>
			<div class="seldout-cover j-pdt-seldout">
				<span class="seldout"></span>
			</div>
		</div>

		<div class="info-wrap">
			
			<div class="goodinfo">
				
				<h3 class="title j-pdt-title"></h3>

				<p class="subtitle j-pdt-subtitle"></p>

				<p class="des j-pdt-des"></p>

				<p class="remark j-pdt-remark">
					支付开团并邀请<span></span>人参团，人数不足自动退款，详见下方拼团步骤
				</p>

				<div class="sold">
					<p class="rate-des">已售<span class="j-pdt-rate">0</span>%</p>
					<div class="rate-img">
						<div class="rate-wrap">
							<div class="rate j-pdt-rate-width"></div>
						</div>
					</div>
					
				</div>

			</div>

			<div class="groupinfo">
				<h3 class="gi-title">
					<em>拼团步骤</em>
					<a href="javascript:void(0);" class="j-grouponrule">查看流程详情</a>
				</h3>

				<div class="gi-des">
					<img src="../img/groupon/pic_lct.png" alt="拼团步骤">
				</div>
			</div>

			<div class="gooddetail">

				<div class="gd-group">
					<ul>
						<li class="gd-option j-detail-option active" data-tabid="1"><a href="javascript:void(0);">商品介绍</a></li>
						<li class="gd-option j-detail-option" data-tabid="2"><a href="javascript:void(0);">规格参数</a></li>
						<li class="gd-option j-detail-option" data-tabid="3"><a href="javascript:void(0);">拼团流程</a></li>
					</ul>
				</div>

				<div class="gd-case">
					<div class="gd-section j-detail-section" data-caseid="1">
						<div class="description">
					        <div class="j-main-imgexplain">
					        </div>
					    </div>
					</div>
					<div class="gd-section j-detail-section hide" data-caseid="2">
						<div class="attributes">
				            <table>
				                <tbody class="j-main-attributes">
				                </tbody>
				            </table>
				        </div>
					</div>
					<div class="gd-section j-detail-section hide" data-caseid="3">
						<div class="grouponrule">
							<div class="rule-img-wrap">
								<img src="../img/groupon/pic_lc.png" alt="拼团流程">
							</div>

							<div class="rule-detail-group">
								<h3 class="rule-qa-title">
									<em>常见问题</em>
								</h3>
								<ul class="rule-qlist">
									<li class="item">
										<h4 class="question">1.如何参与团购下单？</h4>
										<p class="answer">如果对某款商品感兴趣，可以由您开团发起订单，您也可邀请好友或直接参与好友发起的订单。</p>
									</li>
									<li class="item">
										<h4 class="question">2.为什么我的团购会失败？</h4>
										<p class="answer">（1）超过组团有效期24小时仍未达到参团人数；<br />（2）组团有效期24小时内，商品已提前售罄，但未达到组团人数要求；<br />（3）对于恶意刷单影响广大消费者权益的倒货行为，_gConfig_.siteNameZH商城有权解散并取消该部分订单。</p>
									</li>
									<li class="item">
										<h4 class="question">3.团购失败后如何退款处理？</h4>
										<p class="answer">系统会在1—2天内提交微信处理，微信审核后2—5个工作日自动原路退款至您的支付账号。</p>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

			</div>		
		</div>

	</div>
	
	<div class="cart j-cart-container">
		<div class="content">
			<div class="content-wrap">
				<div class="buttons j-buttons">
					<button class="btn btn-checkout j-act-grouponBuy">
						<h3 class="pirce">￥<span class="g-price">0</span></h3>
						<p class="group"><span class="g-member">0</span>人团购</p>
					</button>
					<button class="btn btn-cart j-act-normalBuy">
						<h3 class="pirce">￥<span class="s-price">0</span></h3>
						<p class="group">单独购买</p>
					</button>
				</div>
			</div>
		</div>
	</div>

	<div class="j-dialog-viewpic" style="display:none;width:300px;">
		<div class="imgs-dialog swiper-container j-imgs-dialog">
			<div class="list swiper-wrapper j-list"></div>
			<div class="dotted dotted-dialog"></div>
		</div>
	</div>

	@@include('../inc/foot.tpl')

    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="_gConfig_.PROJECT_USER/api/users/partake"></script>
	<!-- build:js ../js/groupon/item.js -->
	<script type="text/javascript" src="../assets/lib/js/zepto.min.js"></script>
	<script type="text/javascript" src="../js/common/_base_sh.js"></script>
	<script type="text/javascript" src="../js/common/_loading.js"></script>
    
	<script type="text/javascript" src="../js/common/_loadlayer.js"></script>
	<script type="text/javascript" src="../js/common/_swiper.js"></script>
	<script type="text/javascript" src="../js/common/_lazyloader.js"></script>
	<script type="text/javascript" src="../js/common/_dialog.js"></script>
	<script type="text/javascript" src="../js/groupon/_item.js"></script>
    <!-- endbuild -->

    @@include('../inc/common_sharePlane.tpl', {"displayMsg":"hide"})

</body>
</html>