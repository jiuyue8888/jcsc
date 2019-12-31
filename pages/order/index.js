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

    const that = this;
    app.dataShow(app.globalData.api.orderList, {}, function (res) {
      console.log(res)
      const data = res.data.data;
      const arr=[];
      /*

       'https://yds.banband.cn'+
       * */
      data.map(function(item){
        arr.push({
          pic:'https://yds.banband.cn'+item.user.avatar,
          add:item.area,

          img: item.images.split(',')[0],
          title: item.name,
          content: item.content,
          id: item.id,
          url:item.content_url,
          time: app.date(item.createtime)
        })
      })
      that.setData({
        list:arr
      })
      app.data.infoList = arr;
    }, function (res) {
      console.log(res)
    })
  }

})
