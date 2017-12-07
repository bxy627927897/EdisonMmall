/*
* @Author: msi-pc
* @Date:   2017-12-07 17:51:01
* @Last Modified by:   msi-pc
* @Last Modified time: 2017-12-07 18:01:21
*/

'use strict';

var _mm = require('util/mm.js');

var _payment = {
	// 获取支付信息
	getPaymentInfo : function(orderNumber, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/order/pay.do'),
			data: {
				orderNo: orderNumber
			},
			success: resolve,
			error: reject,
		});
	},
	getPaymentStatus : function(orderNumber, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/order/query_order_pay_status.do'),
			data: {
				orderNo: orderNumber
			},
			success: resolve,
			error: reject
		});
	}
}

module.exports = _payment;