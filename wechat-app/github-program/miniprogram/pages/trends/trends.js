// miniprogram/pages/trends/trends.js
const github = require('../../api/github.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    trends:[]
  },
  // 集load和reload于一身
  reloadData() {
    github.trendings()
      .then(data => {
        console.log(data)
        this.setData({
          trends:data
        })
        wx.stopPullDownRefresh();
      })
      .catch(() => {
        wx.stopPullDownRefresh();
      })
  }, 


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.startPullDownRefresh()   //自动进行下拉刷新
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
    this.reloadData();  //它监听到上面的刷新
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