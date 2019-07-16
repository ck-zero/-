Page({
  // 页面的初始数据
  data: {
    showInputStatus: false,
    inputValue: '',//点击结果项之后替换到文本框的值
    adapterSource: ["app", "application", "apply", "weixin", "WeiXin"],//本地匹配源
    bindSource: [],//绑定到页面的数据，根据用户输入动态变化
  },
  bindKeyInput: function (e) {
    var currentInputStatu = e.currentTarget.dataset.statu;
    var prefix = e.detail.value//用户实时输入值
    var newSource = []//匹配的结果
    if (prefix != "") {
      this.setData(
        {
          showBtnStatus1: false,
          showBtnStatus2: true
        }
      );
      this.data.adapterSource.forEach(function (e) {
        if (e.indexOf(prefix) != -1) {//返回某个指定的字符串值在字符串中首次出现的位置,如果要检索的字符串值没有出现，则该方法返回 -1
          newSource.push(e)
        }
      })
    } else {
      currentInputStatu = "close";
      this.setData(
        {
          isScroll: true,
          showBtnStatus1: true,
          showBtnStatus2: false
        }
      );
    }
    if (newSource.length != 0) {
      this.setData({
        bindSource: newSource
      })
    } else {
      this.setData({
        bindSource: []
      })
      currentInputStatu = "close";
      this.setData(
        {
          isScroll: "{{false}}"
        }
      );
    }
    //关闭 
    if (currentInputStatu == "close") {
      this.setData(
        {
          showInputStatus: false,
          isScroll: true
        }
      );
    }
    // 显示 
    if (currentInputStatu == "open") {
      this.setData(
        {
          showInputStatus: true,
          isScroll: "{{false}}"
        }
      );
    }
  },
  //点击选型确定input值
  itemtap: function (e) {
    var currentInputStatu = e.currentTarget.dataset.statu;
    this.setData({
      inputValue: e.target.id,
      bindSource: []
    })
    //关闭 
    if (currentInputStatu == "close") {
      this.setData(
        {
          showInputStatus: false,
          isScroll: true
        }
      );
    }
    // 显示 
    if (currentInputStatu == "open") {
      this.setData(
        {
          showInputStatus: true,
          isScroll: "{{false}}"
        }
      );
    }
  }
})