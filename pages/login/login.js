// pages/login/login.js
const app=getApp();
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
      showInputStatus: false,
      inputValue: '',//点击结果项之后替换到文本框的值
      adapterSource: ["秋田科技有限公司", "汕头股份有限公司", "悦心有限公司", "成都汉庭科技有限公司", "成都倡导有限公司"],//本地匹配源
      bindSource: [],//绑定到页面的数据，根据用户输入动态变化
      img:"../tabs/bj.jpg",
      img_gs:"../tabs/gs.jpg",
      img_xm:"../tabs/xm.jpg",
      img_dh:"../tabs/dh.jpg",
      img_yzm:"../tabs/yzm.jpg",
      statusBarHeight: app.globalData.statusBarHeight      //top的头部自定义高度iPhonex
  },
  userLogoInput: function (e) {
    var currentInputStatu = e.currentTarget.dataset.statu;

    this.setData({
      login: e.detail.value
    })
    var prefix = e.detail.value//用户实时输入值
    var newSource = []//匹配的结果
    if (prefix != "") {
      this.setData(
        {
          showBtnStatus1: false,
          showBtnStatus2: true
        }
      );
      this.data.adapterSource.forEach(function (e) {
        if (e.indexOf(prefix) != -1) {//返回某个指定的字符串值在字符串中首次出现的位置,如果要检索的字符串值没有出现，则该方法返回 -1
          newSource.push(e)
        }
      })
    } else {
      currentInputStatu = "close";
      this.setData(
        {
          isScroll: true,
          showBtnStatus1: true,
          showBtnStatus2: false
        }
      );
    }
    if (newSource.length != 0) {
      this.setData({
        bindSource: newSource
      })
    } else {
      this.setData({
        bindSource: []
      })
      currentInputStatu = "close";
      this.setData(
        {
          isScroll: "{{false}}"
        }
      );
    }
    //关闭 
    if (currentInputStatu == "close") {
      this.setData(
        {
          showInputStatus: false,
          isScroll: true
        }
      );
    }
    // 显示 
    if (currentInputStatu == "open") {
      this.setData(
        {
          showInputStatus: true,
          isScroll: "{{false}}"
        }
      );
    }
  },
  //点击选型确定input值
  itemtap: function (e) {
    var currentInputStatu = e.currentTarget.dataset.statu;
    this.setData({
      login: e.target.id,
      bindSource: []
    })
    //关闭 
    if (currentInputStatu == "close") {
      this.setData(
        {
          showInputStatus: false,
          isScroll: true
        }
      );
    }
    // 显示 
    if (currentInputStatu == "open") {
      this.setData(
        {
          showInputStatus: true,
          isScroll: "{{false}}"
        }
      );
    }
  },
  //input输入框值
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
    let mobile=this.data.mobile;
     let _this=this;
    let phonetel = /^1[3|4|5|8][0-9]\d{4,8}$/;
    if (mobile == "") {
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none',
        duration: 2000
      }) 
    } else if (!phonetel.test(mobile)) {
      wx.showToast({
        title: '手机格式不正确',
        icon: 'none',
        duration: 2000
      }) 
    } else if (mobile.length != 11) {
      wx.showToast({
        title: '手机长度有误',
        icon: 'none',
        duration: 2000
      })   
    }else{
      wx.request({
        url: 'http://192.168.50.1:8087/ssm',
        data:{
          iscode: mobile
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res){
          console.log(res.data.data);
          _this.setData({
             iscode:res.data.data
          })
          wx.showToast({
            title: '短信验证码已发送',
            icon: 'none',
            duration: 2000
          });
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
          },1000)
        }
      })
    }

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
      wx.showToast({
        title: '公司名称不能为空',
        icon: 'none',
        duration: 2000
      })     
    }
    else if(userName==""){
      wx.showToast({
        title: '用户不能为空',
        icon: 'none',
        duration: 2000
      }) 
    }else if(mobile==""){
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none',
        duration: 2000
      }) 
    }
    else if(code==""){
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 2000
      }) 
    }
    else if (!name.test(login)) {
      wx.showToast({
        title: '公司名称格式不正确',
        icon: 'none',
        duration: 2000
      })  
    }
  else if (!name.test(userName)) {
      wx.showToast({
        title: '姓名格式不正确',
        icon: 'none',
        duration: 2000
      }) 
    }
    else if (mobile.length != 11) {
      wx.showToast({
        title: '手机长度有误',
        icon: 'none',
        duration: 2000
      }) 
    } else if (!phonetel.test(mobile)) {
      wx.showToast({
        title: '手机格式不正确',
        icon: 'none',
        duration: 2000
      }) 
    }  
    else if(code!=iscode){
        wx.showModal({
          title: '信息提示',
          content: '验证码错误',
        })
    }
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