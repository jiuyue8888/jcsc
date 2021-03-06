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
            infoList: "api/Info/infoList",//订单列表/论坛列表
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

    dataShow: function (api, data, call, fail,type) {
        const url = 'https://yds.banband.cn/' + api;
        const key = "e871d9b4e1447acfeff49cc58ec3ca6d";

        const that = this;
        const user_id = that.data.user_id
        const token = that.data.token
        var nData = data

        if(type=='forum'){
            nData = JSON.stringify(Object.assign(data, {
                user_id: '',
                token: ''
            }));
        }else{
            nData = JSON.stringify(Object.assign(data, {
                user_id: user_id?user_id:'',
                token: token?token:''
            }));
        }

        var utilMd5 = require('./utils/md5.js');
        const apisign = utilMd5(key+nData);
        wx.request({
            url: url,
            method: 'POST',
            data: {
                data: nData,
                apisign: apisign
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
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
