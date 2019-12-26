//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list:[
      {
        title:'钢材订单',
        name:'XXX',
        phone:'13099993333',
        time:'2019-08-02 12:00',
        status:"1"
      },
      {
        title:'钢材订单',
        name:'XXX',
        phone:'13099993333',
        time:'2019-08-02 12:00',
        status:"2"
      },
      {
        title:'钢材订单',
        name:'XXX',
        phone:'13099993333',
        time:'2019-08-02 12:00',
        status:"3"
      }
    ]
  },
  onLoad:function(){
    app.dataShow(app.globalData.api.orderList,'GET',function(res){
      console.log(res);
    })
  }

})
