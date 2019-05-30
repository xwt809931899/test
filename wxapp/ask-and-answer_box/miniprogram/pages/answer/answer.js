// miniprogram/pages/answer/answer.js
const db = wx.cloud.database()
const questions = db.collection('questions')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAnswer:false,
    question:'',
    isCollection:false,
    focus:false,
    addText:'',
    isReply:false,
    isSend:false,
    isChange:false,
    time:'0:29',
    date:'2019-05-22',
    time1:'0:53',
    id:'',
    date:'2019-05-23'


  },
  toSend() {
     
    if(this.data.addText === ''){
      this.setData({
        isAnswer:false,
        isReply:false,
        isSend:false
      })
      wx.showToast({
        title: '亲，回复不能为空哦',
        image:'../../images/smile.png'

      })
    }else{
      questions
        .doc('f4b905395ce00a62010751fe7dd29348')
        // .where({
        //   _id:"9c4488c75cde41761385a0187174b278"
        // })
        .update({
        data:{
          answer: this.data.addText
        }
      })
        .then(res => {
          console.log(res)
        })
      this.setData({
        isSend: true,
        isAnswer: false,
        isChange:false,
        isReply:true

      })
      wx.showToast({
        title: '已发送',
      })
    }
   
  },
  toInput (e) {
    console.log(e)
    this.setData({
      addText: e.detail.value,
      isReply:true,
      isChange:true,
      isSend:false
    })
  },
  hideInput() {
    this.setData({
      isAnswer: false,
      isReply:true,
      isChange:false,
      isSend:true
    })
    
  },
  toAnswer() {
    this.setData({
      focus:true
    })
  },
  notCollection () {
    wx.showToast({
      title: '已取消收藏',
      image:"../../images/false.png"
    })
    this.setData({
      isCollection:false
    })
  },
  toCollection() {
    wx.showToast({
      title: '已收藏',
    })
  this.setData({
    isCollection:true
  })
  },
  toReply () {
    if(this.data.addText.length != 0){
      wx.showToast({
        title: '修改你的回复',
        image:'../../images/smile.png'
      })
      this.setData({
        isSend:false
      })
    }
    this.setData({
      isAnswer:true
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that = this
    questions//.where({
    //   _id: '325df988-547d-40ec-8d39-d9382cb45e8d'
    // })
      .get()
      .then(res => {
        console.log(res)
        this.setData({
          question: res.data[7].question.split("").join(" "),
          addText: res.data[7].answer
        })
        if(this.data.addText.length != 0) {
          this.setData({
            isReply:true,
            isSend:true,
            isChange:false,
            
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