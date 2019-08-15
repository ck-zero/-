// pages/module/market/market.js
const api = require("../../api/api.js")
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
    list: [],
    collect:[],
    inText: [],
    conceal: "",
    hiding: "",
    notext: "",
    select: false,
    grade_name: '门店汇总',
    grades: '门店汇总',
    grades1: '产品汇总',
    grades2: '详情销售',
    supcustNo: "",
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
        success: function (res) {
   
          that.setData({
            supcustNo: res.data
          })
          let sup = res.data;
          wx.request({
            url: api.quarterly,
            data: { supNo: sup },
            success(res) { 
              let list = res.data.result
              let row = list[0].sumPrice
              that.setData({
                row: row,       
                collect: list,
                conceal: false,
                notext: true,
                hiding: false
              })
            }
          })
        },
      })
    },
  },
  methods: {
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
      let supcustNo = this.data.supcustNo;
      let _this = this;
      wx.request({
        url: api.quarterly,
        data: { supNo: supcustNo },
        success(res) {
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
      })
      _this.setData({
        grade_name: name,
        select: false
      })
    },
    // 产品汇总
    product(e) {
      var name = e.currentTarget.dataset.name;
      let supcustNo = this.data.supcustNo;
      let _this = this;
      wx.request({
        url: api.account,
        data: { supNo: supcustNo },
        success(res) {
          let list = res.data.result
          let row = list[0].sumPrice
          _this.setData({
            row: row,
            inText: res.data.result,
            conceal: false,
            hiding: true,
            notext: false
          })
        }
      })
      _this.setData({
        grade_name: name,
        select: false
      })
    },
    //详情
    particulars(e) {
      var name = e.currentTarget.dataset.name;
      let _this = this;
      let supcustNo = this.data.supcustNo;
      wx.request({
        url: api.quarter,
        method: "get",
        data: {
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
