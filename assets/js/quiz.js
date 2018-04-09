$(document).ready(function () {
    init();
});

var certas;
var erradas;

function init() {
    $.getJSON("https://raw.githubusercontent.com/EricRibeiro/Mass-Builder/master/assets/js/lib/perguntas.json", function (data) {
        quiz = data;
        loadQuiz();
    });
}

function loadQuiz() {
    var numeroAleatorio
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

$("#sel1").change(function(){
    loadQuizParam($('#sel1').val());
});

// $(".opcao").click(function(){
//     $(this).removeClass("bg-primary");
//     $(this).addClass("bg-secondary");
// });

function loadQuizParam(param) {
    var numeroAleatorio;
    $.getJSON("https://raw.githubusercontent.com/EricRibeiro/Mass-Builder/master/assets/js/lib/perguntas.json", function (data) {
        quiz = data;
    });

    var novo = [];

    for(var i = 0; i < quiz.length; i++) {
        if(quiz[i].restricao == param){
            novo[novo.length] = i;
        }
    }

    numeroAleatorio = Math.floor(Math.random() * novo.length);
    $('#questao1').text(quiz[novo[numeroAleatorio]].frase);
    $('#op11').text(quiz[novo[numeroAleatorio]].op1);
    $('#op12').text(quiz[novo[numeroAleatorio]].op2);
    $('#op13').text(quiz[novo[numeroAleatorio]].op3);
    $('#op14').text(quiz[novo[numeroAleatorio]].op4);
    numeroAleatorio = Math.floor(Math.random() * novo.length);
    $('#questao2').text(quiz[novo[numeroAleatorio]].frase);
    $('#op21').text(quiz[novo[numeroAleatorio]].op1);
    $('#op22').text(quiz[novo[numeroAleatorio]].op2);
    $('#op23').text(quiz[novo[numeroAleatorio]].op3);
    $('#op24').text(quiz[novo[numeroAleatorio]].op4);
    numeroAleatorio = Math.floor(Math.random() * novo.length);
    $('#questao3').text(quiz[novo[numeroAleatorio]].frase);
    $('#op31').text(quiz[novo[numeroAleatorio]].op1);
    $('#op32').text(quiz[novo[numeroAleatorio]].op2);
    $('#op33').text(quiz[novo[numeroAleatorio]].op3);
    $('#op34').text(quiz[novo[numeroAleatorio]].op4);
    numeroAleatorio = Math.floor(Math.random() * novo.length);
    $('#questao4').text(quiz[novo[numeroAleatorio]].frase);
    $('#op41').text(quiz[novo[numeroAleatorio]].op1);
    $('#op42').text(quiz[novo[numeroAleatorio]].op2);
    $('#op43').text(quiz[novo[numeroAleatorio]].op3);
    $('#op44').text(quiz[novo[numeroAleatorio]].op4);
}