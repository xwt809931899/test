//连上数据库
const db = wx.cloud.database();
// 找到userInfo表
const userInfo = db.collection('uesrInfo');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  getUserInfo (result) {
    console.log(result);
    //用户_openid 前端是拿不到的
    //云开发能够拿到
    wx
      .cloud
      .callFunction({
        name:'getOpenId',
        complete: res => {
          // console.log(res.result.openId)
          // 云数据库，传一个Json 代表一条记录
          userInfo.where({
            _openid:res.result.openId
          }).count().then(res => {
            if(res.total == 0){
              userInfo
                .add({
                  data: result.detail.userInfo
                })
                .then(res => {
                  console.log(res);
                })
            }else{
              // console.log('加过了');
              wx.navigateTo({
                url: '/pages/add/add',
                success (res) {
                  console.log(res);
                }
              })
            }
          })        //数量 不是结果，是符合条件的有多少条 
          console.log(result.detail.userInfo);
          
        }
      })     //云函数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userInfo
      .get()
      .then(res => {
        this.setData({
          userList:res.data
        })
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