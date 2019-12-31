//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    contents:'45T4NL',
  },
  copyText: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {

            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  onLoad:function(){
    wx.showShareMenu();
  },
  onShareAppMessage:function(){
    return {
      title:'123',
      path:'pages/share/index'
    }
  },
  inviteFun:function(){
    app.dataShow(app.globalData.api.invite,{
      invitecode:this.data.contents,
      userid:app.globalData.user_id?app.globalData.user_id:''
    },function(res){
      console.log(res)
      wx.showModal({
        content:res.data.info
      })
    },function(){
      console.log(res)
    })
  }

})
