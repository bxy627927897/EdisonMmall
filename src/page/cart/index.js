/*
* @Author: msi-pc
* @Date:   2017-12-01 17:39:33
* @Last Modified by:   msi-pc
* @Last Modified time: 2017-12-05 23:00:25
*/
'use strict';
require('./index.css');
var nav = require('page/common/nav/index.js');
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
			_this.showCartError();
		})
	},
	bindEvent: function() {
		var _this = this;
		// 单选
		$(document).on('click', '.cart-select', function() {
			var $this = $(this),
					productId = $(this).parents('.cart-table').data('product-id');
			// 切换选中状态
			if ($this.is(':checked')) {
				_cart.selectProduct(productId, function(res) {
					_this.renderCart(res);
				}, function(errMsg) {
					_this.showCartError();
				});
			} else {
				_cart.unselectProduct(productId, function(res) {
					_this.renderCart(res);
				}, function(errMsg) {
					_this.showCartError();
				});
			}
		});
		// 全选
		$(document).on('click', '.cart-select-all', function() {
			var $this = $(this);
			// 切换选中状态
			if ($this.is(':checked')) {
				_cart.selectAllProduct(function(res) {
					_this.renderCart(res);
				}, function(errMsg) {
					_this.showCartError();
				});
			} else {
				_cart.unselectAllProduct(function(res) {
					_this.renderCart(res);
				}, function(errMsg) {
					_this.showCartError();
				});
			}
		});
		// 商品数量的变化
		$(document).on('click', '.count-btn', function() {
			var $this = $(this);
			var $pCount = $this.siblings('.count-input');
			var type = $(this).hasClass('plus') ? 'plus' : 'minus';
			var productId = $this.parents('.cart-table').data('product-id');
			var minCount = 1, maxCount = parseInt($pCount.data('max'));
			var newCount = 0;
			var currCount = parseInt($pCount.val());
			if (type === 'plus') {
				if (currCount >= maxCount) {
					_mm.errorTips('该商品数量已经达到上限');
					return;
				}
				newCount = currCount + 1;
			} else if (type === 'minus') {
				if (currCount <= minCount) {
					return;
				}
				newCount = currCount - 1;
			}
			_cart.updateProduct({
				productId: productId,
				count: newCount
			}, function(res) {
				_this.renderCart(res);
			}, function(errMsg) {
				_this.showCartError();
			});
		});
		$(document).on('click', '.cart-delete', function() {
			if (window.confirm('确认要删除该商品？')) {
				var productId = $(this).parents('.cart-table').data('product-id');
				_this.deleteCartProduct(productId);
			}
		});
		$(document).on('click', '.delete-selected', function() {
			if (window.confirm('确认要删除该商品？')) {
				var arrProductIds = [],
						$selectedItem = $('.cart-select:checked');
				for (var i = 0; i < $selectedItem.length; i++) {
					arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
				}
				if (arrProductIds.length) {
				_this.deleteCartProduct(arrProductIds.join(','));
				} else {
					_mm.errorTips('您还没有选中要删除的商品');
				}
			}
		});
		$(document).on('click', '.btn-submit', function() {
			if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
				window.location.href = './confirm.html';
			} else {
				_mm.errorTips('请选择商品后再提交');
			}
		});
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
		// 通知导航的购物车更新数量
		nav.loadCartCount();
	},
	showCartError: function() {
		$pageWrap.html('<p class="err-tip">哪里不对了，刷新试试</p>');
	},
	// 删除 支持批量 用逗号分隔productId
	deleteCartProduct: function(productIds) {
		var _this = this;
		_cart.deleteProduct(productIds, function(res) {
			_this.renderCart(res);
		}, function(errMsg) {
			_this.showCartError();
		});
	},
};

$(function() {
	page.init();
});