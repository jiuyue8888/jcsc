//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imageList:[''],
    order:'水泥订购',
    region: ['广东省', '广州市', '海珠区']
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  chooseImage:function(){
    var that =this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success:function(res) {
        // console.log(res)
        /*wx.showToast({
          title:'正在上传',
          icon:'loading',
          mask:true,
          duration: 100
        })*/
        var tempFilePaths = that.data.imageList;
        tempFilePaths.unshift(res.tempFilePaths);
        console.log(tempFilePaths)
        that.setData({
          imageList: tempFilePaths
        });
      }
    })
  },
  previewImage:function(e){
    var current = e.target.dataset.src;
    wx.previewImage({
      urls:this.data.imageList,
      current: current,
      success:function(e){
        console.log("预览成功")
      }
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  }

})
