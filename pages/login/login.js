// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      codename:"获取验证码",
      code:"",            //验证码
      iscode:null,        //用于存放验证码接口取到code
      userName:"",        //姓名
      mobile:"",          //电话
      login:"" ,          //公司名称
      disabled:false,      //禁用点击
      img:"../tabs/bj.jpg",
      img_gs:"../tabs/gs.jpg",
      img_xm:"../tabs/xm.jpg",
      img_dh:"../tabs/dh.jpg",
      img_yzm:"../tabs/yzm.jpg"
  },
  //input输入框值
  userLogoInput:function(e){  
    this.setData({
      login:e.detail.value
    })
  },
  userNameInput:function(e){
    this.setData({
      userName:e.detail.value
    })
  },
  mobileInput:function(e){
    this.setData({
      mobile:e.detail.value
    })
  },
  getCodeValue:function(e){
      this.setData({
        code:e.detail.value
      })
  },
  //判断获取验证码
  getCode:function(){
    let a=this.data.mobile;
     let _this=this;
    // let phonetel = /^1[3|4|5|8][0-9]\d{4,8}$/;
    // if (mobile == "") {
    //   wx.showModal({
    //     title: "信息提示",
    //     content: "手机号码不能为空!"
    //   })
    // } else if (!phonetel.test(mobile)) {
    //   wx.showModal({
    //     title: "信息提示",
    //     content: "手机格式不对!"
    //   })
    // }else{
    //   wx.request({
    //     url: '',
    //     success(res){
    //       console.log(res.data.data);
    //       _this.setData({
    //         iscode:res.data.data
    //       })
          let num=61;
          let timer=setInterval(function(){
            num--;
            if(num<=0){
              clearInterval(timer);
              _this.setData({
                codename:"重新发送",
                  disabled:false
              })
            }else{
              _this.setData({
                codename:num+"s",
                disabled:true
              })
            }
          },70)
    //     }
    //   })
    // }

  },
  //获取验证码
  getVerificationCode(){
    this.getCode();
    let _this=this
    _this.setData({
      disabled:false
    })
  },
  //注册按钮
  buton:function(){
    let name = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
    let phonetel = /^1[3|4|5|8][0-9]\d{4,8}$/;
    let login=this.data.login;
    let userName=this.data.userName;
    let mobile=this.data.mobile;
    let code=this.data.code;
    let iscode=this.data.iscode;
    if(login==""){
      wx.showModal({
        title: "信息提示",
        content: "公司名称不能为空!"
      })     
    }
    else if(userName==""){
      wx.showModal({
        title: "信息提示",
        content: "用户名不能为空!"
      })
    }else if(mobile==""){
      wx.showModal({
        title: "信息提示",
        content: "手机号码不能为空!"
      })
    }
    else if(code==""){
      wx.showModal({
        title: "信息提示",
        content: "验证码不能为空!"
      })
    }
    else if(mobile.length!=11){
      wx.showModal({
        title: "信息提示",
        content: "手机长度有误!"
      })
    }else if (!phonetel.test(mobile)) {
      wx.showModal({
        title: "信息提示",
        content: "手机格式不对!"
      })
    }
 else if (!name.test(login)) {
      wx.showModal({
        title: "信息提示",
        content: "公司名称格式不对!"
      })
    }
  else if (!name.test(userName)) {
      wx.showModal({
        title: "信息提示",
        content: "姓名格式不对!"
      })
    }
    // else if(code!=iscode){
    //     wx.showModal({
    //       title: '信息提示',
    //       content: '验证码错误',
    //     })
    // }
    else{
      wx.setStorageSync("logo", login);
      wx.setStorageSync("name", userName);
      wx.setStorageSync("phon", mobile);
      wx.redirectTo({
        url: '/pages/audit/audit',
      })
      wx.showToast({
        title: '加载中',
        icon: 'loading'
      });

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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