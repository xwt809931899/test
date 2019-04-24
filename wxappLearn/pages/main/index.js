// pages/main/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
          city:"南昌",
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
          'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
          'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
          'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'

        ]
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    //this作用域在整个page里
    let that = this;    //让this的作用域保存下来  因为在回调函数success里this的作用域会被修改
    wx.request({
      url: 'https://www.easy-mock.com/mock/5ca458094767c3737055c8f8/example/xwt',
      success:function (res) {
        console.log(res)
        that.setData({       //动态的在Page里的data加上了items:[]
          items:res.data.data.movieList
        })
      }

    })
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
   console.log(1234)
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