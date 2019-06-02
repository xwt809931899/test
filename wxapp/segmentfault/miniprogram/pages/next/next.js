// miniprogram/pages/next/next.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:[
      {
        subjectImage: 'https://live-static.segmentfault.com/433/883/433883449-5cd805b77fa07_render',
        subjectName:'redux完全指南 系列1：从入门到精通',
        nowPrice:'￥19.00',
        price:'￥148.00',
        discount:'立省129.00元',
        time:15,
        number:34,
        id:1
      },
  
    ],
    isOn1:false,
    isOn2: false,
    isOn3: false,
    subjectDetail:[
      {
        chapterName:"01.【redux完全指南 系列：从入门到会用】课程介绍",
        time:'2分钟',
        num: '· 38人学过'
      },
      {
        chapterName: "01.【redux完全指南 系列：从入门到会用】课程介绍",
        time: '2分钟',
        num: '· 38人学过'
      },
      {
        chapterName: "01.【redux完全指南 系列：从入门到会用】课程介绍",
        time: '2分钟',
        num: '· 38人学过'
      },
      {
        chapterName: "01.【redux完全指南 系列：从入门到会用】课程介绍",
        time: '2分钟',
        num: '· 38人学过'
      },
      {
        chapterName: "01.【redux完全指南 系列：从入门到会用】课程介绍",
        time: '2分钟',
        num: '· 38人学过'
      },
      {
        chapterName: "01.【redux完全指南 系列：从入门到会用】课程介绍",
        time: '2分钟',
        num: '· 38人学过'
      }

    ]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    const nextDetail = this.data.detail.find(item => item.id == id)
    console.log(nextDetail)
    if(nextDetail) {
      this.setData({
        detail:[nextDetail],
        isOn1:true,
        isOn2:false,
        isOn3:false
      })
    }
    else {
      this.setData({
        detail: []
      })
      wx.showToast({
        title: '没有此课程信息',
        icon:'none'
      })
    }


  },
  toNavigateToTabBarOne () {
    this.setData({
      isOn1: true,
      isOn2: false,
      isOn3: false
    })
    
  },
  toNavigateToTabBarTwo () {
    this.setData({
      isOn1: false,
      isOn2: true,
      isOn3: false
    })
  },
  toNavigateToTabBarThree() {
    this.setData({
      isOn1: false,
      isOn2: false,
      isOn3: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})