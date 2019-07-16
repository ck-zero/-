// pages/module/market/market.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    srcoll_height:0,
    list: [{
      id: 1,
      inmoney: 10000.01,
    },
    {
      id: 2,
      inmoney: 30000.10
    }, {
      id: 3,
      inmoney: 20000.20
    }, {
      id: 4,
      inmoney: 10000.02
    }, {
      id: 5,
      inmoney: 4000.200002
    }, {
      id: 6,
      inmoney: 36000
    }, {
      id: 7,
      inmoney: 16000
    }, {
      id: 8,
      inmoney: 24000
    }, {
      id: 9,
      inmoney: 32000
    }],
    date: '2018-01-01',
    mode:"2019-03-02",
    select: false,
    grade_name: '门店汇总',
    grades: ['门店汇总', '产品汇总', '详情销售',]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 左日期点击事件
    bindDateChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        date: e.detail.value
      })
    },
    // 右日期点击事件
    bindModeChange:function(e){
      console.log('mode发送选择改变，携带值为', e.detail.value)
      this.setData({
        mode: e.detail.value
      })
    },
    //srcill组件的高度设置
    onLoad: function () {
      let windowHeight = wx.getSystemInfoSync().windowHeight;
      let windowWidth = wx.getSystemInfoSync().windowWidth;
      this.setData({
        srcoll_height: windowHeight * 750 / windowWidth - 600
      })
    },
    // 点击按钮隐藏
    bindShowMsg() {
      this.setData({
        select: !this.data.select
      })
    },/**

* 已选下拉框 */
    mySelect(e) {
      var name = e.currentTarget.dataset.name;
      console.log(name);
      this.setData({
        grade_name: name,
        select: false
      })
    },
  }
})
