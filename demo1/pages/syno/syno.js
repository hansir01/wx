Page({
    data: {
        background: ['green', 'red', 'yellow'],
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1200,
        swipers:[{
            image:"/image/banner_01.jpg"
        },{
            image:"/image/banner_02.jpg"
        },{
            image:"/image/banner_03.jpg"
        },{
            image:"/image/banner_04.jpg"
        },{
            image:"/image/banner_05.jpg"
        }
        ],
        logos:[{
            image:"/image/menu_01.jpg",
            title:"学校简介"
        },{
            image:"/image/menu_02.jpg",
            title:"就业保障"
        },{
            image:"/image/menu_03.jpg",
            title:"专业设置"
        },{
            image:"/image/menu_04.jpg",
            title:"校园环境"
        },{
            image:"/image/menu_05.jpg",
            title:"新闻中心"
        },{
            image:"/image/menu_06.jpg",
            title:"名师风采"
        },{
            image:"/image/menu_07.jpg",
            title:"热门话题"
        },{
            image:"/image/menu_08.jpg",
            title:"点击咨询"
        }
        ],
    },
    changeIndicatorDots: function (e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeVertical: function (e) {
        this.setData({
            vertical: !this.data.vertical
        })
    },
    changeAutoplay: function (e) {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    intervalChange: function (e) {
        this.setData({
            interval: e.detail.value
        })
    },
    durationChange: function (e) {
        this.setData({
            duration: e.detail.value
        })
    }
})
