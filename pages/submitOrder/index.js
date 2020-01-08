//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        imageList: [''],
        picker: 0,
        order: ["泥土订购", "钢材订购", "砂石订购", "水泥订购"],
        region: ['广东省', '广州市', '海珠区']
    },
    formSubmit: function (e) {

        const data = {}
        Object.assign(data, e.detail.value);
        Object.assign(data, {
            type: Number(this.data.picker) + 1
        });

        console.log(this.data.imageList);

        this.data.imageList.pop();
        var arr = this.data.imageList;
        console.log(arr);
        app.dataShow('api/Upload/base64Upload', {
            content: arr
        }, function (url) {

            const _url = url.data.data.url;
            Object.assign(data, {
                images: _url
            });
            app.dataShow(app.globalData.api.postInfo, data, function (res) {
                console.log(res)
                wx.showToast({
                    title: '提交成功'
                })
                setTimeout(function(){
                    wx.navigateTo({
                        url: '../index/index'
                    });
                },1000)

            }, function (res) {
                console.log(res)
            })

        }, function (res) {
            console.log(res)
        })

    },
    onLoad: function (options) {
        this.setData({
            picker: options.order
        })
    },
    base64: function (url, type) {
        const that = this;
        wx.getFileSystemManager().readFile({
            filePath: url, //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: function (res) {
                var tempFilePaths = that.data.imageList;
                const u = 'data:image/' + type.toLocaleLowerCase() + ';base64,' + res.data;
                tempFilePaths.unshift(u);
                that.setData({
                    imageList: tempFilePaths
                });
            },
            fail: function (res) {
                console.log(res)
            }
        })

    },
    onChangeAddress: function () {
        var _page = this;
        console.log(111);
        wx.chooseLocation({
            success: function (res) {
                console.log(res)

                _page.setData({
                    chooseAddress: res.name
                });
            },
            fail: function (err) {
                console.log(err)
                wx.showModal({
                    title: '提醒',
                    content: '您拒绝了位置授权，将无法使用大部分功能，点击确定重新获取授权',
                    success:function(res) {
                        //如果点击确定
                        if (res.confirm) {
                            wx.openSetting({
                                success:function(res) {
                                    //如果同意了位置授权则userLocation=true
                                    if (res.authSetting["scope.userLocation"]) {
                                        that.onLoad()
                                    }
                                }
                            })
                        }
                    }
                })
            }
        });
    },
    chooseImage: function () {
        var that = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {

                that.base64(res.tempFilePaths[0], 'png')


            }
        })
    },
    previewImage: function (e) {
        var current = e.target.dataset.src;
        wx.previewImage({
            urls: this.data.imageList,
            current: current,
            success: function (e) {
                console.log("预览成功")
            }
        })
    },
    bindPickerChange: function (e) {
        this.setData({
            picker: e.detail.value
        })
    }

})
