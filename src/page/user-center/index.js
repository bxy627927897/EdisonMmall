/*
* @Author: msi-pc
* @Date:   2017-08-17 06:23:18
* @Last Modified by:   msi-pc
* @Last Modified time: 2017-08-17 16:40:06
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
require('page/common/header/index.js');
var templateIndex = require('./index.string');

var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var page = {
	init : function() {
		this.onLoad();
	},
	onLoad : function() {
		//初始化左侧菜单
		navSide.init({
			name : 'user-center'
		});
		//加载用户信息
		this.loadUserInfo();
	},
	loadUserInfo : function() {
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _mm.renderHtml(templateIndex, res);
			$('.panel-body').html(userHtml);
		}, function(errMsg) {
			_mm.errorTips(errMsg);
		});
	}
};

$(function() {
	page.init()
});