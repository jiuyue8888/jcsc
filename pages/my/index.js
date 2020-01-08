//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    name:'这里是用户昵称',
    pic:'../../img/pic.png',
    num:'666',
    tel:''
  },
  call:function(){
    const that  = this;
    wx.makePhoneCall({
      phoneNumber:that.data.tel
    })
  },
  onLoad:function(){
    const that= this;
    this.compData = this.selectComponent("#comp");
    this.compData.show(3);
    this.setData({
      num:app.data.money,
      nickname:app.data.nickname,
      avatar:app.data.avatar
    })
    app.dataShow(app.globalData.api.config, {
      name:'service_tel'
    }, function (res) {
      console.log(res);
      that.setData({
          tel:res.data.data.content
      })
    })
  }

})
