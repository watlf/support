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
});
