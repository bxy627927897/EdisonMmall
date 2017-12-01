/*
* @Author: msi-pc
* @Date:   2017-10-22 16:15:47
* @Last Modified by:   msi-pc
* @Last Modified time: 2017-12-01 14:23:34
*/

'use strict';

var _mm = require('util/mm.js');

var _product = {
	// 获取商品列表
	getProductList : function(listParam, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/product/list.do'),
			data: listParam,
			success: resolve,
			error: reject,
		}); 
	},
	// 获取商品详细信息
	getProductDetail : function(listParam, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/product/detail.do'),
			data: listParam,
			success: resolve,
			error: reject,
		}); 
	},
}

module.exports = _product;