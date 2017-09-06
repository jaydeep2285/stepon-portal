    ////////////////
// swiper
/////////////////////
;(function($, window, document, undefined) {
    "use strict";
    // one page menu
    $('.wpt_page_first .wpt-top-menu li a').on('click', function(){
        var index = $( this ).data( "block" )
      $.fn.fullpage.moveTo(index );
    });
    // go to home slide
    $('.wpc-go-home').on('click', function(e){
        e.preventDefault();
        
      $.fn.fullpage.moveTo('slide1', 2);
      $('.wpt-top-menu').attr('style', 'display: block;');
    });

//sub menu
        $('.all_page').on('click', function(e) {
            $('.all_page').toggleClass('active');
        })

        ///////////////
        // dropdown
        ///////////////
        $('.nav-menu-icon a').on('click', function(e) {
            e.preventDefault();
            $('#nav-toggle').toggleClass('active');
            $('.wpt_fix_footer_body').slideToggle()
            if ($('nav').hasClass('slide-menu')) {
                $('nav').removeClass('slide-menu');
                $(this).removeClass('active');
                if (!($('.wpt_page_first .wpt-header-menu').length)) {
                 $('body').css({'overflow':'auto'});
                }
            } else {
                $('nav').addClass('slide-menu');
                if (!($('.wpt_page_first .wpt-header-menu').length)) {
                $('body').css({'overflow':'hidden'});
                }
            }
        });

        $('.nav-menu-icon-hidden a').on('click', function(e) {
            e.preventDefault();
                $('.nav-menu-icon-hidden a i').toggleClass('active');
            if ($('.wpt-top-menu').hasClass('active')) {
                $('.wpt-top-menu').removeClass('active');
                $('body').css({'overflow': 'auto'});
            } else {
                $('.wpt-top-menu').addClass('active');
                $('body').css({
                    'overflow': 'hidden'
                });
            }
        });


    
    $('.team_item_show a').on('click', function(e) {
        e.preventDefault();
        return false;
    });

    /*================*/
    /* 01 - VARIABLES */
    /*================*/

    var swipers = [],
        winW, winH, winScr, $container, _isresponsive, xsPoint = 451,
        smPoint = 768,
        mdPoint = 992,
        lgPoint = 1200,
        addPoint = 1600,
        _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

    /*========================*/
    /* 02 - PAGE CALCULATIONS */
    /*========================*/
    function pageCalculations() {
        winW = $(window).width();
        winH = $(window).height();
    }

    /*=================================*/
    /* 03 - FUNCTION ON DOCUMENT READY */
    /*=================================*/
    pageCalculations();

    /*=================================*/
    /* 04 - SWIPER SLIDER */
    /*=================================*/
    function initSwiper() {
        var initIterator = 0;
        $('.swiper-container').each(function() {
            var $t = $(this);

            if ($t.find('.swiper-slide').length <= 1) { 
                $t.find('.pagination').hide(); 
                $t.find('.swiper-slide').css('width','100%');
                return 0; 
            }

            var index = 'swiper-unique-id-' + initIterator;

            $t.addClass('swiper-' + index + ' initialized').attr('id', index);
            $t.find('.pagination').addClass('pagination-' + index);

            var autoPlayVar = parseInt($t.attr('data-autoplay'), 10);
            var mode = $t.attr('data-mode');
            var centerVar = parseInt($t.attr('data-center'), 10);
            var simVar = ($t.closest('.circle-description-slide-box').length) ? false : true;

            var slidesPerViewVar = $t.attr('data-slides-per-view');
            if (slidesPerViewVar == 'responsive') {
                slidesPerViewVar = updateSlidesPerView($t);
            } else slidesPerViewVar = parseInt(slidesPerViewVar, 10);

            var loopVar = parseInt($t.attr('data-loop'), 10);
            var speedVar = parseInt($t.attr('data-speed'), 10);

            swipers['swiper-' + index] = new Swiper('.swiper-' + index, {
                speed: speedVar,
                pagination: '.pagination-' + index,
                loop: loopVar,
                paginationClickable: true,
                autoplay: autoPlayVar,
                slidesPerView: slidesPerViewVar,
                keyboardControl: true,
                calculateHeight: true,
                simulateTouch: simVar,
                roundLengths: true,
                centeredSlides: centerVar,
                mode: mode || 'horizontal',
                onInit: function(swiper) {},
                onSlideChangeEnd: function(swiper) {
                    var activeIndex = (loopVar === 1) ? swiper.activeLoopIndex : swiper.activeIndex;
                },
                onSlideChangeStart: function(swiper) {
                    $t.find('.swiper-slide.active').removeClass('active');

                    var activeIndex = (loopVar === 1) ? swiper.activeLoopIndex : swiper.activeIndex;
                },
                onSlideClick: function(swiper) {
                }
            });

            swipers['swiper-' + index].reInit();
            if (!centerVar) {
                if ($t.attr('data-slides-per-view') == 'responsive') {
                    var paginationSpan = $t.find('.pagination span');
                    var paginationSlice = paginationSpan.hide().slice(0, (paginationSpan.length + 1 - slidesPerViewVar));
                    if (paginationSlice.length <= 1 || slidesPerViewVar >= $t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
                    else $t.removeClass('pagination-hidden');
                    paginationSlice.show();
                }
            }
            initIterator++;
        });

    }

    $('.slide-prev').on('click', function() {
        swipers['swiper-' + $(this).closest('.slider-wrap').find('.swiper-container').attr('id')].swipePrev();
        return false;
    });

    $('.slide-next').on('click', function() {
        swipers['swiper-' + $(this).closest('.slider-wrap').find('.swiper-container').attr('id')].swipeNext();
        return false;
    });

    function updateSlidesPerView(swiperContainer) {
        if (winW >= addPoint) return parseInt(swiperContainer.attr('data-add-slides'), 10);
        else if (winW >= lgPoint) return parseInt(swiperContainer.attr('data-lg-slides'), 10);
        else if (winW >= mdPoint) return parseInt(swiperContainer.attr('data-md-slides'), 10);
        else if (winW >= smPoint) return parseInt(swiperContainer.attr('data-sm-slides'), 10);
        else return parseInt(swiperContainer.attr('data-xs-slides'), 10);
    }


    /*============================*/
    /* WINDOW LOAD                */
    /*============================*/

    $(window).on('load', function() {

        initSwiper();
// full page slider home1
        if ($('#fullpage').length) {
        	var top_menu = $('.wpt_page_first .wpt-top-menu');
            $('#fullpage').fullpage({
                slidesNavigation: true,
                 menu: '#myMenu',
                 fitToSection:false,
                 controlArrows: false,
                 afterRender: function(anchorLink, index){
                 	top_menu.show(); 
                 },
                 onLeave: function(index, nextIndex, direction){
                    var leavingSection = $(this);
// language color 
                    var color_elem = $('.wpt_fix_footer .slide_num a'),
                        leng_elem = $('.wpt_fix_footer .change_lang a:last-child'),
                        top_menu = $('.wpt_page_first .wpt-top-menu'),
                        lang_button = $('.wpt_fix_footer .change_lang'),
                        slide_botton =$('.wpt_fix_footer .next_slide a');
                       
                    if(color_elem.eq(index).hasClass('color_black') ){
                        leng_elem.addClass('active_color');
                        if ($(window).width()>992) {
                        $('.wpt_page_first #nav-toggle span').addClass('color_bg');
                            
                        }
                    }
                    else{
                       leng_elem.removeClass('active_color');
                         if ($(window).width()>992) {
                       $('.wpt_page_first #nav-toggle span').removeClass('color_bg');
                            
                        }
                    }
                    // top menu
                    if (index==2 && nextIndex != 3) {
                        top_menu.show();
                        slide_botton.show();
                        top_menu.show();
                    }else  { 
                        

                        top_menu.hide();
                        slide_botton.hide();
                    }
                    // lang button
                    if ($('#section0 ').hasClass('active')) {
                        lang_button.removeClass('active');
                       
                    }else  { 
                        lang_button.addClass('active');
                    }
                }
            });
        }
// full page slider 404
        if ($('#fullpage1').length) {
            $('#fullpage1').fullpage({
                slidesNavigation: true,

            });
        }
        if($(window).width()<=992 && $.fn.fullpage){
           $.fn.fullpage.setAutoScrolling(false); 
        }


    });

    /*============================*/
    /* RESIZE               */
    /*============================*/
    $(window).on('resize load', function() {

        // pre load
        $('.pre_loader').hide();

        // izotop resize
        if( $(window).width()>768 && $(window).width()<1542){
            $('.works_body .izotope_container .izotope_item').css({
                'height': '225px',
                'width': '230px'
            });
        }else if($(window).width()<768 && $(window).width()>640){
            $('.works_body .izotope_container .izotope_item').css({
                'height': '269px',
                'width': '50%'
            });
        }else if($(window).width()<640){
            $('.works_body .izotope_container .izotope_item').css({
                'height': '269px',
                'width': '100%'
            });
        }
        else if($(window).width()>= 1542){
             $('.works_body .izotope_container .izotope_item').css({
                'height': '269px',
                'width': '275px'
            });    
        }

        if($(window).width()>768){
            $('#section3 .izotope_item').css({
                'height': $(window).height() / 2,
                'width': ($('#section3 .izotope_container').width() ) /2
            });
        }else{
        $('#section3 .izotope_item').css({
                        'height': $(window).height() / 2,
                        'width': '100%'
                    });
        }



        resizeCall();
        if($(window).width()>992 && $.fn.fullpage){
            $.fn.fullpage.reBuild();
            $.fn.fullpage.setAutoScrolling(true);
        }else if($(window).width()<=992 && $.fn.fullpage){
            $.fn.fullpage.setAutoScrolling(false);
            $('.wpt_page_first .fp-section, .fp-tableCell').css('height', 'auto');

        }
    });



     function resizeCall() {
        pageCalculations();
        $('.swiper-container.initialized[data-slides-per-view="responsive"]').each(function () {
            var thisSwiper = swipers['swiper-' + $(this).attr('id')],
                $t = $(this),
                slidesPerViewVar = updateSlidesPerView($t),
                centerVar = thisSwiper.params.centeredSlides;
            thisSwiper.params.slidesPerView = slidesPerViewVar;
            thisSwiper.reInit();
            if (!centerVar) {
                var paginationSpan = $t.find('.pagination span');
                var paginationSlice = paginationSpan.hide().slice(0, (paginationSpan.length + 1 - slidesPerViewVar));
                if (paginationSlice.length <= 1 || slidesPerViewVar >= $t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
                else $t.removeClass('pagination-hidden');
                paginationSlice.show();
            }
        });
    }

    // button to down slide
    $('.wpt_fix_footer .next_slide a').on('click', function (e) {
        e.preventDefault();
        $.fn.fullpage.moveSectionDown();
    });


    // count about page

    var counters = function() {
        $(".stats .about_stats_body .stats_item h2 span").not('.animated').each(function(){
            if($(window).scrollTop() >= $('.about_stats_body').offset().top-$(window).height()*0.7 ) {
                $(this).addClass('animated').countTo();
            }
        });
    };


    var counters_home = function() {
        $(".stats_body .stats_item h2").not('.animated').each(function(){
            if($(window).scrollTop() >= $('.stats_item').offset().top-$(window).height()*0.7 ) {
                $(this).addClass('animated').countTo();
            }
        });
    };




    // popup
    if ($('.izotope_container').length) {
        $('.izotope_container ').magnificPopup({
                delegate: '.izotope_item a',
                type: 'image',
                removalDelay: 100,
                tLoading: 'Loading image #%curr%...',
                mainClass: 'mfp-fade',
                closeBtnInside: false,
                gallery: {
                    enabled: true
                }
        });
    }
    if ($('.izotope_item .izotop_hide').length) {
        $('.izotope_item .izotop_hide ').magnificPopup({
                delegate: '.izotop_hide a',
                type: 'image',
                removalDelay: 100,
                tLoading: 'Loading image #%curr%...',
                mainClass: 'mfp-fade',
                closeBtnInside: false,
                gallery: {
                    enabled: true
                }
        });
    }
    /////////////////
    // scroll
    ////////////////
    var noScroll = $('.wpt-top-menu2');
    var scrolSection = $('.wpt-top-menu li a');
    if ( !noScroll.length) {
 
    scrolSection.on('click touchstart', function(e) {
        e.preventDefault();
        var el = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(el).offset().top
        }, 1000);
        $('.wpt-top-menu').removeClass('active');
        return false;
    });
    }
    var scrolSectionButton = $('.home .home_scroll_elem a');
   scrolSectionButton.on('click touchstart', function(e) {
        e.preventDefault();
        var el = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(el).offset().top -80
        }, 1000);
        $('.wpt-top-menu').removeClass('active');
    });


    $(window).on('scroll resize load',function(){
        counters();
        counters_home();

    });
    $(window).on('resize load',function () {
        //////////////////
        // izotop
        /////////////////
        $('#filters ').on('click touchstart', '.but', function() {

            var izotope_container = $('.izotope_container');

            for (var i = izotope_container.length - 1; i >= 0; i--) {
                $(izotope_container[i]).find('.item').removeClass('animated');
            }

            $('#filters .but').removeClass('activbut');
            $(this).addClass('activbut');
            var filterValue = $(this).attr('data-filter');
            $container.isotope({
                filter: filterValue
            });
            return false;
        });




        if ($('.izotope_container').length) {
            var $container = $('.izotope_container');
            $container.isotope({
                itemSelector: '.izotope_item'
            });
        }

        function wpc_add_img_bg( img_sel, parent_sel){

            if (!img_sel) {
                console.info('no img selector');
                return false;
            }
            var $parent, _this;

            $(img_sel).each(function(){
                _this = $(this);
                $parent = _this.closest( parent_sel );
                $parent = $parent.length ? $parent : _this.parent();
                $parent.css( 'background-image' , 'url(' + this.src + ')' );
                _this.hide();
            });

        }
        wpc_add_img_bg('#section3 .izotop_show img','#section3 .izotop_show');

        ////////////////////////////////////////
        // add active class for active group
        ////////////////////////////////////////////
        var active_izotop = $('.works_body .fillter_wrap .but');
        active_izotop.on('click touchstart', function(event) {
            event.preventDefault();
            active_izotop.removeClass('active');
            $(this).addClass('active');
        });
        ////////////////////////
        // show_more
        /////////////////
        var linkCopy = $('.works_body .izotope_container .izotope_item').clone();

        ///////////////
        // hide input placeholder on focus
        //////////////
        $('input,textarea').focus(function() {
            $(this).data('placeholder', $(this).attr('placeholder'))
                .attr('placeholder', '');
        }).blur(function() {
            $(this).attr('placeholder', $(this).data('placeholder'));
        });


        $(document).on("scroll", function() {
            var scrollTop = $(document).scrollTop();
            if (scrollTop > 20) {
                $('.wpt-header-menu').addClass('active');
            } else {
                $('.wpt-header-menu').removeClass('active');
            }
        });

        ///////////////////////
        // timer
        //////////////////////

        // var deadline = '2016-12-31';
        var deadline = new Date(Date.parse(new Date()) + 43 * 24 * 60 * 60 * 1000);

        function getTimeRemaining(endtime) {
            var t = Date.parse(endtime) - Date.parse(new Date());
            var seconds = Math.floor((t / 1000) % 60);
            var minutes = Math.floor((t / 1000 / 60) % 60);
            var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            var days = Math.floor(t / (1000 * 60 * 60 * 24));
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }

        function initializeClock(id, endtime) {
            var clock = document.getElementById(id);
            var daysSpan = clock.querySelector('.days');
            var hoursSpan = clock.querySelector('.hours');
            var minutesSpan = clock.querySelector('.minutes');
            var secondsSpan = clock.querySelector('.seconds');

            function updateClock() {
                var t = getTimeRemaining(endtime);

                daysSpan.innerHTML = t.days;
                hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
                minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
                secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

                if (t.total <= 0) {
                    clearInterval(timeinterval);
                }
            }

            updateClock();
            var timeinterval = setInterval(updateClock, 1000);
        }
        if ($('#clockdiv').length) {
        initializeClock('clockdiv', deadline);
        }

        ////////////////
        // scroll efect  header to fixed
        ///////////////
        $(document).scroll(function() {
            var scrollTop = $(document).scrollTop();
            var menu = $('.fix_header');
            if (scrollTop > 5) {
                menu.addClass('active');
            }
            menu.removeClass('active');
        });

    });


})(jQuery, window, document);












