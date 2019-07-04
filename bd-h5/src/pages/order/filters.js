module.exports = function (Vue) {

	/* 订单状态说明 
		订单状态
			WAITPAY	是	string	待付款
			WAITDELIVER	是	string	已付款/待发货
			FINISH	是	string	已完成
			CLOSE	是	string	已关闭
		包裹状态
			WAIT_DELIVERED	是	string	待发货
			DELIVERED	是	string	已出库
			RECEIVED	是	string	已签收
			REFUNDING	是	string	退款中
			RETURNING	是	string	退货中
			REFUND	是	string	已退款
			CLOSED	是	string	已关闭
	 */

	// 订单状态过滤器  
	Vue.filter("orderStatusFilter",function(value){
	    var text="";
	    switch(value){
	        case 'WAITPAY':
	            text="待付款"
	            break;
	        case 'WAITDELIVER': case 'WAIT_DELIVERED':
	            text="待发货"
	            break;
	        case 'FINISH':
	            text="已签收"
	            break;
	        case 'CLOSE': case 'CLOSED':
	            text="已关闭"
	            break; 
	        case 'DELIVERED':
	            text="已出库"
	            break; 
	        case 'RECEIVED':
	            text="已签收"
	            break; 
	        case 'REFUNDING':
	            text="退款中"
	            break; 
	        case 'REFUND':
	            text="REFUND"
	            break; 
	    }
	    return text;
	});

    // 卡券订单状态过滤器
    Vue.filter("couponOrderStatusFilter",function(value){
        var text="";
        switch(value){
            case 'WAITPAY':
                text="待付款"
                break;
            case 'WAITDELIVER': case 'WAIT_DELIVERED':
            text="已付款"
            break;
            case 'FINISH':
                text="已发放"
                break;
            case 'CLOSE': case 'CLOSED':
            text="已关闭"
            break;
            case 'DELIVERED':
                text="已发放"
                break;
            case 'RECEIVED':
                text="已发放"
                break;
        }
        return text;
    });

	// 查询物流 按钮 过滤器
	Vue.filter("isViewLogisticsShow",function(value,orderStatus){
	    var defaultVal=false;
	   /* if(value=='WAIT_DELIVERED'||value=='DELIVERED'||value=='RECEIVED'||orderStatus=='FINISH'){
	    	defaultVal=true;
	    }*/
		if(value=='DELIVERED'||value=='RECEIVED'||orderStatus=='FINISH'){
			defaultVal=true;
		}
	    return defaultVal;
	});
	
	// 确认收货
	Vue.filter("isConfirmReceiptShow",function(value,orderStatus){
	    var defaultVal=false;
	    if(value=='DELIVERED'){
	    	defaultVal=true;
	    }
	    return defaultVal;
	});

	// 支付方式过滤器 WX=微信 ALIPAY=支付宝
	Vue.filter("payTypeFilter",function(value){
	    var text="";
	    switch(value){
	        case 'WX':
	            text="微信"
	            break;
	        case 'ALIPAY':
	            text="支付宝"
	            break;
	    }
	    return text;
	});
	
	



}