
const app = getApp()

Page({
  data: {

  },
  onLoad:function(){
    app.dataShow(app.globalData.api.mess,{},function(res){
      console.log(res);
    },function(res){
      console.log(res);
    })

    app.dataShow(app.globalData.api.orderList,{},function(res){
      console.log(res);
    },function(res){
      console.log(res);
    })
  }

})
