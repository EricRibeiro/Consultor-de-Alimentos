$(document).ready(function () {
    init();
    onBtnClickShowQuestion();
    setQuestaoAtual();
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

function calcularRespostas (){

    let certas=0;
    let erradas=0;

    for (var i = 0; i < respostas.length; i++) {
        if (respostas[i] == 1)
            certas++;
        else if (respostas[i] == 0) {
            erradas++;
        }
    }
    $("#questoesCertas").html("Certas: "+certas);
    $("#questoesErradas").html("Erradas: "+erradas);
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

function setQuestaoAtual(){
        let currentTab = $(".tab-pane.active").attr('id');
        let numQuestion = currentTab.charAt(1);
        if(currentTab !== "placar")
            $("#questaoAtual").html("Questão: " + numQuestion + " / " + quantTiposRestricoesEObjetivos);
        else
            $("#questaoAtual").text("");

}       


function onBtnClickShowQuestion() {
    $("#btnProximo").click( function (){
        $( "a[href='"+getQuestion('next')+"']" ).click();
        $("#btnProximo").attr("disabled",true);
        calcularRespostas();
        setQuestaoAtual();
    
    });
    $("#btnAnterior").click( function (){
        $( "a[href='"+getQuestion('prev')+"']" ).click();
        $("#btnProximo").attr("disabled",false);
        setQuestaoAtual();
    });

}

function getQuestion(direction){

        let currentTab = $(".tab-pane.active").attr('id');
        let numQuestion = currentTab.charAt(1);
        numQuestion = parseInt(numQuestion);
        let maxQuestions = quantTiposRestricoesEObjetivos;
        let question = "";
        if ( direction === "prev" ){

                if( numQuestion > 1 && numQuestion <= 5)
                    question = "#q" + (--numQuestion);
                else if(numQuestion === 1)
                    question = "#q1";
                else
                    question = "#q" + maxQuestions;

        } else
                question = numQuestion<maxQuestions ? ("#q" + (++numQuestion)) : "#placar";

        return question;

}

function showRightAnswer() {
    $(".opcao").click(function () {
        //$(this).siblings('.opcao').addClass("bg-primary");
        var tabAtual = $('.active p').attr("id");
        tabAtual = tabAtual.charAt(tabAtual.length-1);
        tabAtual = parseInt(tabAtual);
        var resposta = $(this).children().text();
        var pergunta = $(this).siblings('p').text();
        var questaoRespondida = filterQuestion(questoesQuiz, pergunta)[0];
        var respCorreta = questaoRespondida.correta;
        $(".opcao").each(function() {
            let opcao = $( this ).children("p").html();
            if ( opcao === respCorreta ){
                $(this).removeClass("bg-primary");
                $(this).addClass("bg-secondary");
            } 
        });
        var acertou = false;

        if (respCorreta == resposta) {
            respostas[tabAtual - 1] = 1;
            questaoRespondida.respostaUsuario = 1;
            acertou = true;
            $(this).removeClass("bg-primary");
            $(this).addClass("bg-secondary");
        } else {
            respostas[tabAtual - 1] = 0;
            questaoRespondida.respostaUsuario = 0;
            $(this).removeClass("bg-primary");
            $(this).addClass("bg-tertiary");
        }

        $(this).siblings('.opcao').removeClass("bg-tertiary");
        $(this).siblings('.opcao').addClass("bg-primary");
        atualizarGraficoResultados();
        $("#btnProximo").removeAttr("disabled");
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


function atualizarGraficoResultados() {
    var labels = [];
    var dataAcertos = [];
    var dataErros = [];

    for (var i = 0; i < restricoes.length; i++) {
        var questoesRestricao = filterRestriction(questoesQuiz, restricoes[i]);
        var quantAcertos = 0;
        var quantErros = 0
        
        for (var j = 0; j < questoesRestricao.length; j++) {
            if (questoesRestricao[j].respostaUsuario == 1) {
                quantAcertos += 1;
            } else if (questoesRestricao[j].respostaUsuario == 0) {
                quantErros += 1;
            }
        }
        labels.push(restricoes[i]);
        dataAcertos.push(quantAcertos);
        dataErros.push(dataErros);
    }
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: labels,
          datasets: [
            {
              label: "Acertos",
              fill: true,
              backgroundColor: "rgba(179,181,198,0.2)",
              borderColor: "rgba(179,181,198,1)",
              pointBorderColor: "#fff",
              pointBackgroundColor: "rgba(179,181,198,1)",
              data: dataAcertos
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Distribuição de acertos das questões por tipos de restrições/objetivos'
          }
        }
    });
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
