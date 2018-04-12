$(document).ready(function () {
    init();
    showRightAnswer();
    onDietChangeGenerateQuiz();
});

var respostas = [];

function init() {
    $.getJSON("https://raw.githubusercontent.com/EricRibeiro/Mass-Builder/master/assets/js/lib/perguntas.json", function (data) {
        quiz = data;
        loadQuiz();
    });
}

function loadQuiz() {
    var numeroAleatorio;
    numeroAleatorio = Math.floor(Math.random() * quiz.length);
    $('#questao1').text(quiz[numeroAleatorio].frase);
    $('#op11').text(quiz[numeroAleatorio].op1);
    $('#op12').text(quiz[numeroAleatorio].op2);
    $('#op13').text(quiz[numeroAleatorio].op3);
    $('#op14').text(quiz[numeroAleatorio].op4);
    numeroAleatorio = Math.floor(Math.random() * quiz.length);
    $('#questao2').text(quiz[numeroAleatorio].frase);
    $('#op21').text(quiz[numeroAleatorio].op1);
    $('#op22').text(quiz[numeroAleatorio].op2);
    $('#op23').text(quiz[numeroAleatorio].op3);
    $('#op24').text(quiz[numeroAleatorio].op4);
    numeroAleatorio = Math.floor(Math.random() * quiz.length);
    $('#questao3').text(quiz[numeroAleatorio].frase);
    $('#op31').text(quiz[numeroAleatorio].op1);
    $('#op32').text(quiz[numeroAleatorio].op2);
    $('#op33').text(quiz[numeroAleatorio].op3);
    $('#op34').text(quiz[numeroAleatorio].op4);
    numeroAleatorio = Math.floor(Math.random() * quiz.length);
    $('#questao4').text(quiz[numeroAleatorio].frase);
    $('#op41').text(quiz[numeroAleatorio].op1);
    $('#op42').text(quiz[numeroAleatorio].op2);
    $('#op43').text(quiz[numeroAleatorio].op3);
    $('#op44').text(quiz[numeroAleatorio].op4);
}

function onDietChangeGenerateQuiz() {
    $("#sel1").change(function () {
        $('.opcao').each(function (i) {
            $(this).removeClass('bg-secondary');
            $(this).addClass('bg-primary');
        })
        loadQuizParam($('#sel1').val());
        $('#certas').text("Certas: 0");
        $('#erradas').text("Erradas: 0");
    });
}

function showRightAnswer() {
    $(".opcao").click(function () {
        $(this).siblings('.opcao').addClass("bg-primary");
        $(this).removeClass("bg-primary");
        $(this).addClass("bg-secondary");
        var tabAtual = parseInt($('.active').html());

        var resposta = $(this).children().text();
        var pergunta = $(this).siblings('p').text();
        var respCorreta = "";
        var acertou = false;

        for (var i = 0; i < quiz.length; i++) {
            if (quiz[i].frase == pergunta) {
                respCorreta = quiz[i].correta;
                if (respCorreta == resposta) {
                    respostas[tabAtual - 1] = 1;
                    acertou = true;
                } else {
                    respostas[tabAtual - 1] = 0;
                }
            }
        }

        if (acertou) {
            $(this).siblings('.alert-danger').attr('hidden', true);
            $(this).siblings('.alert-success').removeAttr('hidden');
        } else {
            $(this).siblings('.alert-success').attr('hidden', true);
            $(this).siblings('.alert-danger').removeAttr('hidden');
            $(this).siblings('.alert-danger').find(".respCorreta").text(respCorreta);
        }
    });
}

function loadQuizParam(param) {

    var numeroAleatorio;
    $.getJSON("https://raw.githubusercontent.com/EricRibeiro/Mass-Builder/master/assets/js/lib/perguntas.json", function (data) {
        quiz = data;
    });

    var novo = [];

    for (var i = 0; i < quiz.length; i++) {
        if (quiz[i].restricao == param) {
            novo[novo.length] = i;
        }
    }

    numeroAleatorio = Math.floor(Math.random() * novo.length);
    $('#questao1').text(quiz[novo[0]].frase);
    $('#op11').text(quiz[novo[0]].op1);
    $('#op12').text(quiz[novo[0]].op2);
    $('#op13').text(quiz[novo[0]].op3);
    $('#op14').text(quiz[novo[0]].op4);
    numeroAleatorio = Math.floor(Math.random() * novo.length);
    $('#questao2').text(quiz[novo[1]].frase);
    $('#op21').text(quiz[novo[1]].op1);
    $('#op22').text(quiz[novo[1]].op2);
    $('#op23').text(quiz[novo[1]].op3);
    $('#op24').text(quiz[novo[1]].op4);
    numeroAleatorio = Math.floor(Math.random() * novo.length);
    $('#questao3').text(quiz[novo[2]].frase);
    $('#op31').text(quiz[novo[2]].op1);
    $('#op32').text(quiz[novo[2]].op2);
    $('#op33').text(quiz[novo[2]].op3);
    $('#op34').text(quiz[novo[2]].op4);
    numeroAleatorio = Math.floor(Math.random() * novo.length);
    $('#questao4').text(quiz[novo[3]].frase);
    $('#op41').text(quiz[novo[3]].op1);
    $('#op42').text(quiz[novo[3]].op2);
    $('#op43').text(quiz[novo[3]].op3);
    $('#op44').text(quiz[novo[3]].op4);
}

function criaPlacar() {

    var certas = 0;
    var erradas = 0;

    $('#certas').text("Certas: 0");
    $('#erradas').text("Erradas: 0");

    for (var i = 0; i < respostas.length; i++) {
        if (respostas[i] == 1)
            certas++;
        else if (respostas[i] == 0) {
            erradas++;
        }
    }

    $('#certas').text("Certas: " + certas);
    $('#erradas').text("Erradas: " + erradas);
}