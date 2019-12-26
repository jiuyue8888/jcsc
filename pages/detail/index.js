//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  onLoad:function(options){
    const api = options.api;
    console.log(app.globalData.api[api]);
    app.dataShow(app.globalData.api[api],'POST',function(res){
      console.log(res);
    })
  }

})
