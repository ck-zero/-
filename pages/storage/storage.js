// pages/storage/storage.js
const app=getApp();
const api = require("../api/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    srcoll_height:0,
    src: "../tabs/bj.jpg",
    src_img:"../tabs/jq.jpg",
    statusBarHeight: app.globalData.statusBarHeight,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _that = this;
    let windowHeight=wx.getSystemInfoSync().windowHeight;
    let windowWidth=wx.getSystemInfoSync().windowWidth;
    _that.setData({
      srcoll_height:windowHeight*750/windowWidth- 617 -30
    })
    wx.getStorage({
      key: 'supcustNo',
      success: function (res) {
        let supcustNo = res.data;
        wx.request({
          url: api.info,
          data: { supNo: supcustNo },
          success(res) {
            let result = res.data.result[0]
            _that.setData({
              list: result
            })
          }
        })
      },
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