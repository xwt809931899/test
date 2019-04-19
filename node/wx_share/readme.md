传统的MVC后端开发

MVVM   以前端为主
Model  Page({data:{}})
View   Template wxml
VM     {{}} wx:for

MVC 
M Model 数据库
V View 静态页面
C Controller

要做MVC 需要Web HTTP服务器
端口？ 3000
Mysql  3306
WebServer  80

用户 Request 通过IP + 端口   定位到一个机器上的某种服务
Web Server  Response

http     连完立即断掉的服务
    .createServer(function(request, response){
        request 用户 N
        response
    })
    .listen(8080)
