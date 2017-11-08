/*
* @Author: Edison
* @Date:   2017-07-31 22:37:36
* @Last Modified by:   msi-pc
* @Last Modified time: 2017-08-26 14:04:41
*/
'use strict';
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
require('page/common/header/index.js');
require('./index.css');
require('util/slider/index.js');
var templateBanner = require('./banner.string');

var _mm = require('util/mm.js');

 $(function() {
 	// 渲染banner
 	var bannerHtml = _mm.renderHtml(templateBanner);
 	$('.banner-con').html(bannerHtml);
 	// 初始化banner
    var $slider = $('.banner').unslider({
    	dots: true,
    });
    //前一张后一张操作
    $('.banner-con .banner-arrow').click(function() {
    	var forward = $(this).hasClass('prev') ? 'prev' : 'next';
    	$slider.data('unslider')[forward]();
    })
});