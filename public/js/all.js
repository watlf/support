$(document).ready(function() {
    $('#formRegister').submit(function(event){
        event.preventDefault();

        var data = $(this).serialize();
        var form = $(this);

        $("div").removeClass('error');

        $.post('/auth/register', data).success(function (responce) {
            console.log(data);
        }).fail(function (response) {

            Object.keys(response.responseJSON).forEach(function(field){
                form.find('div[data-name='+field+']')
                    .addClass('error')
                    .find('.error-block').
                    html(response.responseJSON[field][0]);
            });
        });
    });

    $('#formAskQuestion').submit(function(event){
        event.preventDefault();

        var data = $(this).serialize();
        var form = $(this);

        $("div").removeClass('error');

        $.post(form.attr('action'), data).success(function (responce) {
            $('.alert-success').show(200);
            form[0].reset();
            setTimeout(function(){ $('.alert-success').hide(200) }, 3000);
        }).fail(function (response) {

            Object.keys(response.responseJSON).forEach(function(field){
                form.find('div[data-name='+field+']')
                    .addClass('error')
                    .find('.error-block').
                    html(response.responseJSON[field][0]);
            });
        });
    });


    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
    $("#menu-toggle-2").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled-2");
        $('#menu ul').hide();
    });

    function initMenu() {
        $('#menu ul').hide();
        $('#menu ul').children('.current').parent().show();
        //$('#menu ul:first').show();
        $('#menu li a').click(
            function() {
                var checkElement = $(this).next();
                if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
                    return false;
                }
                if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
                    $('#menu ul:visible').slideUp('normal');
                    checkElement.slideDown('normal');
                    return false;
                }
            }
        );
    }
    $(document).ready(function() {initMenu();});
});

(function( $ ){

    $.fn.fitText = function( kompressor, options ) {

        // Setup options
        var compressor = kompressor || 1,
            settings = $.extend({
                'minFontSize' : Number.NEGATIVE_INFINITY,
                'maxFontSize' : Number.POSITIVE_INFINITY
            }, options);

        return this.each(function(){

            // Store the object
            var $this = $(this);

            // Resizer() resizes items based on the object width divided by the compressor * 10
            var resizer = function () {
                $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
            };

            // Call once to set.
            resizer();

            // Call on resize. Opera debounces their resize by default.
            $(window).on('resize.fittext orientationchange.fittext', resizer);

        });

    };

})( jQuery );

(function($) {
    "use strict"; // Start of use strict

    var iScrollPos = 0;

    $(window).scroll(function () {
        var iCurScrollPos = $(this).scrollTop();
        if (iCurScrollPos > iScrollPos) {
            $('#mainNav').addClass('affix')
        } else {
            $('#mainNav').removeClass('affix')
        }
    });

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );

})(jQuery); // End of use strict

$(document).ready(function($) {
    $(".page-scroll").click(function(event) {
        event.preventDefault();
        $('html,body').animate( { scrollTop:$(this.hash).offset().top } , 1000);
    } );
} );
//# sourceMappingURL=all.js.map
