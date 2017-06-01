$(document).ready(function () {
    $('.collapsible-header').collapsible();
});

function a_onClick() {
    $('#duvidas').click();
    $('html, body').animate({scrollTop:$(document).height()}, 'slow');
}

var greenItem = 'light-green lighten-5'

$('#check_node').click(function () {
    if (this.checked) {
        $('#node').addClass(greenItem);
    } else {
        $('#node').removeClass(greenItem);
    }
});

$('#check_projeto').click(function () {
    if (this.checked) {
        $('#projeto').addClass(greenItem);
    } else {
        $('#projeto').removeClass(greenItem);
    }
});

$('#check_dependencias_execucao').click(function () {
    if (this.checked) {
        $('#dependencias_execucao').addClass(greenItem);
    } else {
        $('#dependencias_execucao').removeClass(greenItem);
    }
});

$('#check_dependencias_projeto').click(function () {
    if (this.checked) {
        $('#dependencias_projeto').addClass(greenItem);
    } else {
        $('#dependencias_projeto').removeClass(greenItem);
    }
});

$('#check_postman').click(function () {
    if (this.checked) {
        $('#postman').addClass(greenItem);
    } else {
        $('#postman').removeClass(greenItem);
    }
});

$('#check_editor').click(function () {
    if (this.checked) {
        $('#editor').addClass(greenItem);
    } else {
        $('#editor').removeClass(greenItem);
    }
});