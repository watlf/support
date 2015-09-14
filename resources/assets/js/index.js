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
