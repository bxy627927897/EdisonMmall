/*
* @Author: msi-pc
* @Date:   2017-12-06 16:42:58
* @Last Modified by:   msi-pc
* @Last Modified time: 2017-12-06 18:28:42
*/
'use strict';

var _mm = require('util/mm.js');

var _order = {
	getProductList : function(resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/order/get_order_cart_product.do'),
			success: resolve,
			error: reject,
		});
	},
}

module.exports = _order;