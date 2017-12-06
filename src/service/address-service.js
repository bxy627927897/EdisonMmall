/*
* @Author: msi-pc
* @Date:   2017-12-06 18:21:56
* @Last Modified by:   msi-pc
* @Last Modified time: 2017-12-06 18:23:35
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
}

module.exports = _address;