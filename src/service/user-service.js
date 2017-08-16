/*
* @Author: msi-pc
* @Date:   2017-08-16 14:06:41
* @Last Modified by:   msi-pc
* @Last Modified time: 2017-08-16 14:39:43
*/

'use strict';

var _mm = require('util/mm.js');

var _user = {
	logout : function(resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/logout.do'),
			method: 'POST',
			success: resolve,
			error: reject,
		});
	},
	//检查登陆状态
	checkLogin : function(resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/get_user_info.do'),
			method: 'POST',
			success: resolve,
			error: reject,
		});
	},
}

module.exports = _user;