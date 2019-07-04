(function(a,h,c,b,f,g){a["UdeskApiObject"]=f;a[f]=a[f]||function(){(a[f].d=a[f].d||[]).push(arguments)};g=h.createElement(c);g.async=1;g.charset="utf-8";g.src=b;c=h.getElementsByTagName(c)[0];c.parentNode.insertBefore(g,c)})(window,document,"script","https://assets-cli.udesk.cn/im_client/js/udeskApi.js","ud");
window.udesk = {
    unreadCount:0
}
ud({
    "code": "28bfh667",
    "link": "https://bdego.udesk.cn/im_client/?web_plugin_id=46215",
    "onReady": function() {
        console.log('Udesk初始化完成');
    },
    "onUnread": function(data) {
        console.log('未读消息数'+data.count);
        udesk.unreadCount = data.count;
    }
});