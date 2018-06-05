$(document).ready(function () {
    init();
});

var respostas = [];
var questoesQuiz = [];
var quantQuestoesPorTipo = 1;
var quantTiposRestricoesEObjetivos = 5;
var restricoes = ['Reduzidos em Carboidratos', 'Ricos em Proteína', 'Ricos em Cálcio', 'Ricos em Ferro', 'Ricos em Fibra'];


function init() {
    $.getJSON("https://raw.githubusercontent.com/EricRibeiro/Mass-Builder/master/assets/js/lib/perguntas.json", function (data) {
        quiz = [];
        quiz.push(filterRestriction(data, 'Reduzidos em Carboidratos'));
        quiz.push(filterRestriction(data, 'Ricos em Proteína'));
        quiz.push(filterRestriction(data, 'Ricos em Cálcio'));
        quiz.push(filterRestriction(data, 'Ricos em Ferro'));
        quiz.push(filterRestriction(data, 'Ricos em Fibra'));
        //criarEstruturaQuiz();
        loadQuiz();
        showRightAnswer();
    });
}

function criarEstruturaQuiz() {
    var headerQuiz = $('#header-quiz');
    var bodyQuiz = $('#body-quiz');
    for (var i = 1; i <= quantTiposRestricoesEObjetivos * quantQuestoesPorTipo; i++) {
        //Criando cabeçalho do quiz 
        var tab = '<a class="nav-link" data-toggle="tab" href="#q' + i + '"role="tab">' + i + '</a>';
        headerQuiz.append($("<li></li>").addClass('nav-item').append(tab));

        //Criando corpo do quiz com opções de respostas
        var pergunta = '<div class="tab-pane" id="q' + i + '" role="tabpanel"></div>';
        var frase = '<p id="questao' + i + '"class="mb-5 mt-4"></p>';
        bodyQuiz.append(pergunta);
        pergunta = $('#q' + i);
        pergunta.append(frase);
        for (j = 1; j <= 4; j++) {
            pergunta.append(
                '<div class="p-3 mb-2 bg-primary text-white opcao">' +
                '<p id="op' + i + j + '"></p>' +
                '</div>')
        }
        var resposta =
            '<div hidden class="alert-success p-3 m-2"> <p>Muito Bem!</p> </div>' +
            '<div hidden class="alert-danger p-3 m-2">' +
            '<p>Não desista de tentar! A resposta correta é:</p>' +
            '<p><strong class="respCorreta"></strong></p>' +
            '</div>'

        pergunta.append(resposta);
    }
    var headerPlacar = '<li class="nav-item" onclick="criaPlacar()">' +
        '<a class="nav-link" data-toggle="tab" href="#placar" role="tab">Placar</a>' +
        '</li>';
    headerQuiz.append(headerPlacar);
    var bodyPlacar = '<div class="tab-pane" id="placar" role="tabpanel">' +
        '<div class="alert-success p-3 m-5">' +
        '<p id="certas"></p>' +
        '</div>' +
        '<div class="alert-danger p-3 m-5">' +
        '<p id="erradas"></p>' +
        '</div>' +
        '</div>';

    bodyQuiz.append(bodyPlacar);
    $('#q1').addClass('active');
    $('.nav-link').first().addClass('active');
}

function loadQuiz() {
    var numeroAleatorio;
    var count = 0;
    debugger;
    for (var i = 0; i < quantTiposRestricoesEObjetivos * quantQuestoesPorTipo; i++) {
        if (count == quantTiposRestricoesEObjetivos)
            count = 0;
        numeroAleatorio = Math.floor(Math.random() * 4);
        questoesQuiz.push(quiz[count][numeroAleatorio]);
        $('#questao' + (i + 1)).text(questoesQuiz[i].frase);
        $('#op' + (i + 1) + '1').text(questoesQuiz[i].op1);
        $('#op' + (i + 1) + '2').text(questoesQuiz[i].op2);
        $('#op' + (i + 1) + '3').text(questoesQuiz[i].op3);
        $('#op' + (i + 1) + '4').text(questoesQuiz[i].op4);
        count++;
    }
}

function showRightAnswer() {
    $(".opcao").click(function () {
        $(this).siblings('.opcao').addClass("bg-primary");
        $(this).removeClass("bg-primary");
        $(this).addClass("bg-secondary");

        var tabAtual = parseInt($('.active').html());
        var resposta = $(this).children().text();
        var pergunta = $(this).siblings('p').text();
        var questaoRespondida = filterQuestion(questoesQuiz, pergunta)[0];
        var respCorreta = questaoRespondida.correta;
        var acertou = false;

        if (respCorreta == resposta) {
            respostas[tabAtual - 1] = 1;
            questaoRespondida.respostaUsuario = 1;
            acertou = true;
        } else {
            respostas[tabAtual - 1] = 0;
            questaoRespondida.respostaUsuario = 0;
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

function filterRestriction(array, restriction) {
    return array.filter(function (el) {
        return el.restricao == restriction
    });
};

function filterQuestion(array, question) {
    return array.filter(function (el) {
        return el.frase == question
    });
}