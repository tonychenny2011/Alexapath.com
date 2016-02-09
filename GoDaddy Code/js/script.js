$(document).ready(function() {

	$("li a").on("touchend", function(event) {
  window.location.href = $(this).attr("href");
});
$("#zoomify-page ul li a").on("touchend", function(event) {
  window.location.href = $(this).attr("#");
});
/*
 $(document).scroll(function(){
        if($(this).scrollTop() >= $('#globalreach').offset().top - 120) {
    $("#logoleft p.left").slideDown("slow");
        $("#logoright p.right").slideDown("slow");

        } else {
    $("#logoleft p.left").slideUp("slow");
        $("#logoright p.right").slideUp("slow");

        }
    });
 
  $(document).scroll(function(){
        if($(this).scrollTop() >= $('#meettheteam').offset().top - 120) {
    $("#meettheteam-content ul li p.profile").slideDown("slow");

        } else {
    $("#meettheteam-content ul li p.profile").slideUp("slow");

        }
    });
*/
    $('.cd-form .cd-email').keyup(function(event){	
	var emailInput = $(this),
		insertedEmail = emailInput.val(),
		atPosition = insertedEmail.indexOf("@");
    	dotPosition = insertedEmail.lastIndexOf(".");
    //check if user has inserted a "@" and a dot
    if (atPosition< 1 || dotPosition<atPosition+2 ) {
    	//if he hasn't..
    	//hide the submit button
    	$('.cd-form').removeClass('is-active').find('.cd-loading').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    } else {
    	//if he has..
    	//show the submit button
    	$('.cd-form').addClass('is-active');
    }
});    

});

jQuery(document).ready(function($) {
    $(".dropdown").click(function() {
        $("#one-ddcontent").slideToggle(500);
    });
});

$(window).scroll(function(){
        if ($(this).scrollTop() > 1000) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });


    $(".scrollToTop").click(function() {
    $('html, body').animate({
        scrollTop: $("#wrapper").offset().top
    }, 2000);
});
