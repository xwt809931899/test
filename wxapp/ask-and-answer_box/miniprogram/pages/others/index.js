const db = wx.cloud.database();
const userinfos = db.collection('userinfos');
const questions = db.collection('questions');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    focus: false,
    addText: '这个人很懒什么都没写',
    hasInformation: false,
    todisappear: false,
    askInformation: [],
    has_openid: true
  },
  toAnswer() {
    wx.navigateTo({
      url: '/pages/answer/answer',
    })
  },
  toAppear() {
    this.setData({
      todisappear: false
    })
  },
  toDisappear() {
    this.setData({
      todisappear: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    // const scene = decodeURIComponent(options.scene);
    // if (scene != 'undefined') {
    // console.log(decodeURIComponent(options.scene));
    userinfos
      .where({
        _openid: 'ooUoR5ZZMLF7dMdQEmKaNLMcUAlY' //scene._openid-------------------待调试
      })
      .get()
      .then(res => {
        that.setData({
          addText: res.data[0].notice,
          has_openid: true
        })
      });
    questions
      .where({
        answer_openid: 'ooUoR5ZZMLF7dMdQEmKaNLMcUAlY' // scene._openid
      })
      .get()
      .then(res => {
        if (res.data.length != 0) {
          return new Promise((resolve, reject) => {
            let questions_data = res.data;
            for (let i = 0; i < questions_data.length; i++) {
              userinfos
                .where({
                  _openid: questions_data[i]._openid
                })
                .get()
                .then(function(userinfo_res) {
                  questions_data[i].imgUrl = userinfo_res.data[0].avatarUrl;
                  questions_data[i].nickName = userinfo_res.data[0].nickName;
                });
            }
            resolve(questions_data);
          }).then(questions_data=>{
            console.log(questions_data[0]);
            that.setData({
              askInformation: questions_data,
              hasInformation: true
            })
          })
        }
      })
    // } else {
    // that.setData({
    //   has_openid: false
    // })
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})