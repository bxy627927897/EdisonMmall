/*
* @Author: msi-pc
* @Date:   2017-11-30 16:24:28
* @Last Modified by:   msi-pc
* @Last Modified time: 2017-12-01 16:58:33
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
		} else {
			this.loadDetial();
		}
	},
	loadDetial: function() {
		var html = '';
		var _this = this;
		var $pageWrap = $('.page-wrap');
		$pageWrap.html('<div class="loading"></div>');
		_product.getProductDetail({
			productId: this.data.productId
		}, function(res) {
			_this.filter(res);
			_this.data.detailInfo = res;
			html = _mm.renderHtml(templateHTML, res);
			$pageWrap.html(html);
		}, function(errMsg) {
			$pageWrap.html('<p class="err-tip">未找到该商品</p>');
		});
	},
	bindEvent: function() {
		var _this = this;
		// 图片预览 事件代理
		$(document).on('mouseenter', '.p-img-item', function() {
			var imageUrl = $(this).find('.p-img').attr('src');
			$('.main-img').attr('src', imageUrl);
		});
		// count设置
		$(document).on('click', '.p-count-btn', function() {
			var type = $(this).hasClass('plus') ? 'plus' : 'minus';
			var $pCount = $('.p-count');
			var currCount = parseInt($pCount.val());
			var minCount = 1, maxCount = _this.data.detailInfo.stock || 1;
			if (type === 'plus') {
				$pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
			} else if (type === 'minus') {
				$pCount.val(currCount > minCount ? currCount - 1 : minCount);
			}
		});
		// 加入购物车
		$(document).on('click', '.cart-add', function() {
			_cart.addToCart({
				productId: _this.data.productId,
				count: $('.p-count').val()
			}, function(res) {
				window.location.href = './result.html?type=cart-add';
			}, function(errMsg) {
				_mm.errorTips(errMsg);
			})
		});
	},
	filter: function(data) {
		data.subImages = data.subImages.split(',');
	}
};

$(function() {
	page.init();
});