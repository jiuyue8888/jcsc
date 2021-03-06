//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list:[

    ]
  },
  onLoad:function(){

    const that = this;

    app.dataShow(app.globalData.api.infoList, {}, function (res) {
      console.log(res)
      const data = res.data.data;
      const arr=[];

      data.map(function(item){
        arr.push({
          pic:'https://yds.banband.cn'+item.user.avatar,
          add:item.area,
          name:item.user.nickname,
          phone:item.phone,
          text:item.status_text,
          status:item.status,
          img: item.images.split(',')[0],
          title: item.category_name,
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
