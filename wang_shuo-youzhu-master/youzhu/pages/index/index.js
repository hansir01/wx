var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;

var app = getApp()
Page({
	data: {
		imgUrls: [],
		indicatorDots: true,
		autoplay: true,
		interval: 3000,
		duration: 200,
        bannerList:{
            designList:[],
            activityList:[],
            discountList:[]
        }
	},
	loadBanner: function () {
		var _this = this;
		wx.request({
            url: 'https://www.youzhu.com/api/adimg/getimage?time=' + new Date(),
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: { location: 1 },
            method: 'post',
			success: function (res) {
				wx.hideLoading()
				// wx.stopPullDownRefresh()
				_this.setData({
					imgUrls: res.data.data
				})
			}
		})
        // wx.request({
        //     url: 'https://www.youzhu.com/api/adimg/getimage?time=' + new Date(),
        //     header: { 'content-type': 'application/x-www-form-urlencoded' },
        //     method: 'post',
        //     data: { location:2 },
        //     success: function (res) {
        //         _this.setData({
        //             'bannerList.designList': res.data.data
        //         })
        //     }
        // })
        wx.request({
            url: 'https://www.youzhu.com/api/adimg/getimage?time=' + new Date(),
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'post',
            data: { location: 3 },
            success: function (res) {
                _this.setData({
                    'bannerList.activityList': res.data.data
                })
            }
        })
        wx.request({
            url: 'https://www.youzhu.com/api/adimg/getimage?time=' + new Date(),
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'post',
            data: { location: 4 },
            success: function (res) {
                _this.setData({
                    'bannerList.discountList': res.data.data
                })
            }
        })
        
	},
	onPullDownRefresh: function () {
		// this.loadBanner();
	},
	onLoad: function () {
		if (!wx.getStorageSync('locationCity')){
			qqmapsdk = new QQMapWX({
				key: 'UC3BZ-WENWG-75FQ7-IG5Z7-TVWX7-LHBXS'
			});
			wx.getLocation({
				type: 'gcj02',
				success: function (res) {
					qqmapsdk.reverseGeocoder({
						location: {
							latitude: res.latitude,
							longitude: res.longitude
						},
						success: function (res) {
							wx.setStorageSync('locationCity', res.result.ad_info.city)
						}
					});
				}
			})
		}
        // if (!wx.getStorageSync('access_token') || (new Date().getTime() - wx.getStorageSync('getTokenDate')) > 7200000){
        //     wx.request({
        //         url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxf2b4831fe977f5f0&secret=6e089eb76ca3c3b74c64146baada17c3',
        //         success: function (e) {
        //             wx.setStorageSync('access_token', e.data.access_token)
        //             wx.setStorageSync('getTokenDate',new Date().getTime())
        //         }
        //     })
        // }
		wx.showLoading({ title: '加载中', mask: true })
		this.loadBanner()
	}
})
