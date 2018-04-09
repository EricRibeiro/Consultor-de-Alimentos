$(document).ready(function () {
    init();
});

function init() {
    $.getJSON("https://raw.githubusercontent.com/EricRibeiro/Mass-Builder/master/assets/js/lib/perguntas.json", function (data) {
        quiz = data;
        loadQuiz(data);
    });
}

function loadQuiz(data) {
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    $('#q1').text(data[numeroAleatorio]);
}

function loadDefaultTable() {
    var table = "";
    var content = "";

    table += "<table id='aliments' class='table'>";
    table += "<thead>";
    table += "<tr>";
    table += "<th class='text-center'>Descrição</th>";
    table += "<th class='text-center'>Calorias</th>";
    table += "<th class='text-center'>Proteína</th>";
    table += "<th class='text-center'>Detalhes</th>";
    table += "<th hidden>Calorias Sort</th>";
    table += "<th hidden>Proteína Sort</th>";
    table += "</thead>";
    table += "<tbody>";
    table += "</tbody>";
    table += "</table>";

    $('#aliments-table').append(table);

    for (var i = 0; i < aliments.length; i++) {
        content += "<tr>";
        content += "<td class='content-align'>" + aliments[i].descricao + "</td>";
        content += "<td class='content-align'>" + evalAlimentsContent(aliments[i].energia.kcal, "kcal") + "</td>";
        content += "<td class='content-align'>" + evalAlimentsContent(aliments[i].proteina, "g") + "</td>";
        content += getBtnContent(i);
        content += "<td hidden>" + evalAlimentsContentWithZero(aliments[i].energia.kcal) + "</td>";
        content += "<td hidden>" + evalAlimentsContentWithZero(aliments[i].proteina) + "</td>";
        content += "</tr>";
    }

    $('tbody').append(content);

    initDataTables();
    customizeTableComponents();
}

$("#sel1").change(function(){
    $(this).hide();
});