/*
* @Author: msi-pc
* @Date:   2017-11-30 16:24:28
* @Last Modified by:   msi-pc
* @Last Modified time: 2017-12-01 12:28:05
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var templateHTML = require('./index.string');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');

var page = {
	data: {
		productId: _mm.getUrlParam('productId') || '',
	},
	init: function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function() {
		if (!this.data.productId) {
			_mm.goHome();
			this.loadDetial();
		}
	},
	loadDetial: function() {
		var html = '';
		_product.getProductDetail(this.data.productId, function(res) {
			html = _mm.renderHtml(templateHTML, res);
			$('.page-wrap').html(html);
		}, function(errMsg) {
			$('.page-wrap').html('<p class="err-tip">未找到该商品</p>');
		});
	},
	bindEvent: function() {
		
	},
};

$(function() {
	page.init();
});