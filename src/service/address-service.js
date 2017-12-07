/*
* @Author: msi-pc
* @Date:   2017-12-06 18:21:56
* @Last Modified by:   msi-pc
* @Last Modified time: 2017-12-07 15:41:01
*/
'use strict';

var _mm = require('util/mm.js');

var _address = {
	getAddressList : function(resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/shipping/list.do'),
			data: {
				pageSize: 50
			},
			success: resolve,
			error: reject,
		});
	},
	save : function(addressInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/shipping/add.do'),
			data: addressInfo,
			success: resolve,
			error: reject,
		});
	},
	update : function(addressInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/shipping/update.do'),
			data: addressInfo,
			success: resolve,
			error: reject,
		});
	},
	// 获取单条收件人信息
	getAddress : function(shippingId, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/shipping/select.do'),
			data: {
				shippingId: shippingId
			},
			success: resolve,
			error: reject,
		});
	},
	// 获取单条收件人信息
	deleteAddress : function(shippingId, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/shipping/del.do'),
			data: {
				shippingId: shippingId
			},
			success: resolve,
			error: reject,
		});
	},
}

module.exports = _address;