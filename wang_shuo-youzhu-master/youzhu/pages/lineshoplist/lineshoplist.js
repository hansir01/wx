var app = getApp()
Page({
	data: {
		shopList: {},
		locationCity: ''
	},
	loadBanner: function () {
		var _this = this;
		wx.request({
			url: 'https://m.youzhu.com/centershop/CenterShopList',
			header: { 'content-type': 'application/x-www-form-urlencoded' },
			method: 'post',
            data: { city: _this.data.locationCity ? _this.data.locationCity : '全国' },
			success: function (res) {
				wx.hideLoading()
				wx.stopPullDownRefresh()
				if (res.data.errorNo >= 0) {
					_this.setData({
						shopList: res.data.data
					})
				}
			}
		})
	},
    getAll:function(){
        this.setData({
            locationCity: '全国'
        })
        wx.showLoading({ title: '加载中', mask: true })
        this.loadBanner()
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
