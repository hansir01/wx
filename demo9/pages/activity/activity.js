var app = getApp()
Page({
    data: {
        shopList: [],
        locationCity: ''
    },
    loadBanner: function () {
        var _this = this;
        wx.request({
            url: 'https://www.youzhu.com/api/adimg/getimage?time=' + new Date(),
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'post',
            data: { location: 3 },
            success: function (res) {
                console.log(res)
                wx.hideLoading()
                // wx.stopPullDownRefresh()
                if (res.data.errorNo >= 0) {
                    _this.setData({
                        shopList: res.data.data
                    })
                }
            }
        })
    },
    onPullDownRefresh: function () {
        this.loadBanner();
    },
    onLoad: function () {
        this.setData({
            locationCity: wx.getStorageSync('locationCity')
        })
        wx.showLoading({ title: '加载中', mask: true })
        this.loadBanner()
    }
})
