// pages/register/register.js
const app=getApp()
const api = require("../api/api.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    wx:"../tabs/wx.png",
    src_img:"../tabs/yz.jpg",
    xx:"../tabs/xx.png",
    showModal: false,  //显示隐藏
    statusBarHeight: app.globalData.statusBarHeight //获取iphonex的高度

    // canIUse:wx.canIUse('button.open-type.getUserInfo'),
    // isHide:false

  },
  bindGetUserInfo(event){
    let openid= app.globalData.openid;
    let _this=this;
    wx.showModal({
      title: '微信授权',
      content: '申请获得以下权限\r\n\r\n ❃ 获得你的公开信息(昵称，头像等)',
      showCancel: true, //是否显示取消按钮-----》false去掉取消按钮
      cancelText: "拒绝", //默认是“取消”
      cancelColor: '#7418b2', //取消文字的颜色
      confirmText: "授权", //默认是“确定”
      confirmColor: "#7418b2",
      success(res) {
        if (res.confirm) {
          wx.request({
            url: api.openId,
            data: {
              openId: openid
            },
            success(res) {
              // console.log(res)
              if (res.data.code == 10008) {
                _this.setData({
                  showModal: true
                })
              } else if (res.data.result.status == 2) {
                wx.redirectTo({
                  url: '/pages/defeated/defeated',
                })
                wx.showToast({
                  title: '加载中',
                  icon: 'loading'
                });
              } else if (res.data.result.status == 0) {
                wx.redirectTo({
                  url: '/pages/audit/audit',
                })
                wx.showToast({
                  title: '加载中',
                  icon: 'loading'
                });
              } else if (res.data.result.status == 1) {
                let phone = res.data.result.phone;
                let supcustNo = res.data.result.supcustNo;
                let supName = res.data.result.supName;
                wx.setStorage({
                  key: 'supcustNo',
                  data: supcustNo
                })
                wx.reLaunch({
                  url: '/pages/index/index?phone=' + phone + "&supcustNo=" + supcustNo + "&supName=" + supName,
                })
                wx.showToast({
                  title: '加载中',
                  icon: 'loading'
                });
              }           
            }
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '请先登录',
            icon:"none",
            duration:2000
          })
        }
      }
    })
  
  },
  //显示隐藏
  open: function () {
    this.setData({
      showModal: true
    })
  },
  login:function(){
    wx.redirectTo({
     url: '/pages/login/login'
   })
    wx.showToast({
      title: '加载中.',
      icon: 'loading'
    });
  },
  confirm: function () {
    this.setData({
      showModal: false
    })
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