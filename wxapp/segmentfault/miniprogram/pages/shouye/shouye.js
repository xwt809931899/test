// miniprogram/pages/shouye/shouye.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTouch:false,
    addText:'',
    focus:false,
    isSale:false
  },
  toNavigate (e) {
    let id = e.currentTarget.dataset.id
    console.log(e)
    wx.navigateTo({
     
      url: `/pages/next/next?id=${id}`,
    })
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