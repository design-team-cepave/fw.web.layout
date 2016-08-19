jQuery(document).ready(function($) {
	var hash = window.location.hash;
	if(hash !="")
	{
		$(".inner .content:visible").hide();
        $(".inner").find(hash).show();
        var hashindex = $(".inner .content").index($(".inner").find(hash));
        $('.main-content .category li a.current').removeClass("current");
        $(".main-content .category li").eq(hashindex).children("a").addClass("current");
        return false;
	}
    $('.main-content .category li a').on("click", function(){
        var index = $('.main-content .category li').index($(this).parent());
        $(".inner .content:visible").hide();
        $(".inner .content").eq(index).show();
        $('.main-content .category li a.current').removeClass("current");
        $(this).addClass("current");
        return false;
    });
    

	$('.secondary-nav .right-col li a').on("click", function(){
        var index = $('.secondary-nav .right-col li').index($(this).parent());
        $(".inner .content:visible").hide();
        $(".inner .content").eq(index).show();
        $('.main-content .category li a.current').removeClass("current");
        $('.main-content .category li').eq(index).children("a").addClass("current");
        return false;
    });
});
