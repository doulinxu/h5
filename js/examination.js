//	倒计时
	function getDuration(my_time) {  
	  var hours = my_time / 60 / 60;
	  var hoursRound = Math.floor(hours);
	  var minutes = my_time / 60 - (60 * hoursRound);
	  var minutesRound = Math.floor(minutes);
	  var seconds = my_time - (60 * 60 * hoursRound) - (60 * minutesRound);
	  var time = hoursRound + ':' + minutesRound + ':' + seconds
	  return time;
	}
	function startCountDone(_coutdonw){
		var _coutdonw = _coutdonw || 120;
		_coutdonw = _coutdonw * 60;
		$('.countdown i').html(getDuration(_coutdonw));
		var _timer =  window.setInterval(function(){
			_coutdonw = _coutdonw - 1;
			$('.countdown i').html(getDuration(_coutdonw));
			if(_coutdonw === 0){
				window.clearTimeout(_timer);
			}
		},1000);
	}
	
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
	//单选 判断
	$('.single .option').click(function() {
		var index = $(this).parents('.swiper-slide').data('number');
		var $this = $(this);
		if($this.hasClass('selected')) {
			$this.removeClass('selected');
			$this.parents('.examination').find('.confirm_btn').removeClass('active');
//			$('.nav').find('li[data-number= '+ index +']').removeClass('answered');
		} else {
			$this.parent().find('.selected').removeClass('selected');
			$this.addClass('selected');
			$this.parents('.examination').find('.confirm_btn').addClass('active');
//			$('.nav').find('li[data-number= '+ index +']').addClass('answered');
		}
	});
	//多选
	$('.muti .option').click(function() {
		var index = $(this).parents('.swiper-slide').data('number');
		if($(this).hasClass('selected')) {
			$(this).removeClass('selected');
			if($(this).parents('.options-box').find('.selected').length === 0){
				$(this).parents('.examination').find('.confirm_btn').removeClass('active');
				$('.nav').find('li[data-number= '+ index +']').removeClass('answered');
			}
		} else {
			$(this).addClass('selected');
			$(this).parents('.examination').find('.confirm_btn').addClass('active');
			$('.nav').find('li[data-number= '+ index +']').addClass('answered');
		}
	});

	//填空题事件
	$('.fill').on('click', function() {
		if($(this).hasClass('noAnswer')) { //无答案时
			$(this).find('input').show().focus();
		}
	});
	$('.fill').find('input').on('blur', function() {
		if($(this).val() === '') {
			$(this).hide();
		}
	});
	//交卷
	$('.ahead').on('click',function(){
		var unAnswer_count = 0;
		var wrong_count = 0;
		var score_count = 0;
		$('.nav').find('.title-number li').each(function(){
			if($(this).hasClass('error')){
				wrong_count += 1;
			}
			if($(this).hasClass('noAnswer')){
				unAnswer_count += 1;
			}
			//todo 计算得分
		});
		$('.submit_examination').find('.unAnswer_count span').html(unAnswer_count);
		$('.submit_examination').find('.wrong_count span').html(wrong_count);
		$('.submit_examination').find('.score_count span').html(score_count);
		$('.submit_examination').show();
	});
	$('.submit_examination').find('.msk').on('click',function(){
		$('.submit_examination').hide();
	});
	$('.submit_examination').find('.cancel').on('click',function(){
		$('.submit_examination').hide();
	});

//单题答题按钮事件
	$('.confirm_btn').on('click', function() {
		var $this = $(this);
		var index = $this.parents('.swiper-slide').data('number');
		if($this.hasClass('active')) {
			//请求检测接口
			//单选判断逻辑
			if($this.parents('.examination').hasClass('single')){
				//判断对错的逻辑
				if($this.parents('.examination').find('.option.selected span').attr('answer') == 'right'){//答题正确
					$('.nav').find('li[data-number= '+ index +']').removeClass('noAnswer').addClass('right');
				}else{
					$('.nav').find('li[data-number= '+ index +']').removeClass('noAnswer').addClass('error');
					$this.parents('.examination').find('.option.selected').removeClass('selected').addClass('error');//错误选项显示
					$this.parents('.examination').find('.option span').each(function(){
						if($(this).attr('answer') == 'right'){
							$(this).parent('.option').addClass('selected');
						}
					});
				}
			}
			//多选题判断对错
			if($this.parents('.examination').hasClass('muti')){
				//判断对错的逻辑
				var _result = true;
				$this.parents('.examination').find('.option.selected span').each(function(){
					if($(this).attr('answer') === 'right' && !$(this).parent().hasClass('selected')){ //漏选正确答案
						_result = false;
						return;
					}
					if($(this).attr('answer') === 'error' && $(this).parent().hasClass('selected')){ //错选错误答案
						_result = false;
						return;
					}
				})

				if(_result){//答题正确
					$('.nav').find('li[data-number= '+ index +']').removeClass('noAnswer').addClass('right');
				}else{
					$('.nav').find('li[data-number= '+ index +']').removeClass('noAnswer').addClass('error');
					$this.parents('.examination').find('.option span').each(function(){
						if($(this).attr('answer') == 'right'){
							$(this).parent('.option').addClass('selected');
						}else{
							$(this).parent('.option').addClass('error');
						}
					});
				}
			}
			$(this).parents('.swiper-slide').find('.option').unbind('click');
//			mySwiper.slideNext();
//			window.setTimeout(function(){
				$this.parents('.unAnswer').removeClass('unAnswer');
//			},500);
		} else {
			return;
		}
	});
	


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