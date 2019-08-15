// pages/module/market/market.js
const api = require("../../api/api.js")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    'sendValue': {
      type: String, //必填，目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: "",
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    srcoll_height:0,
    list: [],
    collect:[],
    inText:[],
    conceal: "",
    hiding: "",
    notext: "",
    day: '',          //至今少一年
    body:"",   //文本框开始时间
    mode:"",   //文本框结束时间
    today:"",          //至今  
    select: false,
    grade_name: '-请选择-',
    grades: '门店汇总',
    grades1: '产品汇总',
    grades2: '详情销售',
    supcustNo:"",
    row:""
  },

  /**
   * 组件的方法列表
   */
  pageLifetimes: {
    show: function () {
      //获取全局的公司编号
      var that = this;
      wx.getStorage({
        key: 'supcustNo',
        success: function(res) {
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
      let Y1=Y-1;
      //获取月份  
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      //获取当日日期 
      let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      let today=Y+"-"+M+"-"+D;
      let day = Y1 + "-" + M + "-" + D;
      that.setData({
        day:day,
        body:day
      })
      that.setData({
        today:today,
        mode:today
      })

    },
  },
  methods: {
    // 左日期点击事件
    bindDateChange: function (e) {
      this.setData({
        body: e.detail.value,
        grade_name: '-请选择-'
      })
    },
    // 右日期点击事件
    bindModeChange:function(e){   
      this.setData({
        mode: e.detail.value,
        grade_name: '-请选择-'
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
      let body = this.data.body;
      let mode=this.data.mode;
      let supcustNo=this.data.supcustNo;
      let _this=this;
      wx.request({
        url: api.userDefined,
        data:{
          starDate:body,
          endDate:mode,
		      supNo:supcustNo  
        },
        success(res){
          if (res.data.code == 10000){
            let list = res.data.result
            let row = list[0].sumPrice
            _this.setData({
              row: row,
              collect: list,
              conceal: false,
              notext: true,
              hiding: false
            })
          }
          if(res.data.result==""){
            wx.showToast({
              title: '没有该时间的数据',
              icon: 'none',
              duration: 2000
            }) 
            _this.setData({
              grade_name: '-请选择-'
            })
          }
        }
      })
      _this.setData({
        grade_name: name,
        select: false
      })
    },
    // 产品汇总
    product(e) {
      var name = e.currentTarget.dataset.name;
      let body = this.data.body;
      let mode = this.data.mode;
      let supcustNo = this.data.supcustNo;
      let _this = this;
      wx.request({
        url: api.custom,
        data: {
          starDate: body,
          endDate: mode,
          supNo: supcustNo
        },
        success(res) {
          if(res.data.code==10000){
            let list = res.data.result
            let row = list[0].sumPrice
            _this.setData({
              row: row,
              inText: list,
              conceal: false,
              hiding: true,
              notext: false
            })
          }
          if (res.data.result == "") {
            wx.showToast({
              title: '没有该时间的数据',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
      this.setData({
        grade_name: name,
        select: false
      })
    },
    //详情
    particulars(e) {
      var name = e.currentTarget.dataset.name;
      let _this = this;
      let body = this.data.body;
      let mode = this.data.mode;
      let supcustNo = this.data.supcustNo;
      wx.request({
        url: api.stom,
        method: "get",
        data: {
          starDate: body,
          endDate: mode,
          supNo: supcustNo
        }, success(res) {
          let result = res.data.result;
          let list = [];
          for (let key in result) {
            let row = result[key][0].sumPrice
            list.push(row)
          }
          var max = list.reduce(function (a, b) {
            return b > a ? b : a;
          });
          _this.setData({
            row:max,
            list: result,
            hiding: false,
            conceal: true,
            notext: false
          })
        }
      })
      this.setData({
        grade_name: name,
        select: false
      })
    },
  }
})
