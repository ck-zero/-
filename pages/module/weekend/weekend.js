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
    row: ""
  },

  /**
   * 组件的方法列表
   */
  pageLifetimes: {
    show: function () {
      // let list = this.data.list;
      // let max = this.data.list[0].inmoney
      // for (let i = 1; i < list.length; i++) {
      //   let code = list[i].inmoney;
      //   code > max ? max = code : null
      // }
      // this.setData({
      //   row: max + max
      // })
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
            url: api.sales,
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
      let _this=this;
      
      wx.request({
        url: api.sales,
        data: { supNo:supcustNo},
        success(res){
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
      this.setData({
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
        url: api.weekend,
        data: { supNo: supcustNo },
        success(res) {
          let list = res.data.result
          let row=list[0].sumPrice
          _this.setData({
            row:row,
            inText: list,
            conceal: false,
            hiding: true,
            notext: false
          })
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
      let supcustNo = this.data.supcustNo;
      wx.request({
        url: api.week,
        method: "get",
        data: {
          supNo: supcustNo
        }, success(res) {
          let result = res.data.result;
          let list=[];
          for(let key in result){
            let row=result[key][0].sumPrice
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
