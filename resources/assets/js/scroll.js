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

})(jQuery); // End of use strict
