jQuery(document).ready(function($) {
	var hash = window.location.hash;
	if(hash !="")
	{
		$(".inner .content:visible").hide();
        $(".inner").find(hash).show();
        var hashindex = $(".inner .content").index($(".inner").find(hash));
        $('.main-content .category li a.current').removeClass("current");
        $(".main-content .category li").eq(hashindex).children("a").addClass("current");
	}
    $('.main-content .category li a').on("click", function(){
        var index = $('.main-content .category li').index($(this).parent());
        $(".inner .content:visible").hide();
        $(".inner .content").eq(index).show();
        $('.main-content .category li a.current').removeClass("current");
        $(this).addClass("current");
        return false;
    });
    $('.secondary-nav li li a').on("click", function(){
        var targetcat = $(this).attr("href");
        var currentcat = $(".main-content").attr("id");
        var bool = targetcat.indexOf(currentcat);
        if(bool>0)
        {
            var index = $('.secondary-nav li li').index($(this).parent());
            $(".inner .content:visible").hide();
            $(".inner .content").eq(index).show();
            $('.main-content .category li a.current').removeClass("current");
            $('.main-content .category li').eq(index).children("a").addClass("current");
            return false;
        }
        
    });
});
