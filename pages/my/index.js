//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    name:'这里是用户昵称',
    pic:'../../img/pic.png',
    num:'666'
  },
  call:function(){
    wx.makePhoneCall({
      phoneNumber:'13641286838'
    })
  },
  onLoad:function(){
    const that= this;
    app.dataShow(app.globalData.api.config, {
      name:'service_tel'
    }, function (res) {
      console.log(res);
      that.setData({

      })
    })
  }

})
