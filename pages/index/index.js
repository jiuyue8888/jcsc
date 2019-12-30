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
        tips: [],
        newsList: []
    },
    onLoad: function () {
        const that = this;
        app.dataShow(app.globalData.api.newsList, {}, function (res) {
            const arr=[];
            const data = res.data.data;
            data.map(function(item){
                arr.push({
                    img: 'https://yds.banband.cn'+item.img,
                    title: item.title,
                    content: item.content,
                    id: item.id,
                    url:item.content_url,
                    time: app.date(item.createtime)
                })
            })
            that.setData({
                newsList:arr
            })
            app.data.newsList = arr;
        }, function (res) {
            console.log(res)
        })

        app.dataShow(app.globalData.api.noticeList, {}, function (res) {
            console.log(res)
            const data = res.data.data;
            const brr=[];
            data.map(function(item){
                brr.push({
                    img: item.image,
                    title: item.title,
                    content: item.content,
                    id: item.id,
                    url:item.content_url,
                    time: app.date(item.createtime)
                })
            })
            that.setData({
                tips:brr
            })
            app.data.noticeList = brr;

        }, function (res) {
            console.log(res)
        })
    },
    getUserInfo:function(e){
        console.log(e)
        app.data.detail = e.detail;
        app.login();
    },
    navClick: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../submitOrder/index?order='+id
        });


    }

})
