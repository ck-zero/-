// pages/login/login.js
const app=getApp();
const api=require("../api/api.js")
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
      supcustNo:"",       //公司id
      // openid: app.globalData.openid,
      bindSource: [],//绑定到页面的数据
      img:"../tabs/bj.jpg",
      img_gs:"../tabs/gs.jpg",
      img_xm:"../tabs/xm.jpg",
      img_dh:"../tabs/dh.jpg",
      img_yzm:"../tabs/yzm.jpg",
      statusBarHeight: app.globalData.statusBarHeight,     //top的头部自定义高度iPhonex
      bottom:""
  },
  //公司名称
  userLogoInput: function (e) {
    // console.log(e.detail.value)
    this.setData({
      login: e.detail.value
    })
    let _this = this;
    let login = this.data.login;
    let supcustNo=this.supcustNo;
    wx.request({
      url: api.supcust,
      data: {
        param: login
      },
      method: "get",
      success(res) {
        // console.log(res);
        let supname = res.data.result
        _this.setData({
          bindSource: supname
        })
      }
    })
  },
  //点击选型确定input值
  itemtap: function (e) {
    // console.log(e.target.dataset.statu)
    this.setData({
      login: e.target.id,
      supcustNo:e.target.dataset.statu,
      bindSource: []
    })  
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
    let code = this.data.code;
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
    //验证码接口
      wx.request({
        url: api.mobile,
        data:{
          phone: mobile
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res){
          if (res.data.message == 10003) {
            wx.showToast({
              title: '手机号无法使用',
              icon: 'none',
              duration: 2000
            })
          } else if (res.data.message != 10003){
          _this.setData({
            iscode:res.data.code
          })
          wx.showToast({
            title: '短信验证码已发送',
            icon: 'none',
            duration: 2000
          });
          }
          if (res == null || res.data == null) {
            console.error('网络请求失败');
            return;
          }

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
    let login=this.data.login;                  //公司名称
    let userName = this.data.userName;          //姓名
    let mobile=this.data.mobile;                //手机
    let code=this.data.code;                    //验证码
    let openid = app.globalData.openid;         //openid
    let supcustNo = this.data.supcustNo;        
    let iscode = this.data.iscode;             // 用于存放验证码接口取到code
    let status_id= 0                             //失败返给服务器为0
    if(login==""){
      wx.showToast({
        title: '公司名称不能为空',
        icon: 'none',
        duration: 2000
      })     
    }
    else if(userName==""){
      wx.showToast({
        title: '用户名不能为空',
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
    else{
      wx.setStorageSync("logo", login);
      wx.setStorageSync("name", userName);
      wx.setStorageSync("phon", mobile);
          wx.request({
            url: api.register,
            data: {
              supName: login,
              phone: mobile,
              name: userName,
              openid: openid,
              supcustNo: supcustNo,
              smsCode: code,
              status: status_id
            },
            method: "POST",
            header: {
              "content-type": "application/json"
            },
            success(res) {
              //  console.log(res)
              if (res.data.code == 10009) {
                wx.showToast({
                  title: '用户已存在',
                  icon: "none",
                  duration: 2000
                })
              }else if (res.data.code == 10006) {
                wx.showToast({
                  title: '验证码过期',
                  icon: 'none',
                  duration: 2000
                })
              } else if (res.data.code == 10007) {
                wx.showToast({
                  title: '验证码错误',
                  icon: 'none',
                  duration: 2000
                })
              } else {
                wx.redirectTo({
                  url: '/pages/audit/audit',
                })
              }
              
            }
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