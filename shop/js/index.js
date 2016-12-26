/**
 * Created by 郝 on 2016/12/11.
 */
$(function(){
    var min_height = document.documentElement.clientHeight/4;
    function showScroll() {
        $(window).scroll(function() {
            var s = $(window).scrollTop();
            s > min_height ? $('.fanhui').fadeIn() : $('.fanhui').fadeOut();
        });
    }

    $(".fanhui").click(function () {
        $('html,body').stop().animate({
            scrollTop: 0
        }, 700);
    });
    showScroll();


    $(".xx li:nth-child(1)").click(function(){
        $(this).addClass("active")
        $(".xx li:nth-child(2)").removeClass("active")
        $(".pic1").css("display","block")
        $(".pic2").css("display","none")
    })
    $(".xx li:nth-child(2)").click(function(){
        $(this).addClass("active")
        $(".xx li:nth-child(1)").removeClass("active")

        $(".pic2").css("display","block")
        $(".pic1").css("display","none")
    })


})