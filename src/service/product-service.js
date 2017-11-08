/*
* @Author: msi-pc
* @Date:   2017-10-22 16:15:47
* @Last Modified by:   msi-pc
* @Last Modified time: 2017-10-22 18:18:27
*/

'use strict';

var _mm = require('util/mm.js');

var _product = {
	// 获取商品列表
	getProductList : function(listParam, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/product/list.do'),
			data: listParam,
			method: 'POST',
			success: resolve,
			error: reject,
		}); 
	},
}

module.exports = _product;