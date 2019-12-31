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
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title:'123',
      path:'pages/share/index'
    }
  },
  inviteFun:function(){
    console.log(111)
    app.dataShow(app.globalData.api.invite,{
      invitecode:this.data.contents,
      userid:''
    },function(res){
      console.log(res)
    },function(){
      console.log(res)
    })
  }

})
