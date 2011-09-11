
(function($){
  $.fn.selectRange = function(start, end) {
          return this.each(function() {
                  if(this.setSelectionRange) {
                          this.focus();
                          this.setSelectionRange(start, end);
                  } else if(this.createTextRange) {
                          var range = this.createTextRange();
                          range.collapse(true);
                          //range.moveEnd('character', end);
                          range.moveStart('character', start);
                          range.select();
                  }
          });
  };
})(jQuery);

/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);

jQuery(window).load(function(){
  
  jQuery('#content-scroll, .slider, #slider').fadeIn("slow");
  jQuery('div.loading').remove();
  
  if(jQuery("#slider li").size() == 0){
    jQuery(".slider-container").remove(); 
  } else {
    if(jQuery("#slider li").size() == 1){ // hide slideshow controls if there's only one image
      jQuery('#slider').bxSlider({
        infiniteLoop: false,
        speed: 600,
        auto: true,
        controls: false,
        pager: false,
        autoDelay: 1000,
        pause: 5000,
        mode: 'horizontal'
      });
    } else {
      jQuery('#slider').bxSlider({
        infiniteLoop: false,
        speed: 600,
        auto: true,
        controls: false,
        pager: true,
        autoDelay: 1000,
        pause: 5000,
        mode: 'horizontal'
      });
    }
    jQuery('#slider').fadeIn('slow');
  }
  
  jQuery('#slider li img').click(function(){
    var url = jQuery(this).attr('data-url');
    if (url.length > 0) {window.location.href = url;}
  });
  
  var IE6 = false /*@cc_on || @_jscript_version < 5.7 @*/;
  if(IE6){
		if(jQuery("#placeholder img").width() > 360){
			jQuery("#placeholder img").css('width', '360px');
		} else {
			jQuery("#placeholder img").css('width', jQuery("#placeholder img").width()+'px'); // restrict to initial width of image
		}
  } else {
    jQuery("#placeholder img").css('maxWidth', jQuery("#placeholder img").width()+'px'); // restrict to initial width of image
  }
  
  var pw = jQuery("#placeholder img").width() + 8;
  jQuery("#placeholder img").parents('div.featured').css('maxWidth', pw+'px'); // force IE to play nice
  
  jQuery('.cy').each(function(){
    var h = Math.round(jQuery(this).height() / 2);
    var ph = Math.round(jQuery(this).parent().height() / 2);
    jQuery(this).css('paddingTop', ph - h);
    jQuery(this).fadeIn('slow');
  });
  
});

jQuery(document).ready(function(jQuery){
  
  jQuery('#slider li img').error(function(){ // remove problematic images
    jQuery(this).parents("li.slide").remove();
  });

  jQuery("#slider li img").each(function(){
    var url = jQuery(this).attr('data-url');
    if(url != undefined){
      if (url.length > 0) { jQuery(this).css("cursor","pointer");}
    }
  });

	jQuery("#add-to-cart").click(function(){
		if(jQuery(this).hasClass('working')){
			return false;
		} else {
			var tmpWidth = jQuery(this).outerWidth();
			jQuery(this).css("width",tmpWidth).addClass('working').val("Adding...");
		}
	});

	jQuery("#product .thumbs .image a").hoverIntent(function(){
		jQuery(this).click();
	}, function(){ // mouse out
	});
  
  jQuery('.cy, .image img, #slider').css('display', 'none');
  jQuery('.slider-container').append('<div class="loading">Loading...</div>');
	jQuery('.image').addClass('img-loading');
  
  jQuery('input[type="submit"], input.btn, button').click(function(){ // remove ugly outline on input button click
    jQuery(this).blur();
  })
  
  jQuery("li.dropdown").hover(function(){
    jQuery(this).children('ul.dropdown').show();
    jQuery(this).children('ul.dropdown').stop();
    jQuery(this).children('ul.dropdown').animate({
      opacity: 1.0
    }, 200);
  }, function(){
    jQuery(this).children('ul.dropdown').stop();
    jQuery(this).children('ul.dropdown').animate({
      opacity: 0.0
    }, 400, function(){
      jQuery(this).hide();
    });
  });
  
  jQuery('a[href*=#]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
    && location.hostname == this.hostname) {
      var $target = jQuery(this.hash);
      $target = $target.length && $target || jQuery('[name=' + this.hash.slice(1) +']');
      if ($target.length) {
        var targetOffset = $target.offset().top;
        jQuery('html,body').animate({scrollTop: targetOffset}, 1000);
        //return false;
      }
    }
  });
  
  jQuery("input.replace").each(function(i){ // input value replacement
    var originalvalue = jQuery(this).val();
    jQuery(this).focus( function(){ 
      jQuery(this).animate({color: '#ccc'}, 200);
      jQuery(this).selectRange(0,0);
    });
    jQuery(this).blur( function(){ 
      if( jQuery.trim(jQuery(this).val()) == '' ){ jQuery(this).val(originalvalue); } 
      jQuery(this).animate({color: '#666'}, 200);
    });
    jQuery(this).keydown( function(){ 
      jQuery(this).css({color: '#666'})
      if( jQuery.trim(jQuery(this).val()) == originalvalue ){ jQuery(this).val(''); } 
    });
  });

  jQuery('.image img').each(function(){ // load images in individually
    if (!this.complete) { // if image is NOT cached
      jQuery(this).load(function(){
				jQuery(this).parents('.image').removeClass('img-loading');
				jQuery(this).fadeIn(400);
      });
    } else { // if image is cached
      jQuery(this).parents('.image').removeClass('img-loading');
			jQuery(this).fadeIn(400);
    }
  });

});

function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function setCaretToPos (input, pos) {
  setSelectionRange(input, pos, pos);
}

if ((typeof Shopify) === 'undefined') {
  Shopify = {};
}

Shopify.money_format = '$';

Shopify.onProduct = function(product) {
  if(product.price_min < product.compare_at_price_min){
		jQuery("#recently-viewed .products").append('<div class="product"><div class="image"><a href="' + product.url + '"><img src="' + Shopify.resizeImage(product.featured_image, 'medium') + '" alt="' + product.title + '" /></a></div><div class="details clearfix"><a href="' + product.url + '"><span class="title">' + product.title + '</span><span class="price">' + Shopify.formatMoney(product.price_min) + '<span class="sale">Sale</span></span></a></div></div>');
	} else {
		jQuery("#recently-viewed .products").append('<div class="product"><div class="image"><a href="' + product.url + '"><img src="' + Shopify.resizeImage(product.featured_image, 'medium') + '" alt="' + product.title + '" /></a></div><div class="details clearfix"><a href="' + product.url + '"><span class="title">' + product.title + '</span><span class="price">' + Shopify.formatMoney(product.price_min) + '</span></a></div></div>');
	}
  jQuery("#recently-viewed").css('display', 'block');
  jQuery("#recently-viewed .products .product:nth-child(4)").addClass("last");
};

Shopify.onError = function(XMLHttpRequest, textStatus) {
  jQuery("#add-to-cart").val("Sold out!").animate({
	  color: '#ffffff',
	  backgroundColor: '#541e1c'
	}, 400, function(){
	    window.setTimeout(resetCartButton, 1000);
	});
};

function resetCartButton(){
  jQuery("#add-to-cart").val("Add to Cart").removeClass("working");
}