jQuery(document).ready(function($){
  $("#fixedbar .bar").on("mouseenter", function (e) {
      $(this).addClass('hover');
  });
  $("#fixedbar .bar").on("mouseleave", function (e) {
      $(this).removeClass("hover");
  });
  $("#gotop").hide();
  $(window).scroll(function(){
    if ($(window).scrollTop()>100)
    {
      $("#gotop").fadeIn();
    }
    else
    {
      $("#gotop").fadeOut();
    }
  });
  $("#gotop").click(function(){
    $('body,html').animate({scrollTop:0},500);
    return false;
  });
  $('.overlay').on('mouseenter', function(){
    closeNav();
    $('.overlay').removeClass('is-visible');
  });

  var mainNavItem = $('.primary-nav-item');
  var mainNav =  {
    item: {
      primaryNav: mainNavItem.children('a'),
      secondaryNav:  '.secondary-nav-wrapper'
    }
  };
  var _primaryNav = mainNav.item.primaryNav,
      _secondaryNav = mainNav.item.secondaryNav;

  //open submenu
  mainNav.item.primaryNav.on('mouseenter', function(event){

    event.preventDefault();

    var selected = $(this);

    selected.addClass('selected').next(_secondaryNav).removeClass('is-hidden');
    selected.parent(mainNavItem).siblings(mainNavItem).children(_secondaryNav).addClass('is-hidden');
    selected.parent(mainNavItem).siblings(mainNavItem).children(_primaryNav).removeClass('selected');

    $('.overlay').addClass('is-visible');

  });

  function closeNav() {
    $(_secondaryNav).addClass('is-hidden');
    $(_primaryNav).removeClass('selected');
  }

});

jQuery(document).ready(function($){
  var slidesWrapper = $('.tab-slider');

  //check if a .tab-slider exists in the DOM
  if ( slidesWrapper.length > 0 ) {
    var primaryNav = $('.primary-nav'),
      sliderNav = $('.slider-nav'),
      navigationMarker = $('.marker'),
      slidesNumber = slidesWrapper.children('li').length,
      visibleSlidePosition = 0;

    //change visible slide
    sliderNav.on('mouseenter', 'li', function(event){
      event.preventDefault();
      var selectedItem = $(this);
      if(!selectedItem.hasClass('selected')) {
        // if it's not already selected
        var selectedPosition = selectedItem.index(),
          activePosition = slidesWrapper.find('li.selected').index();

        if( activePosition < selectedPosition) {
          nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);
        } else {
          prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);
        }

        updateSliderNavigation(sliderNav, selectedPosition);
        updateNavigationMarker(navigationMarker, selectedPosition+1);

      }
    });
  }

  function nextSlide(visibleSlide, container, pagination, n){
    visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
      visibleSlide.removeClass('is-moving');
    });

    container.children('li').eq(n).addClass('selected from-right').prevAll().addClass('move-left');
  }

  function prevSlide(visibleSlide, container, pagination, n){
    visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
      visibleSlide.removeClass('is-moving');
    });

    container.children('li').eq(n).addClass('selected from-left').removeClass('move-left').nextAll().removeClass('move-left');
  }

  function updateSliderNavigation(pagination, n) {
    var navigationDot = pagination.find('.selected');
    navigationDot.removeClass('selected');
    pagination.find('li').eq(n).addClass('selected');
  }


  function updateNavigationMarker(marker, n) {
    marker.removeClassPrefix('item').addClass('item-'+n);
  }

  $.fn.removeClassPrefix = function(prefix) {
    //remove all classes starting with 'prefix'
      this.each(function(i, el) {
          var classes = el.className.split(" ").filter(function(c) {
              return c.lastIndexOf(prefix, 0) !== 0;
          });
          el.className = $.trim(classes.join(" "));
      });
      return this;
  };
});
