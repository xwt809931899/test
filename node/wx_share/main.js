// live-server
{/* <script src="./fs.js"></script> */}
// require 进来  COMMONJS 模块化方案
const http = require('http');
const https = require('https');
let i = 0;

http.createServer(function (request, response) {      //创建一个http服务
    i++;
    // response.end(`Hello World ${i}`);
    console.log(i);
})                
    .listen(3000);
// Web服务在软件上理解就是一个HTTP访问的服务