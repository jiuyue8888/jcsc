var app = getApp();
Component({
    data: {
        curr: 0,

        nameList: [
            {
                "selectedIconPath": "../../img/nav-hover-1.png",
                "iconPath": "../../img/nav-1.png",
                "pagePath": "../index/index",
                "text": "首页"
            },
            {
                "selectedIconPath": "../../img/nav-hover-2.png",
                "iconPath": "../../img/nav-2.png",
                "pagePath": "../forum/index",
                "text": "论坛"
            },
            {
                "selectedIconPath": "../../img/nav-hover-3.png",
                "iconPath": "../../img/nav-3.png",
                "pagePath": "../mess/index",
                "text": "消息"
            },
            {
                "selectedIconPath": "../../img/nav-hover-4.png",
                "iconPath": "../../img/nav4.png",
                "pagePath": "../my/index",
                "text": "我的"
            }
        ]
    },
    methods: {
        show: function (curr) {
            this.setData({
                curr:curr
            })
        },

        btnClick:function(e){
            const url = e.currentTarget.dataset.url;

            const st = setInterval(function(){
                const userId = app.data.user_id;
                if(userId!=''&&userId!=undefined&&userId!=null){

                    clearInterval(st);
                    wx.redirectTo({
                        url: url
                    })
                }

            },300)

        }}

})