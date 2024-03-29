//app.js
const api = require("pages/api/api.js")
App({
  onLaunch: function () {
    //获取设备手机型号
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())

    wx.setStorageSync('logs', logs)
    wx.checkSession({
      success:function(res){
    
      },
      fail:function(res){
        wx.login();
      }
    })

    // 登录
    wx.login({
      success: res => {
        if(res.code){
        //  console.log(res)
        let code=res.code;
        let that=this;
        wx.request({
          url: api.code,
          data:{
            code:code
          },
          method:"get",
          header:{
            "Content-Type": "application/json;charset=UTF-8"
          },
          success:function(res){
            //  console.log(res)
            that.globalData.openid=res.data.result.openid;
            that.globalData.session = res.data.result.session_key;
            wx.setStorageSync("LoginSessionKey", that.globalData.session)
          }

        })
        }
    
      },fail:function(){
        console.log("登录时网络错误")
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        // console.log(res.authSetting[])
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    statusBarHeight:wx.getSystemInfoSync()['statusBarHeight'],
    openid:"",
    session:"",
  }
})