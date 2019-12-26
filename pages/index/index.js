//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        autoplay: true,
        circular: true,
        interval: 3000,
        banner: [
            "../../img/banner.png",
            "../../img/mybg.png"
        ],
        nav: ["泥土订购", "钢材订购", "砂石订购", "水泥订购"],
        tips: ['这里是放置品台消息通告滚动条的', '111', '222'],
        newsList: [
            {
                img: '../../img/kv.png',
                title: '这里是标题1',
                content: '在2月2日证监会例行新闻发布会上，针对今年1月沪港深基金提交申报的数量是否出',
                time: '2019年12月1日'
            },
            {
                img: '../../img/kv.png',
                title: '这里是标题2',
                content: '这里是内容2',
                time: '2019年12月2日'
            },
            {
                img: '../../img/kv.png',
                title: '这里是标题3',
                content: '这里是内容3',
                time: '2019年12月3日'
            },
        ]
    },
    onLoad: function () {
        app.dataShow(app.globalData.api.newsList, {}, function (res) {
            console.log(res)
        }, function (res) {
            console.log(res)
        })
    },
    navClick: function (e) {
        var id = e.currentTarget.dataset.id;

        wx.login({
            success: function (resa) {
                console.log(resa)
                if (resa.code) {
                    //发起网络请求
                    app.dataShow(app.globalData.api.login, {
                        code: resa.code
                    }, function (res) {
                        console.log(res)
                        wx.navigateTo({
                            url: '../submitOrder/index?order='+id
                        });
                    }, function (res) {
                        console.log(res)
                    })
                }
            },
            fail: function (res) {
                console.log(res)
            }
        })
    }

})
