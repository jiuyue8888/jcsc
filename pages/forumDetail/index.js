//index.js
//获取应用实例
const app = getApp()

Page({
    data: {},
    onLoad: function (options) {
        const id = options.id;
        const that = this;

        app.dataShow(app.globalData.api.infoDetail, {
            id: id
        }, function (res) {
            that.setData({
                id: id,
                status:app.data.openid==res.data.data.userinfo.openid,
                st:res.data.data.status,
                area: res.data.data.area,
                content: res.data.data.content,
                images: res.data.data.images.length > 1 ? res.data.data.images.split(',') : res.data.data.images,
                category_name: res.data.data.userinfo.nickname,
                createtime: app.date(res.data.data.createtime),
                reply: res.data.data.reply,
                avatar: res.data.data.userinfo.avatar,
                time: app.date(res.data.data.reply.createtime),
                imgs: res.data.data.reply.images != null ? res.data.data.reply.images.split(',') : ''
            })
        }, function (res) {
            console.log(res);
        })
    },
    payClick: function () {
        const that = this;
        app.dataShow('api/User/orderPay', {
            pay_type: 1,
            from: 2,
            info_id: that.data.id,
            openid:app.data.openid
        }, function (res) {
            console.log(res)
            that.doWxPay(res.data.data);
        }, function (res) {
            console.log(res)
        })
    },
    doWxPay: function (param) {
        const that = this;
       wx.requestPayment({
            timeStamp: param.wechat.timestamp,//记住，这边的timeStamp一定要是字符串类型的，不然会报错
            nonceStr: param.wechat.nonceStr,
            package: param.wechat.package,
            signType: 'MD5',
            paySign: param.wechat.paySign,
            success: function (event) {
                console.log(event);

                app.dataShow(app.globalData.api.infoStatus, {
                    id: that.data.id
                }, function (res) {
                    console.log(res);
                    wx.showToast({
                        title: res.data.info,
                        icon: 'success',
                        duration: 2000
                    });
                }, function (res) {
                    console.log(res);
                })
            },

            fail: function (error) {
                console.log("支付失败")
                console.log(error)
            },

            complete: function () {
                console.log("pay complete")
            }

        });

    },
    clickImg: function (e) {
        var imgUrl = e.target.dataset.url;

        wx.previewImage({
            urls: [imgUrl], //需要预览的图片http链接列表，注意是数组
            current: imgUrl, // 当前显示图片的http链接，默认是第一个
            success: function (res) {

            },
            fail: function (res) {
                console.log(res)
            },
            complete: function (res) {

            },
        })
    }

})
