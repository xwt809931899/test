var express = require('express')
var router = express.Router()
var mysql = require('mysql')

var data = {
  code:200,
  msg:'success'
}
var pool = mysql.createPool({  //创建mysql连接
  host:'localhost',
  user:'root',
  password:'',
  database:'trip'
})
// 开始请求