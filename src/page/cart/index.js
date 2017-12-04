/*
* @Author: msi-pc
* @Date:   2017-12-01 17:39:33
* @Last Modified by:   msi-pc
* @Last Modified time: 2017-12-04 23:04:18
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var templateHTML = require('./index.string');
var _mm = require('util/mm.js');
var _cart = require('service/cart-service.js');


var page = {
	data: {

	},
	init: function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function() {
		this.loadCard();
	},
	loadCard : function() {
		var html = '';
		var _this = this;
		var $pageWrap = $('.page-wrap');
		
		_cart.getCartList(function(res) {
			_this.renderCart(res);
		}, function(errMsg) {
			$pageWrap.html('<p class="err-tip">哪里不对了，刷新试试</p>')
		})
	},
	bindEvent: function() {
		
	},
	filter: function(data) {
		data.notEmpty = !!data.cartProductVoList.length;
	},
	// 渲染购物车
	renderCart: function(data) {
		this.filter(data);
		this.data.cartInfo = data;
		var cartHtml = _mm.renderHtml(templateHTML, data);
		$('.page-wrap').html(cartHtml);
	},
};

$(function() {
	page.init();
});