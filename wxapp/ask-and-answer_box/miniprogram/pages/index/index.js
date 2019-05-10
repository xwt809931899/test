const db = wx.cloud.database();
const information = db.collection('information');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    focus:false,
    addText:'',
    text:'',
    editting:false,
    
  },
  addInputHide () {
    this.setData({
      isShow:false,
      editting:false
    })
  },
  addInput () {
    if(!this.data.addText.trim()) {
      wx.showToast({
        title: '说点什么吧^_^',
        duration:1000,
        icon:'none'
      })
      return;
    }

    let text = this.data.text
    this.setData({
      text:[
        {
          content:this.data.addText,
          id: new Date().getTime(),

        },
      ...text],
      isShow: false,
      focus: false,
      editting:false
    })
    information
      .add({
        data:{
          addtext:this.data.addText
        }
      })
      .then(res => {
        console.log(res)
      })


  },
  setInput (e) {
    console.log(e);
    this.setData({
    addText:e.detail.value
    })

  },
  switchToInput() {
    wx.showToast({
      title: '公告栏字数限制35以内，更多心里的话放到提问箱里吧QAQ',
      duration:2000,
      icon:'none'
    })
    this.setData({
      isShow:true,
      editting:true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    information
      .get()
      .then(res => {
        let i = res.data.length
        // console.log(i)
        that.setData({
          addText:res.data[i-1].addtext
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