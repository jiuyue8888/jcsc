//app.js

App({
    data:{
        newsList:[]
    },
    globalData: {
        userInfo: null,
        api: {
            login: "api/Login/wxappLogin",
            help: "api/Assistant/helpList",//使用帮助
            newsList: "api/Assistant/newsList",//资讯列表
            postInfo: "api/Info/postInfo",//发布订单
            infoDetail: "api/Info/infoDetail",//订单详情
            mess: "api/Message/messageList",//系统消息列表
            messRead: "api/Message/messageRead",//标记系统消息已读
            messUnRead: "api/Message/unreadNum",//未读系统消息数量
            orderList: "api/Ordermessage/messageList",//订单消息列表
            noticeList: "api/Assistant/noticeList",//公告列表
            config: "api/Assistant/config",//客服电话
            withdraw: "api/User/withdraw",//提现申请
            invite: "api/User/invite",//邀请
            infoStatus: "api/Info/infoStatus",//支付成功后修改订单状态
            unreadNum: "api/Ordermessage/unreadNum",//未读订单消息数量
            messageRead: "api/Ordermessage/messageRead",//标记订单消息已读
        }
    },
    date: function (timestamp) {
        const data=new Date(timestamp*1000);
        return data.getFullYear()+'年'+(data.getMonth()+1)+'月'+data.getDate()+'日'
    },
    login:function(){
        const that = this;
        wx.login({
            success: function (resa) {
                console.log(resa)
                console.log(that.data.detail)
                if (resa.code) {
                    //发起网络请求
                    wx.request({
                        url: 'https://yds.banband.cn/' + that.globalData.api.login,
                        method: 'POST',
                        data: {
                            code: resa.code,
                            rawData:that.data.detail.rawData,
                            signature:that.data.detail.signature,
                            encryptedData:that.data.detail.encryptedData,
                            iv:that.data.detail.iv
                        },
                        header: {
                            'content-type': 'application/json'
                        },
                        success: function (res) {
                            console.log(res)
                        },
                        fail: function (res) {
                            console.log(res)
                        }
                    })

                }
            },
            fail: function (res) {
                console.log(res)
            }
        })
    },
    dataShow: function (api, data, call, fail) {
        const url = 'https://yds.banband.cn/' + api;
        const key = "e871d9b4e1447acfeff49cc58ec3ca6d";
        const nData = JSON.stringify(Object.assign(data, {user_id: '', token: ''}));
        var utilMd5 = require('./utils/md5.js');
        const apisign = utilMd5.hexMD5(key + JSON.stringify({user_id: '', token: ''}));
        wx.request({
            url: url,
            method: 'POST',
            data: {
                data: nData,
                apisign: apisign
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                call(res)
            },
            fail: function (res) {
                fail(res)
            }
        })
    }
})
