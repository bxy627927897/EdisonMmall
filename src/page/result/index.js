/*
* @Author: msi-pc
* @Date:   2017-08-16 17:54:23
* @Last Modified by:   msi-pc
* @Last Modified time: 2017-08-16 21:48:07
*/

'use strict';

require('./index.css');
var _mm = require('util/mm.js');
require('page/common/nav-simple/index.js');

$(function() {
	var type = _mm.getUrlParam('type') || 'default';
	var $element = $('.' + type + '-success');
	$element.show(); //显示对应的提示元素

	

})