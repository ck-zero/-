const app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    srcoll_height:0,
    navbarActiveIndex: 0,
    navbarTitle: [
      "本日",
      "本周",
      "本月",
      "本季度",
      "自定义"
    ],
    statusBarHeight:app.globalData.statusBarHeight
  },
  /**
  * 点击导航栏
  */
  onNavBarTap: function (event) {
    // 获取点击的navbar的index
    let navbarTapIndex = event.currentTarget.dataset.navbarIndex
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: navbarTapIndex
    })
  },

  /**
   * 
   */
  onBindAnimationFinish: function ({ detail }) {
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: detail.current
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取手机的高度宽度
    let windowHeight = wx.getSystemInfoSync().windowHeight;
    let windowWidth = wx.getSystemInfoSync().windowWidth;
    this.setData({
      srcoll_height: windowHeight * 750 / windowWidth -270
    })
    // let that = this;
    // wx.getSystemInfo({
    //   success: function (res) {
    //     that.setData({
    //       srcoll_height: res.windowHeight
    //     })
    //   },
    // })
  },

})
