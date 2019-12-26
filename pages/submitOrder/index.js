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
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
    },
    onLoad: function (options) {
        this.setData({
            picker: options.order
        })
    },
    onChangeAddress: function () {
        var _page = this;
        wx.chooseLocation({
            success: function (res) {
                _page.setData({
                    chooseAddress: res.name
                });
            },
            fail: function (err) {
                console.log(err)
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
                // console.log(res)
                /*wx.showToast({
                 title:'正在上传',
                 icon:'loading',
                 mask:true,
                 duration: 100
                 })*/
                var tempFilePaths = that.data.imageList;
                tempFilePaths.unshift(res.tempFilePaths);
                console.log(tempFilePaths)
                that.setData({
                    imageList: tempFilePaths
                });
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
