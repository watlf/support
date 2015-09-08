$(document).ready(function() {
    $('#formLogin').submit(function (event) {
        event.preventDefault();

        var data = $(this).serialize();

        $.post('auth/login', data).success(function (responce) {
            console.log(data);
        }).error(function (message) {
            console.log(message);
        });
    });
});
