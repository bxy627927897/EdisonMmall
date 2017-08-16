/*
* @Author: msi-pc
* @Date:   2017-08-16 14:22:35
* @Last Modified by:   msi-pc
* @Last Modified time: 2017-08-16 14:24:37
*/

'use strict';

var _mm = require('util/mm.js');

var _cart = {
	getCartCount : function(resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/cart/get_cart_prodect_count.do'),
			success: resolve,
			error: reject,
		});
	},
}

module.exports = _cart;