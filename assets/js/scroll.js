$(document).ready(function(){

  let ani = $(".ani");

  //Scroll
  $.fn.scrollMoving = function(){
    let elementTop = $(this).offset().top;
    let elementBottom = elementTop + (this).outerHeight();

    let viewportTop = $(window).scrollTop();
    let viewportBottom = viewportTop + $(window).height();

    return (viewportTop < elementBottom) && (elementTop < viewportBottom);
  };

  $(window).on("load scroll",function(){

    ani.each(function(){
      if($(this).scrollMoving()){
        $(this).addClass("moving");
      }
      // else{
      //   $(this).removeClass("moving");
      // }
    });
  });

  // historyAnimation
  $(".tab li").click(function(){
    let tabNum = $(this).index();
    let tabMove = 70*tabNum;
    $(".tab-header").animate({top:tabMove});
    $(this).addClass("active");
    $(this).siblings().removeClass("active");

    let tabResult = $(this).attr("data-alt");
    $(".tab-contents div").removeClass("active");
    $("#"+tabResult).addClass("active");
  });

  //eventButtonEffect
  $(".port-list ul li").slice(0,3).show();

  $(".load-more").click(function(){
    $(".port-list ul li:hidden").slice(0,3).fadeIn();
    if($('.port-list ul li:hidden').length == 0) {
      $(this).hide()
    }
  });


});