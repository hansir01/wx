var check = require('../../utils/check.js');

var app = getApp()
Page({
	data: {
		addrData: [],
		values: [0, 0, 0],
		condition: false,
		codeDis: false,
		codeText: '获取验证码',
		codeTime: 59,
		userInfo: {
            name: '',
            tel: '',
            addrs: '',
			code: ''
		},
        offerMask: false,
        offerJs699: 0,
        offerJs1099:0
	},
    onLoad: function (e) {
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
	getCode: function () {
		var _this = this;
        if (check.validTools('mobile', _this.data.userInfo.tel,'请输入正确的手机号码')){
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
    submit:function(){
        var _this = this;
        if(
            check.validTools('isnul', this.data.userInfo.name, '请输入姓名') &&
            check.validTools('mobile', this.data.userInfo.tel, '请输入正确的手机号码')
        ){
            if (this.data.values[2] == 0){
                wx.showModal({title: '提示',content: '请选择房屋位置'})
            }else if(
                check.validTools('house', this.data.userInfo.addrs, '请输入正确的装修面积(1-500 m²)') &&
                check.validTools('isnul', this.data.userInfo.code, '请输入手机验证码')
            ){
                // wx.showLoading({ title: '加载中', mask: true })
                wx.request({
                    url: 'https://m.youzhu.com/Price/Post',
                    header: { 'content-type': 'application/x-www-form-urlencoded' },
                    method: 'post',
                    data: {
                        address: _this.data.addrData[_this.data.values[0] - 1].name + ' ' + _this.data.addrData[_this.data.values[0] - 1].children[_this.data.values[1] - 1].name + ' ' + _this.data.addrData[_this.data.values[0] - 1].children[_this.data.values[1] - 1].children[_this.data.values[2] - 1].name,
                        area: _this.data.userInfo.addrs,
                        username: _this.data.userInfo.name,
                        phone: _this.data.userInfo.tel,
                        code: 790763406
                    },
                    success: function (data) {
                        wx.hideLoading()
                        if (data.data.errorNo >= 0){
                            _this.setData({
                                offerMask:true,
                                offerJs699: data.data.data[699],
                                offerJs1099:data.data.data[1099]
                            })
                        }else{
                            wx.showModal({ title: '提示', content: data.data.message })
                        }
                    }
                })
                
            }
        }
    },
    maskOpen:function(){
        this.setData({
            offerMask: false
        })
    },
    changeName:function(e){
        this.setData({ 'userInfo.name': e.detail.value})
    },
    changeTel: function (e) {
        this.setData({ 'userInfo.tel': e.detail.value })
    },
    changeAddrs: function (e) {
        this.setData({ 'userInfo.addrs': e.detail.value })
    },
    changeCode: function (e) {
        this.setData({ 'userInfo.code': e.detail.value })
    }
	
})
