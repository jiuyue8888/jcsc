//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imageList:[''],
    order:'水泥订购',
    money:0,
    region: ['广东省', '广州市', '海珠区']
  },
  onLoad:function(){
    this.setData({
      money:app.data.money
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    app.dataShow(app.globalData.api.withdraw,e.detail.value,function(res){
      console.log(res)
      wx.showToast({
        title:res.data.info
      })

      setTimeout(function(){
        wx.navigateTo({
          url: '../my/index'
        });
      },1000)

    },function(res){
      console.log(res)
    })
  }

})
