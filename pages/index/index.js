//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    nav:["泥土订购","钢材订购","砂石订购","水泥订购"],
    tips:['这里是放置品台消息通告滚动条的','111','222'],
    newsList:[
      {
        img:'../../img/kv.png',
        title:'这里是标题1',
        content:'在2月2日证监会例行新闻发布会上，针对今年1月沪港深基金提交申报的数量是否出',
        time:'2019年12月1日'
      },
      {
        img:'../../img/kv.png',
        title:'这里是标题2',
        content:'这里是内容2',
        time:'2019年12月2日'
      },
      {
        img:'../../img/kv.png',
        title:'这里是标题3',
        content:'这里是内容3',
        time:'2019年12月3日'
      },
    ]
  },
  navClick:function(){
    wx.navigateTo({
      url: '../detail/index'
    });
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'Our Server ApiUrl',
            data: {
              code: res.code
            },
            success: function (res) {
              const self = this
              if (逻辑成功) {
                //获取到用户凭证 存儲 3rd_session
                var json = JSON.parse(res.data.Data)
                wx.setStorage({
                  key: "third_Session",
                  data: json.third_Session
                })
                getUserInfo()
              }
              else {

              }
            },
            fail: function (res) {

            }
          })
        }
      },
      fail: function (res) {

      }
    })
  }

})
