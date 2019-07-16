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
    srcoll_height: 0,
    list: [{
      id: 1,
      inmoney: 40000.01,
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
    select: false,
    grade_name: '门店汇总',

    grades: ['门店汇总', '产品汇总', '详情销售',

    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function () {
      let windowHeight = wx.getSystemInfoSync().windowHeight;
      let windowWidth = wx.getSystemInfoSync().windowWidth;
      this.setData({
        srcoll_height: windowHeight * 750 / windowWidth - 200
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
