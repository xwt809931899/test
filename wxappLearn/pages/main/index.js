// pages/main/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  //     array:[
  //       {
  //         mode: 'scaleToFill',
  //         text: 'scaleToFill'
  //       }
  //     ],
  //     src:"pages/images/b.jpg",
        // people: [
        //   {name:"卓威"},
        //   {name:"杨帅"},
        //   {name:"金荣"}
         
        // ]
        imgUrls: [
          'https://wx2.sinaimg.cn/mw1024/79354417ly1g2bv1yo0asj20u00ws79k.jpg',
          'https://wx2.sinaimg.cn/mw1024/79354417ly1g2bv1yo0asj20u00ws79k.jpg',
          'https://wx2.sinaimg.cn/mw1024/79354417ly1g2bv1yo0asj20u00ws79k.jpg'
        ]
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(1)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(2)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(3)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log(4)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log(5)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.startPullDownRefresh({
      
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(7)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log(8)
  },
  bindJumpTap:function () {
    console.log('tap')
    wx.navigateTo({
      url: '../pages/lesson/index',
    })
  }


})