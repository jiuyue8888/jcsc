
const app = getApp()

Page({
  data: {

  },
  onLoad:function(){
    app.dataShow(app.globalData.api.mess,'GET',function(res){
      console.log(res);
    })
  }

})
