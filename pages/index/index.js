//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        autoplay: true,
        circular: true,
        interval: 3000,
        banner: [],
        nav: ["泥土订购", "钢材订购", "砂石订购", "水泥订购"],
        tips: [],
        newsList: []
    },

    onLoad: function () {
        const that = this;

        this.compData = this.selectComponent("#comp");
        this.compData.show(0);
        app.dataShow('api/Info/categoryList', {},function (res) {
            console.log(res)
            const brr = [];
            res.data.data.map(function(item){
                brr.push({
                    img:item.image,
                    name:item.name
                })
            })
            that.setData({
                nav:brr
            })
        }, function (res) {
            console.log(res)
        })
        app.dataShow('api/Assistant/banners', {
            type:1
        }, function (res) {
            console.log(res)
            const arr = [];
            res.data.data.map(function(item){
                arr.push('https://yds.banband.cn/'+item.image)
            })
            that.setData({
                banner:arr
            })
        }, function (res) {
            console.log(res)
        })
        //获取资讯列表
        app.dataShow(app.globalData.api.newsList, {}, function (res) {
            const arr = [];
            const data = res.data.data;
            data.map(function (item) {
                arr.push({
                    img: 'https://yds.banband.cn' + item.img,
                    title: item.title,
                    content: item.content,
                    id: item.id,
                    url: item.content_url,
                    time: app.date(item.createtime)
                })
            })
            that.setData({
                newsList: arr
            })
            app.data.newsList = arr;
        }, function (res) {
            console.log(res)
        })

        //  获取公告
        app.dataShow(app.globalData.api.noticeList, {}, function (res) {
            console.log(res)
            const data = res.data.data;
            const brr = [];
            data.map(function (item) {
                brr.push({
                    img: item.image,
                    title: item.title,
                    content: item.content,
                    id: item.id,
                    url: item.content_url,
                    time: app.date(item.createtime)
                })
            })
            that.setData({
                tips: brr
            })
            app.data.noticeList = brr;

        }, function (res) {
            console.log(res)
        })
    },
    getUserInfo: function (e) {

        const that = this;
        const userId = app.data.user_id;

        wx.setStorageSync('detail', e.detail);


        if (userId != '' && userId != undefined && userId != null) {
            return;
        }
        wx.login({
            success: function (resa) {
                const detail = e.detail;

                console.log(detail)

                if (resa.code) {
                    //发起网络请求
                    console.log(detail.signature)
                    app.dataShow(app.globalData.api.login, {
                        code: resa.code,
                        rawData: detail.rawData,
                        encryptedData: detail.encryptedData,
                        iv: detail.iv,
                        signature: detail.signature,
                    }, function (res) {

                        if (res.data.data !== null) {
                            app.data.user_id = res.data.data.user_id;
                            app.data.token = res.data.data.token;
                            app.data.invitecode = res.data.data.invitecode;
                            app.data.money = res.data.data.money;
                            app.data.avatar = res.data.data.avatar;
                            app.data.nickname = res.data.data.nickname;
                            app.data.openid = res.data.data.openid;

                        }else{
                           /* wx.showToast({
                             title: res.data.info
                             })*/
                            //that.getUserInfo();
                        }


                    }, function (res) {


                    })


                }
            },
            fail: function (res) {
                console.log(res)
            }
        })


    },
    shareClick: function () {


        const st = setInterval(function () {
            const userId = app.data.user_id;
            if (userId != '' && userId != undefined && userId != null) {
                console.log(userId)
                clearInterval(st);
                wx.navigateTo({
                    url: '../share/index'
                });
            }

        }, 300)


    },
    navClick: function (e) {
        var id = e.currentTarget.dataset.id;
        const st = setInterval(function () {
            const userId = app.data.user_id;
            if (userId != '' && userId != undefined && userId != null) {

                clearInterval(st);
                wx.navigateTo({
                    url: '../submitOrder/index?order=' + id
                });
            }

        }, 300)

    }

})
