//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    contents:app.globalData.invitecode,
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
    //wx.showShareMenu();
    this.setData({
      contents:app.data.invitecode,
    })
  },
  onShareAppMessage:function(res){
    console.log(res)

    return {
      title:'123',
      path:'pages/share/index',
      success: function(res){
        console.log(res)
      },
      fail: function(){
        console.log(res)
      },
      complete: function(res){
      console.log(res)
    }
    }
  },
  inviteFun:function(){
    app.dataShow(app.globalData.api.invite,{
      invitecode:this.data.contents,
      userid:app.globalData.user_id?app.globalData.user_id:''
    },function(res){
      console.log(res)
      wx.showToast({
        title:res.data.info
      })
    },function(){
      console.log(res)
    })
  }

})
