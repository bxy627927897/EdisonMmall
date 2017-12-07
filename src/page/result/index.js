/*
* @Author: msi-pc
* @Date:   2017-08-16 17:54:23
* @Last Modified by:   msi-pc
* @Last Modified time: 2017-12-07 18:13:10
*/

'use strict';

require('./index.css');
var _mm = require('util/mm.js');
require('page/common/nav-simple/index.js');

$(function() {
	var type = _mm.getUrlParam('type') || 'default';
	var $element = $('.' + type + '-success');
	if (type === 'payment') {
		var orderNumber = _mm.getUrlParam('orderNumber');
		var $orderNumber = $element.find('order-number');
		$orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
	}
	$element.show(); //显示对应的提示元素

});