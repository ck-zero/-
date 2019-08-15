Page({

    /**
     * 组件的属性列表
     */

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
          inmoney: 400.200002
    }, {
          id: 6,
          inmoney: 600
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
      date: '',          //至今少一年
      body:"2018-10-12",   //文本框开始时间
      mode:"2012-21-41",   //文本框结束时间
      today:"",          //至今  
      select: false,
      grade_name: '门店汇总',
      grades: '门店汇总',
      grades1: '产品汇总',
      grades2: '详情销售',
      supcustNo:"",
      row:""
  },

    /**
     * 组件的方法列表
     */
      onLoad: function () {
    let list = this.data.list;
    let max = this.data.list[0].inmoney
      for(let i = 1; i<list.length; i++) {
  let code = list[i].inmoney;
  code > max ? max = code : null
}
this.setData({
  row: max + max
})
//获取全局的公司编号
var that = this;
wx.getStorage({
  key: 'supcustNo',
  success: function (res) {
    console.log(res)
    that.setData({
      supcustNo: res.data
    })
  },
})
// 获取年月日
let timestamp = Date.parse(new Date());
let date = new Date(timestamp);
//获取年份  
let Y = date.getFullYear();
let Y1 = Y - 1;
//获取月份  
let M = (date.getMonth() + 1 < 10 ? '-0' + (date.getMonth() + 1) : date.getMonth() + 1);
//获取当日日期 
let D = date.getDate() < 10 ? '-0' + date.getDate() : date.getDate();
let today = Y + M + D;
let day = Y1 + M + D;
that.setData({
  date: day,
  body: day
})
that.setData({
  today: today,
  mode: today
})


  },

  // 左日期点击事件
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      body: e.detail.value
    })
  },
  // 右日期点击事件
  bindModeChange: function(e) {
    console.log(e)
    console.log('mode发送选择改变，携带值为', e.detail.value)
    this.setData({
      mode: e.detail.value
    })
  },
  //srcill组件的高度设置
  onLoad: function () {
    //获取设备高度
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
  // 门店汇总
  shop(e) {
    var name = e.currentTarget.dataset.name;
    console.log(name);
    this.setData({
      grade_name: name,
      select: false
    })
  },
  // 产品汇总
  product(e) {
    var name = e.currentTarget.dataset.name;
    console.log(name);
    this.setData({
      grade_name: name,
      select: false
    })
  },
  //详情
  particulars(e) {
    var name = e.currentTarget.dataset.name;
    console.log(name);
    this.setData({
      grade_name: name,
      select: false
    })
  },

})

