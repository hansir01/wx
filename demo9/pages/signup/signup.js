var check = require('../../utils/check.js');

var app = getApp()
Page({
	data: {
		addrData: [],
		values: [0, 0, 0],
		condition: false,
		jiaoFangTime: [
			'请选择交房时间', '已交房', '1-3个月', '4-6个月', '半年后'
		],
		jfTime: false,
		jfIndex: 0,
		codeDis: false,
		codeText: '获取验证码',
		codeTime: 59,
        userInfo: {
            name: '',
            tel: '',
            addrs: '',
            code: ''
        },
        title:''
	},
	jfChange: function (e) {
		this.setData({
            jfIndex: e.detail.value
		})
	},
	bindChange: function (e) {
		let oldValue = this.data.values;
		let newValue = e.detail.value;
		this.setData({
			values: e.detail.value
		})
		if (oldValue[0] != newValue[0]) {
			this.setData({
				values: [newValue[0], 0, 0]
			})
		} else if (oldValue[1] != newValue[1]) {
			this.setData({
				values: [newValue[0], newValue[1], 0]
			})
		}
	},
	selectOpen: function () {
		this.setData({
			condition: !this.data.condition
		})
	},
	jfOpen: function () {
		this.setData({
			jfTime: !this.data.jfTime
		})
	},
	getCode: function () {
        var _this = this;
        if (check.validTools('mobile', _this.data.userInfo.tel, '请输入正确的手机号码')) {
            wx.request({
                url: 'https://m.youzhu.com/api/subscribe/comactCode',
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                method: 'post',
                data: {
                    phone: _this.data.userInfo.tel
                }
            })
            _this.setData({
                codeDis: true,
                codeText: _this.data.codeTime + 's重新获取'
            })
            var codeSet = setInterval(function () {
                if (_this.data.codeTime > 0) {
                    _this.setData({
                        codeTime: _this.data.codeTime - 1,
                        codeText: _this.data.codeTime + 's重新获取'
                    })
                } else {
                    clearInterval(codeSet);
                    _this.setData({
                        codeDis: false,
                        codeTime: 59,
                        codeText: '获取验证码'
                    })
                }
            }, 1000)
        }
	},
	onLoad: function (e) {
		wx.setNavigationBarTitle({
			title: e.title
		})
        this.setData({
            title: e.title
        })
		var _this = this;
		wx.request({
			url: 'https://m.youzhu.com/api/wuser/getRegion/region_id/all',
			success: function (data) {
				_this.setData({
					addrData: data.data.data[0].children
				})
			}
		})
	},
    changeName: function (e) {
        this.setData({ 'userInfo.name': e.detail.value })
    },
    changeTel: function (e) {
        this.setData({ 'userInfo.tel': e.detail.value })
    },
    changeAddrs: function (e) {
        this.setData({ 'userInfo.addrs': e.detail.value })
    },
    changeCode: function (e) {
        this.setData({ 'userInfo.code': e.detail.value })
    },
    submit:function(e){
        var _this = this;
        if (
            check.validTools('isnul', _this.data.userInfo.name, '请输入姓名') &&
            check.validTools('mobile', _this.data.userInfo.tel, '请输入正确的手机号码')
        ) {
            if (_this.data.values[2] == 0) {
                wx.showModal({ title: '提示', content: '请选择房屋位置' })
            } else if (
                check.validTools('isnul', _this.data.userInfo.addrs, '请填写所在小区')
            ) {
                if (_this.data.jfIndex == 0){
                    wx.showModal({ title: '提示', content: '请选择交房时间' })
                }else{
                    if (check.validTools('isnul', _this.data.userInfo.code, '请输入手机验证码')){
                         wx.showLoading({ title: '加载中', mask: true })
                         wx.request({
                             url: 'https://m.youzhu.com/api/Comactivity/externalSave',
                             header: { 'content-type': 'application/x-www-form-urlencoded' },
                             method: 'post',
                             data: {
                                 title: _this.data.title,
                                 source: '微信小程序',
                                 fromAd: 'no',
                                 telephone: _this.data.userInfo.tel,
                                 name: _this.data.userInfo.name,
                                 province: _this.data.addrData[_this.data.values[0] - 1].id,
                                 city: _this.data.addrData[_this.data.values[0] - 1].children[_this.data.values[1] - 1].id,
                                 county: _this.data.addrData[_this.data.values[0] - 1].children[_this.data.values[1] - 1].children[_this.data.values[2] - 1].id,
                                 other: _this.data.userInfo.addrs,
                                 launchTime: _this.data.jiaoFangTime[_this.data.jfIndex],
                                 phonecode: _this.data.userInfo.code,
                                 wx:1
                             },
                             success: function (data) {
                                 wx.hideLoading()
                                 if (data.data.errorNo >= 0) {
                                     wx.showModal({ title: '提示', content: '预约成功稍后会有客服联系您' })
                                 } else {
                                     wx.showModal({ title: '提示', content: data.data.message })
                                 }
                             }
                         })
                    }
                }
            }
        }
    }
})
