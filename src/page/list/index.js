/*
* @Author: msi-pc
* @Date:   2017-10-22 16:12:17
* @Last Modified by:   msi-pc
* @Last Modified time: 2017-11-06 22:19:30
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');

require('page/common/header/index.js');
var templateIndex = require('./index.string');

var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var Pagination = require('util/pagination/index.js');

var page = {
	data: {
		listParam: {
			keyword: _mm.getUrlParam('keyword') || '',
			categoryId: _mm.getUrlParam('categoryId') || '',
			orderBy: _mm.getUrlParam('orderBy') || 'default',
			pageNum: _mm.getUrlParam('pageNum') || 1,
			pageSize: _mm.getUrlParam('pageSize') || 2
		}
	},
	init: function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function() {
		this.loadList();
	},
	bindEvent: function() {
		var _this = this;
		$('.sort-item').click(function() {
			_this.data.listParam.pageNum = 1;
			var $this = $(this);
			// 点击默认排序
			if ($this.data('type') === 'default') {
				if ($this.hasClass('active')) {
					return;
				} else {
					$this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
					_this.data.listParam.orderBy = 'default';
				}
			}
			// 点击价格排序
			else if ($this.data('type') === 'price') {
				$this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
				// 升降序
				if(!$this.hasClass('asc')) {
					$this.addClass('asc').removeClass('desc');
					_this.data.listParam.orderBy = 'price_asc';
				}
				else {
					$this.addClass('desc').removeClass('asc');
					_this.data.listParam.orderBy = 'price_desc';
				}
			}
			_this.loadList();
		});
	},
	// 加载list
	loadList: function() {
		var listParam = this.data.listParam;
		var _this = this;
		var listHtml = '';
		var $pListCon =$('.p-list-con');
		$pListCon.html('<div class="loading"></div>');
		listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
		_product.getProductList(listParam, function(res) {
			listHtml = _mm.renderHtml(templateIndex, {
				list: res.list
			});
			$pListCon.html(listHtml);
			_this.loadPagination({
				hasPreviousPage : res.hasPreviousPage,
				prePage : res.prePage,
				hasNextPage : res.hasPreviousPage,
				nextPage : res.nextPage,
				pageNum : res.pageNum,
				pages : res.pages
			});
		}, function(errMsg) {
			_mm.errorTips(errMsg);
		});
	},
	// 加载分页信息
	loadPagination : function(pageInfo){
    var _this = this;
    this.pagination ? '' : (this.pagination = new Pagination());
    this.pagination.render($.extend({}, pageInfo, {
        container : $('.pagination'),
        onSelectPage : function(pageNum){
            _this.data.listParam.pageNum = pageNum;
            _this.loadList();
        }
    }));
  }
};

$(function() {	
	page.init();
});