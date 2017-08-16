/*
* @Author: msi-pc
* @Date:   2017-08-16 15:25:59
* @Last Modified by:   msi-pc
* @Last Modified time: 2017-08-16 16:05:03
*/

'use strict';

require('./index.css');

var _mm = require('util/mm.js');
var header = {
	init : function() {
		this.bindEvent();
	},
	onLoad : function() {
		var keyword = _mm.getUrlParam('keyword');
		//keyword存在则回填输入框
		if (keyword) {
			$('#search-input').val(keyword);
		}
	},
	bindEvent : function() {
		var _this = this;
		//点击搜索按钮以后做搜索提交
		$('#search-btn').click(function() {
			_this.searchSubmit();
		});
		//输入回车后做搜索提交
		$('#search-input').keyup(function(e) {
			//13w为回车键
			if (e.keyCode === 13) {
				_this.searchSubmit();
			}
		});
	},
	searchSubmit : function() {
		var keyword = $.trim($('#search-input').val());
		//如果提交的时候有keyword，正常跳转到list页面
		if (keyword) {
			window.location.href = './list.html?keyword='+ keyword;
		} else {
			//否则直接返回首页
			_mm.goHome();
		}
	}
};

header.init();