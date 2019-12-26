//app.js
App({
    globalData: {
        userInfo: null,
        api: {
            login:"api/Login/wxappLogin",
            help: "api/Assistant/helpList",//使用帮助
            newsList:"api/Assistant/newsList",//资讯列表
            postInfo:"api/Info/postInfo",//发布订单
            infoDetail:"api/Info/infoDetail",//订单详情
            mess: "api/Message/messageList",//系统消息列表
            messRead:"api/Message/messageRead",//标记系统消息已读
            messUnRead:"api/Message/unreadNum",//未读系统消息数量
            orderList: "api/Ordermessage/messageList",//订单消息列表
            noticeList:"api/Assistant/noticeList",//公告列表
            config:"api/Assistant/config",//客服电话
            withdraw:"api/User/withdraw",//提现申请
            invite:"api/User/invite",//邀请
            infoStatus:"api/Info/infoStatus",//支付成功后修改订单状态
            unreadNum:"api/Ordermessage/unreadNum",//未读订单消息数量
            messageRead:"api/Ordermessage/messageRead",//标记订单消息已读
        }
    },
    dataShow: function (api, data, call,fail) {
        const url = 'https://yds.banband.cn/' + api;
        wx.request({
            url: url,
            method: 'POST',
            data: {},
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                call(res)
            },
            fail:function(res){
                fail(res)
            }
        })
    }
})
