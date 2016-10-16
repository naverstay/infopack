var win, body_var,
    pageSliderLoaded = false,
    gallerySlider,
    fadeMeUpDelay = 100,
    fadeMeUp2Delay = 300,
    sliderDirection = 'down',
    pageSliderParams = {
        //Navigation
        menu: '#menu',
        lockAnchors: false,
        anchors: ['firstSlide', 'emptySlide', 'secondSlide', 'emptySlide', 'thirdSlide', 'emptySlide', 'forthSlide'],
        navigation: true,
        navigationPosition: 'left',
        navigationTooltips: ['Главная', , 'Фото', , 'Видео', , 'О выставке'],
        showActiveTooltip: false,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',

        //Scrolling
        css3: true,
        scrollingSpeed: 1000,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 1000,
        scrollBar: false,
        easing: 'ease',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        normalScrollElements: '.noFP, .fancybox-overlay, .fancybox-wrap',
        scrollOverflow: false,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5000,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,

        //Design
        controlArrows: true,
        verticalCentered: false,
        resize: true,
        //sectionsColor: ['#ccc', '#fff'],
        paddingTop: '0',
        paddingBottom: '0',
        fixedElements: '#header, #footer',
        responsiveWidth: 0,
        responsiveHeight: 0,

        //Custom selectors
        sectionSelector: '.slide_section',
        slideSelector: '.slide',

        //events
        onLeave: function (index, nextIndex, direction) {
            var section = $('.pageSlider .slide_section').eq(nextIndex - 1),
                bs_img = section.attr('data-bs');

            //console.log(index, nextIndex, direction, section);

            if (bs_img != void 0) {
                $(".bsImg").show().backstretch(bs_img, {duration: 3000, fade: 750});
            }

            if (nextIndex == 1) {
                $(".bsImg").fadeOut(750, function () {
                    $(this).find('img').remove();
                });
            }

            if (section.hasClass('emptyPage')) {
                //console.log('skip');
                $.fn.fullpage.moveTo(nextIndex + (direction == 'down' ? 1 : -1));
            }

            sliderDirection = direction;


            //$('.fadeInUp').removeClass('fadeInUp animated fadeOutDown').addClass('fadeOutDown_');
            //$('.fadeInUp2').removeClass('fadeInUp2 animated fadeOutDown').addClass('fadeOutDown_');


            //if (nextIndex == 1) body_var.removeClass('show_go_top');

            //body_var.toggleClass('show_go_top header_fixed', nextIndex != 1);


        },
        afterLoad: function (anchorLink, index) {
            var section = $('.pageSlider .slide_section').eq(index - 1),
                animationClass = sliderDirection == 'down' ? 'fadeInUp' : 'fadeInDown';

            //console.log(anchorLink, index);

            $('.fadeMeUp').removeClass('fadeInUp animated fadeInDown');
            $('.fadeMeUp2').removeClass('fadeInUp animated fadeInDown');

            section.addClass('show_connector').find('.fadeMeUp').each(function (ind) {
                var el = $(this);

                setTimeout(function () {
                    el.addClass(animationClass + ' animated');
                }, fadeMeUpDelay);
            });

            section.find('.fadeMeUp2').each(function (ind) {
                var el = $(this);

                setTimeout(function () {
                    el.addClass(animationClass + ' animated');
                }, fadeMeUp2Delay);
            });

        },
        afterRender: function () {
            pageSliderLoaded = true;

            setTimeout(function () {
                body_var.addClass('fp-loaded');
            }, 0);

            gallerySlider = new Swiper('.gallerySlider', {
                loop: true,
                setWrapperSize: true,
                slidesPerView: 3,
                paginationClickable: true,
                nextButton: '#gallery_left',
                prevButton: '#gallery_right',
                spaceBetween: 15,
                breakpoints: {
                    960: {
                        slidesPerView: 2
                    },
                    480: {
                        slidesPerView: 1
                    }
                }
            });

        },
        afterResize: function () {
        },
        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
            //console.log(anchorLink, index, slideAnchor, slideIndex);
        },
        onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) {
            //console.log(anchorLink, index, slideIndex, direction, nextSlideIndex);
        }
    };

$(function ($) {

    body_var = $('body');
    win = $(window);

    $('.fancybox').fancybox({
        padding: 0,
        helpers: {
            overlay: {
                locked: false
            }
        }
    });

    $('#bgvid')[0].play();

    $('.scrollFirstPage').on ('click', function () {
        $.fn.fullpage.moveTo(2);

        return false;
    });

    $('.closeFullscreen').on ('click', function () {
        var firedEl = $(this);
        toggleFSVideo('hide');
        body_var.removeClass('open_video');

        return false;
    });

    $('.openVideo').on ('click', function () {
        var firedEl = $(this);

        body_var.addClass('open_video');
        toggleFSVideo();

        return false;
    });

    $('.toggleGallery').on ('click', function () {
        var firedEl = $(this);

        firedEl.closest('.slideSection').find('.fp-controlArrow.fp-next').click();

        gallerySlider.update();

        return false;
    });


});


$(window).on('load', function () {
    //if (win.width() >= 1200) {
    init_main_slider();
    //}
}).on('scroll', function () {


}).on('resize', function () {

    if (win.width() < 1200) {

        //if (pageSliderLoaded) {
        //
        //    pageSliderLoaded = false;
        //
        //    $.fn.fullpage.destroy();
        //
        //}
    } else {
        if (!pageSliderLoaded) {
            //console.log('init');

            init_main_slider();
        }
    }

});

function toggleFSVideo(state) {
    // if state == 'hide', hide. Else: show video
    var div = document.getElementById("fs_video");
    var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
    var func = state == 'hide' ? 'pauseVideo' : 'playVideo';
    iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
}

function init_main_slider() {

    if (pageSliderLoaded) {
        return;
    } else {
        //console.log('pageSliderLoaded', pageSliderLoaded);
    }

    $('.pageSlider').fullpage(pageSliderParams);


}