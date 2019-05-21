// miniprogram/pages/shouye/shouye.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTouch:false,
    addText:'',
    focus:false,
    // shouye:[{
    //   subjectImage:"https://live-static.segmentfault.com/433/883/433883449-5cd805b77fa07_render",
    //   subjectName: "redux完全指南 系列1：从入门到精通",
    //   author:"starkwang ",
    //   num: "·30",
    //   nowPrice:"￥19.00",
    //   price:"￥148.00",
    //   isSale:true,
    //   discount:'立省129.00元'


    // }],
    isSale:false
  },
  toBack() {
    this.setData({
      isTouch: false

    })
  },
  toInput() {
    this.setData({
      isTouch:true,
      focus:true

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.request({
      url: 'https://www.easy-mock.com/mock/5ca458094767c3737055c8f8/example/segmentfault',
      success(res) {
        console.log(res)
        that.setData({
        shouye:res.data.data.shouye

        })
      }
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