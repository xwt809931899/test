http 大佬 req + res
状态码: HTTP响应的一部分  
具体数字:浏览器 用户代理 发送正确的代码
statusCode 200 浏览器 成功
header  内容是  text/plain

hello world 响应体

1xx(以1开头的状态码) 请求正在处理
2xx(以2开头的状态码) 请求成功处理
3xx(以3开头的状态码) 重新定向
    www.xiaomi.com  www.mi.com
4xx(以4开头的状态码)

301 永久跳转,会让浏览器缓存，http//localhost:8080/  不会再走服务器
302 临时跳转