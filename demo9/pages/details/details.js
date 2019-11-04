var app = getApp()
Page({
	data: {
		info:{},
        maskShow:true
	},
    bindload:function(){
        wx.hideLoading()
        this.setData({
            maskShow: false
        })
    },
	onLoad: function (e) {
        var _this = this;
		if (e.id) {
            wx.showLoading({ title: '加载中', mask: true })
            wx.request({
                url: 'https://www.youzhu.com/api/Programactivity/list',
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                method: 'post',
                data: { id: e.id },
                success: function (res) {
                    console.log(res)
                    if (res.data.errorNo >= 0) {
                        _this.setData({
                            info: res.data.data.list[0]
                        })
                        wx.setNavigationBarTitle({
                            title: res.data.data.list[0].title
                        })
                    }
                }
            })
            
		}
	}
})
