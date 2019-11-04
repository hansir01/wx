var check = require('../../utils/check.js');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var app = getApp()
Page({
	data: {
		banner: {
			imgUrls: [],
			indicatorDots: true,
			autoplay: true,
			interval: 3000,
			duration: 200
		},
		shopList: {},
		id: '',
        maskShow:false,
        dataType:1,
        userInfo:{
            name: '',
            tel: '',
            area:''
        }
	},
    showMask:function(e){
        this.setData({
            dataType: e.target.dataset.type,
            maskShow: true
        })
    },
    maskOpen:function(){
        this.setData({
            maskShow: false
        })
    },
    submit:function(){
        var _this = this;
        if(this.data.dataType == 1){
            if (
                check.validTools('isnul', _this.data.userInfo.name, '请输入姓名') &&
                check.validTools('mobile', _this.data.userInfo.tel, '请输入正确的手机号码') &&
                check.validTools('house', _this.data.userInfo.area, '请输入正确的装修面积(1-500 m²)')
            ){
                wx.showLoading({ title: '加载中', mask: true })
                wx.request({
                    url: 'https://m.youzhu.com/centershop/externalSave',
                    header: { 'content-type': 'application/x-www-form-urlencoded' },
                    method: 'post',
                    data:{
                        username: _this.data.userInfo.name,
                        telephone: _this.data.userInfo.tel,
                        area: _this.data.userInfo.area,
                        mark: 1
                    },
                    success: function (data){
                        wx.hideLoading()
                        if (data.data.errorNo >= 0) {
                            wx.showToast({title:'成功'})
                            _this.setData({
                                maskShow: false,
                                'userInfo.name': '',
                                'userInfo.tel': '',
                                'userInfo.area': ''
                            })
                        }else{
                            wx.showModal({ title: '提示', content: data.data.message })
                        }
                    }
                })
            }
        }else{
            if (
                check.validTools('mobile', _this.data.userInfo.tel, '请输入正确的手机号码')
            ) {
                wx.showLoading({ title: '加载中', mask: true })
                wx.request({
                    url: 'https://m.youzhu.com/centershop/sendAddress',
                    header: { 'content-type': 'application/x-www-form-urlencoded' },
                    method: 'post',
                    data: {
                        id: _this.data.shopList.id,
                        telephone: _this.data.userInfo.tel
                    },
                    success: function (data) {
                        wx.hideLoading()
                        if (data.data.errorNo >= 0) {
                            wx.showToast({ title: '成功' })
                            _this.setData({
                                maskShow: false,
                                'userInfo.name': '',
                                'userInfo.tel': '',
                                'userInfo.area':''
                            })
                        } else {
                            wx.showModal({ title: '提示', content: data.data.message })
                        }
                    }
                })
            }
        }
    },
    changeName: function (e) {
        this.setData({ 'userInfo.name': e.detail.value })
    },
    changeTel: function (e) {
        this.setData({ 'userInfo.tel': e.detail.value })
    },
    changeArea: function (e) {
        this.setData({ 'userInfo.area': e.detail.value })
    },
	loadBanner: function () {
		var _this = this;
		wx.request({
			url: 'https://m.youzhu.com/centershop/getCenterShopById',
			header: { 'content-type': 'application/x-www-form-urlencoded' },
			method: 'post',
			data: { id: _this.data.id },
			success: function (res) {
				wx.hideLoading()
				if (res.data.errorNo >= 0) {
					_this.setData({
						'banner.imgUrls': _this.img(res.data.data[0].wap_img),
						shopList: res.data.data[0]
					})
				}
			}
		})
	},
	callTel: function () {
		var _this = this;
		wx.makePhoneCall({
			phoneNumber: _this.data.shopList.telephone
		})
	},
	openMap: function () {
		var _this = this;
		qqmapsdk.geocoder({
			address: _this.data.shopList.address,
			success: function (res) {
				wx.openLocation({
					latitude: res.result.location.lat,
					longitude: res.result.location.lng,
					scale: 10,
					name: _this.data.shopList.name,
					address: _this.data.shopList.address
				})
			}
		});
	},
	img: function (src) {
		if (src) {
			if (src.indexOf('_') == '-1') {
				return src;
			} else {
				src = src.split('_');
				return src;
			}
		}
	},
	onLoad: function (e) {
		if (e.id) {
			this.setData({
				id: e.id
			})
		}
		qqmapsdk = new QQMapWX({
			key: 'UC3BZ-WENWG-75FQ7-IG5Z7-TVWX7-LHBXS'
		});
		wx.showLoading({ title: '加载中', mask: true })
		this.loadBanner()
	}
})
