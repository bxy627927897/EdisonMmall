/*
* @Author: msi-pc
* @Date:   2017-12-06 16:22:34
* @Last Modified by:   msi-pc
* @Last Modified time: 2017-12-06 18:28:02
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var templateProduct = require('./product-list.string');
var templateAddress = require('./address-list.string');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');

var page = {
	data: {
		selectedAddressId: null
	},
	init: function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function() {
		this.loadAddressList();
		this.loadProductList();
	},
	loadAddressList : function() {
		var _this = this;
		_address.getAddressList(function(res) {
			var addressListHtml = _mm.renderHtml(templateAddress, res);
			$('.address-con').html(addressListHtml);
		}, function(errMsg) {
			$('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
		});
	},
	loadProductList : function() {
		var _this = this;
		_order.getProductList(function(res) {
			var productListHtml = _mm.renderHtml(templateProduct, res);
			$('.product-con').html(productListHtml);
		}, function(errMsg) {
			$('.product-con').html('<p class="err-tip">商品信息加载失败，请刷新后重试</p>');
		});
	},
	bindEvent: function() {
		var _this = this;
	},
	filter: function(data) {

	},
};

$(function() {
	page.init();
});