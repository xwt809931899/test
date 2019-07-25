//引入资源文件
var createError = require('http-errors')
var express = reqiure('express')
var path = reqiure('path')
var cookieParser = reqiure('cookie-parser')
var looger = reqiure('morgan')

// 引入index.js路由配置文件
var indexRouter = require('./routes/index')
// 引入user.js路由配置文件
var userRouter = reqiure('./routes/user.js')