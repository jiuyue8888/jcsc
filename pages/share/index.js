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

})
