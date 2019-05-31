//	倒计时
//	function getDuration(my_time) {  
//	  var hours = my_time / 60 / 60;
//	  var hoursRound = Math.floor(hours);
//	  var minutes = my_time / 60 - (60 * hoursRound);
//	  var minutesRound = Math.floor(minutes);
//	  var seconds = my_time - (60 * 60 * hoursRound) - (60 * minutesRound);
//	  var time = hoursRound + ':' + minutesRound + ':' + seconds
//	  return time;
//	}
//	var _coutdonw = 2;
//	_coutdonw = _coutdonw * 3600;
//	$('.countdown i').html(getDuration(_coutdonw));
//	var _timer =  window.setInterval(function(){
//		_coutdonw = _coutdonw - 1;
//		$('.countdown i').html(getDuration(_coutdonw));
//	},1000);
	var mySwiper = new Swiper('.swiper-container', {
		direction: 'horizontal', // 水平切换选项
		loop: false, // 循环模式选项
		speed:800,
	});
	//答题卡相关逻辑
	$('.exam-progress span').on('click',function(){
		$('.nav').show();
		var index = $(this).parents('.swiper-slide').data('number');
		var $li = $('.nav').find('li');
		$('.nav .current').removeClass('current');
		$('.nav').find('li[data-number= '+ index +']').addClass('current');
	});
	$('.nav li').on('click',function(){
		$('.nav').hide();
		mySwiper.slideTo($(this).data('number') -1 );
	});
	$('.nav .msk').on('click',function(){
		$('.nav').hide();
	});
	//选择题（判断题）答题逻辑
//	$('.option').click(function() {
//		var index = $(this).parents('.swiper-slide').data('number');
//		if($(this).hasClass('selected')) {
//			$(this).removeClass('selected');
//			$(this).parents('.examination').find('.confirm_btn').removeClass('active');
//			$('.nav').find('li[data-number= '+ index +']').removeClass('answered');
//		} else {
//			$(this).parent().find('.selected').removeClass('selected');
//			$(this).addClass('selected');
//			$(this).parents('.examination').find('.confirm_btn').addClass('active');
//			$('.nav').find('li[data-number= '+ index +']').addClass('answered');
//		}
//	});
//	$('.confirm_btn').on('click', function() {
//		if($(this).hasClass('active')) {
//			mySwiper.slideNext();
//		} else {
//			return;
//		}
//	});
	//填空题事件
//	$('.fill').on('click', function() {
//		if($(this).hasClass('noAnswer')) { //无答案时
//			$(this).find('input').show().focus();
//		}
//	});
//	$('.fill').find('input').on('blur', function() {
//		if($(this).val() === '') {
//			$(this).hide();
//		}
//	});


$('.resolution_vip').on('click',function(){
	if(true){//是vip的情况
		$(this).parents('.swiper-slide').find('.vip').show();
		$(this).parents('.main-card').addClass('no-scroll');
		$(this).parents('.swiper-container').addClass('swiper-no-swiping');
	}else{
//		跳转VIp
	}
});
$('.msk').on('touchmove',function(e){
	e.preventDefault();
});
$('.vip .close').on('click',function(){
	$(this).parents('.vip').hide();
	$(this).parents('.swiper-slide').find('.main-card').removeClass('no-scroll');
	$(this).parents('.swiper-container').removeClass('swiper-no-swiping');
});


$('.toAsk').on('click',function(){
	$('.toAskWindow').show();
});
$('.toAskWindow').find('.msk').on('click',function(){
	$('.toAskWindow').hide();
});
$('.toAskWindow').find('.classes_checkbox,.subject_checkbox').on('click',function(){
	console.log($(this).find('ul'));
	$(this).find('ul').toggle();
});
$('.toAskWindow').find('input,textarea').on('focus',function(){
	$(this).parents('.toAskWindow').find('.classes_checkbox,.subject_checkbox').find('ul').hide();
});
$('.toAskWindow').find('.classes_checkbox,.subject_checkbox').find('li').on('click',function(){
	console.log($(this).parent('.choice').find('.options'));
	$(this).parents('.choice').find('.options').html($(this).html());
});
