const app = getApp()

Page({
    data: {
        list: [],
        list1: []
    },
    onLoad: function () {
        this.compData = this.selectComponent("#comp");
        this.compData.show(2);
        const that = this;
        app.dataShow(app.globalData.api.mess, {}, function (res) {
            const arr = [];
            const data = res.data.data;
            data.map(function (item) {

                arr.push({
                    title: item.title,
                    id: item.id,
                    status: item.status,
                    type: item.type,
                    content: item.intro,
                    time: app.date(item.createtime),
                })
            })
            app.data.messList = arr;
            that.setData({
                list: arr
            })
        }, function (res) {
            console.log(res);
        })

        app.dataShow(app.globalData.api.orderList, {}, function (res) {
            const arr = [];
            const data = res.data.data;
            data.map(function (item) {

                arr.push({
                    title: item.title,
                    id: item.id,
                    mid: item.message_id,
                    status: item.status,
                    type: item.type,
                    content: item.intro,
                    time: app.date(item.createtime),
                })
            })
            app.data.messageList = arr;
            that.setData({
                list1: arr
            })
        }, function (res) {
            console.log(res);
        })
    },
    onShow: function () {this.onLoad();},
    messClick: function (e) {
        var type = e.currentTarget.dataset.type;
        var id = e.currentTarget.dataset.id;
        var mid = e.currentTarget.dataset.mid;


        if (type == 1) {
            app.dataShow(app.globalData.api.messRead, {
                id:mid
            }, function (res) {
                wx.navigateTo({
                    url: '../detail/index?type=mess&id='+id
                });
            }, function (res) {
                console.log(res);
            })
        } else {
            app.dataShow(app.globalData.api.messageRead, {
                id:mid
            }, function (res) {
                wx.navigateTo({
                    url: '../detail/index?type=message&id='+id
                });
            }, function (res) {
                console.log(res);
            })
        }
    }

})
