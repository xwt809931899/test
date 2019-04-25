Page({
  data: {
    hasUserInfo: false,
    userInfo: {},
    todos: [],
    addShow: false,
    addText:'',
    focus:false,
    status:1
  },
  showStatus: function (e) {
    var status = e.currentTarget.dataset.status;
    if(status === this.data.status) {
      return;
    }
    this.setData({
      status
    })
  },
  setInput: function (e) {
    console.log(e);
    this.setData({
      addText:e.detail.value
    })

  },
  addTodo:function () {
    // 1.检测有没有输入
    if (!this.data.addText.trim()) {
      wx.showToast({
        title:'请输入todo',
        duration: 1000,
        icon:'none'
      })
      return;
    }
    // 2.todos push
    let todos = this.data.todos;
    // todos.push({
    //   title:this.data.addText,
    //   id:new Date().getTime(),
    //   status: 0
    // })
    this.setData({
      todos:[
        {
        title:this.data.addText,
        id:new Date().getTime(),
        status:0
        },
        ...todos],
      addShow:false,
      addText:'',
      focus:false
      
    })
    //3. 关闭表单
  },
  addTodoShow: function() {
    this.setData({
      addShow: true,
      focus:true
    })
  },
  addTodoHide: function() {
    this.setData({
      addShow: false,
      focus:false
    });
  },
  getUserInfo: function(e) {
    console.log(e);
    // this.data.userInfo = e.detail.userInfo;
    // this.data.hasUserInfo = true;
       this.setData({
       userInfo: e.detail.userInfo,
       hasUserInfo: true
      })
  }
})


//几个问题   
//1.if () {} return; 和 if () {};  else () {}; 有没有区别
//if括号里面的非语句 是不是存不存在 
//数据存在默认初始值 点击事件里修改了数据里的值，使他不再是初始值，那么当这个事件结束了，数据里的值是保持修改后

