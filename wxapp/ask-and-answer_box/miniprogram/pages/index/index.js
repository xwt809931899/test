const db = wx.cloud.database();
// const information = db.collection('information');
const questions = db.collection('questions');
const userinfos = db.collection('userinfos');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    focus: false,
    addText: '',
    editting: false,
    hasInformation: true,
    todisappear: false,
    askInformation: [{
        imgUrl: '../../images/mine.jpg',
        nickName: '文文韬韬文文韬韬文文韬韬文文韬韬文文韬韬',
        question: '你今年多大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
      },
      {
        imgUrl: '../../images/mine.jpg',
        nickName: '文文韬韬',
        question: '你今年多大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
      },
      {
        imgUrl: '../../images/mine.jpg',
        nickName: '文文韬韬',
        question: '你今年多大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
      },
      {
        imgUrl: '../../images/mine.jpg',
        nickName: '文文韬韬',
        question: '你今年多大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
      },
      {
        imgUrl: '../../images/mine.jpg',
        nickName: '文文韬韬',
        question: '你今年多大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
      },
      {
        imgUrl: '../../images/mine.jpg',
        nickName: '文文韬韬',
        question: '你今年多大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
      },
      {
        imgUrl: '../../images/mine.jpg',
        nickName: '文文韬韬',
        question: '你今年多大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
      },
      {
        imgUrl: '../../images/mine.jpg',
        nickName: '文文韬韬',
        question: '你今年多大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
      },
      {
        imgUrl: '../../images/mine.jpg',
        nickName: '文文韬韬',
        question: '你今年多大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
      }
    ],
  },
  toAnswer() {
    wx.navigateTo({
      url: '/pages/answer/answer',
    })
  },
  toClear() {
    this.setData({
      addText: ''
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
  addInputHide() {
      
     
      this.setData({
        addText: "即将跳转最近一次的编辑"
      })
      wx.showToast({
        title: '输入框为空的话，将保持您上次的编辑',
        duration: 2000,
        icon: "none"
      })
      wx.startPullDownRefresh({
        success: (res) => {
          let that = this
          userinfos
            .get()
            .then(res => {
              let text = res.data[0].notice
              // console.log(i)
              that.setData({
                addText: text
              })
            })
        }
      })
    
    this.setData({
      isShow: false,
      editting: false,

    })
  },
  addInput() {
    let that = this;
    if (!this.data.addText.trim()) {
      wx.showToast({
        title: '说点什么吧^_^',
        duration: 1000,
        icon: 'none'
      })
      return;
    }
    this.setData({
      isShow: false,
      focus: false,
      editting: false
    })
    // information
    //   .add({
    //     data: {
    //       addtext: this.data.addText
    //     }
    //   })
    //   .then(res => {
    //     console.log(res)
    //   })
    userinfos
      .doc('f4b905395ce18f3f01e8e2145b6c3cb7')
      .update({
        data: {
          notice: this.data.addText
        }
      })
      .then(res => {
        console.log(res)
      })




  },
  setInput(e) {
    console.log(e);
    this.setData({
      addText: e.detail.value
    })

  },
  switchToInput() {
    wx.showToast({
      title: '公告栏字数限制35以内，更多心里的话放到提问箱里吧QAQ',
      duration: 2000,
      icon: 'none'
    })
    this.setData({
      isShow: true,
      editting: true,
      focus: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    questions
      .add({
        data: {
          "answer": '',
          "question": "你今年多大有女朋友了吗没有的话是不是我是一个哦我我骄傲你要不要和我一起成为啊啊啊啊啊啊啊啊啊啊啊",
          "questioner_openid": "ooUoR5ZZMLF7dMdQEmKaNLMcUAlY"
        }
      })

    userinfos
      .get()
      .then(res => {

        // let i = res.data.length
        console.log(res)
        that.setData({
          addText: res.data[0].notice
        })
      })
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