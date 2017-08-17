/*
* @Author: msi-pc
* @Date:   2017-08-07 02:22:03
* @Last Modified by:   msi-pc
* @Last Modified time: 2017-08-17 03:21:23
*/

'use strict';
require('./index.css');

var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
var nav = {
	init : function() {
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();
		return this;  //使得返回的是调用者，即nav
	},
	bindEvent : function() {
		//登陆点击事件
		$('.js-login').click(function() {
			_mm.doLogin();
		});
		//注册点击事件
		$('.js-register').click(function() {
			window.location.href = './user-register.html';
		});
		//退出点击事件
		$('.js-logout').click(function() {
			_user.logout(function(res) {
				window.location.reload();
			}, function(errMsg) {
				_mm.errorTips(errMsg);
			});
		});
	},
	//加载用户信息
	loadUserInfo : function() {
		_user.checkLogin(function(res) {
				$('.user.not-login').hide().siblings('.user.login').show()
				.find('.username').text(res.username);
			}, function(errMsg) {
				//do nothing
			});
	},
	//加载购物车数量
	loadCartCount : function() {
		_cart.getCartCount(function(res) {
				$('.nav .cart-count').text(res || 0);
			}, function(errMsg) {
				$('.nav .cart-count').text(0);
			});
	}
};

module.exports = nav.init();