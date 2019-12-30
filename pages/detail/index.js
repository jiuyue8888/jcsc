//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        detail:{
            title:'',
            time:'',
            content:''
        }
    },
    onLoad: function (options) {
        const type = options.type;
        const that = this;
        switch (type) {
            case 'news':
                const id = options.id;
                app.data.newsList.map(function (item) {
                    if (id == item.id){
                        that.setData({
                            detail:{
                                title:item.title,
                                time:item.time,
                                content:item.content
                            }
                        })
                    }
                });
                break;
            case 'notice':
                app.data.noticeList.map(function (item) {
                    if (options.id == item.id){
                        that.setData({
                            detail:{
                                title:item.title,
                                time:item.time,
                                content:item.content
                            }
                        })
                    }
                });
                break;
            case 'help':
                app.dataShow(app.globalData.api[type], {}, function (res) {
                    console.log(res);
                    const data = res.data.data[0];
                    that.setData({
                        detail:{
                            title:data.title,
                            time:app.date(data.createtime),
                            content:data.content
                        }
                    })
                })
                break;

        }

    }

})
