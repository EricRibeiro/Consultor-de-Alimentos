$(document).ready(function () {
    initTable();
    bindSelectEvent();
});

var aliments;

function initTable() {
    $.getJSON("https://raw.githubusercontent.com/EricRibeiro/Mass-Builder/master/assets/js/lib/aliments.json", function (data) {
        aliments = data;
        loadDefaultTable();
    });
}

function loadDefaultTable() {
    var table = "";
    var content = "";

    table +=  "<table id='aliments' class='table'>";
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

function loadLowCarbTable() {
    var table = "";
    var content = "";

    table +=  "<table id='aliments' class='table'>";
    table += "<thead>";
    table += "<tr>";
    table += "<th class='text-center'>Descrição</th>";
    table += "<th class='text-center'>Calorias</th>";
    table += "<th class='text-center'>Lipídios</th>";
    table += "<th class='text-center'>Detalhes</th>";
    table += "<th hidden>Calorias Sort</th>";
    table += "<th hidden>Lipídios Sort</th>";
    table += "</thead>";
    table += "<tbody>";
    table += "</tbody>";
    table += "</table>";

    $('#aliments-table').html("");
    $('#aliments-table').append(table);

    for (var i = 0; i < aliments.length; i++) {
        var caloria = aliments[i].energia.kcal;
        caloria = parseFloat(caloria);

        if(caloria < 15 && !isNaN(caloria)) {
            content += "<tr>";
            content += "<td class='content-align'>" + aliments[i].descricao + "</td>";
            content += "<td class='content-align'>" + evalAlimentsContent(aliments[i].energia.kcal, "kcal") + "</td>";
            content += "<td class='content-align'>" + evalAlimentsContent(aliments[i].lipideos, "g") + "</td>";
            content += getBtnContent(i);
            content += "<td hidden>" + evalAlimentsContentWithZero(aliments[i].energia.kcal) + "</td>";
            content += "<td hidden>" + evalAlimentsContentWithZero(aliments[i].lipideos) + "</td>";
            content += "</tr>";
        }
    }

    $('tbody').append(content);

    initDataTables();
    customizeTableComponents();
}

function loadProteinTable() {
    var table = "";
    var content = "";

    table +=  "<table id='aliments' class='table'>";
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

    $('#aliments-table').html("");
    $('#aliments-table').append(table);

    for (var i = 0; i < aliments.length; i++) {
        var proteina = aliments[i].proteina;
        proteina = parseFloat(proteina);

        if(proteina > 30 && !isNaN(proteina)) {
            content += "<tr>";
            content += "<td class='content-align'>" + aliments[i].descricao + "</td>";
            content += "<td class='content-align'>" + evalAlimentsContent(aliments[i].energia.kcal, "kcal") + "</td>";
            content += "<td class='content-align'>" + evalAlimentsContent(aliments[i].proteina, "g") + "</td>";
            content += getBtnContent(i);
            content += "<td hidden>" + evalAlimentsContentWithZero(aliments[i].energia.kcal) + "</td>";
            content += "<td hidden>" + evalAlimentsContentWithZero(aliments[i].proteina) + "</td>";
            content += "</tr>";
        }
    }

    $('tbody').append(content);

    initDataTables();
    customizeTableComponents();
}

function loadCalciumTable() {
    var table = "";
    var content = "";

    table +=  "<table id='aliments' class='table'>";
    table += "<thead>";
    table += "<tr>";
    table += "<th class='text-center'>Descrição</th>";
    table += "<th class='text-center'>Calorias</th>";
    table += "<th class='text-center'>Cálcio</th>";
    table += "<th class='text-center'>Detalhes</th>";
    table += "<th hidden>Calorias Sort</th>";
    table += "<th hidden>Cálcio Sort</th>";
    table += "</thead>";
    table += "<tbody>";
    table += "</tbody>";
    table += "</table>";

    $('#aliments-table').html("");
    $('#aliments-table').append(table);

    for (var i = 0; i < aliments.length; i++) {
        var calcio = aliments[i].calcio;
        calcio = parseFloat(calcio);

        if(calcio > 50 && !isNaN(calcio)) {
            content += "<tr>";
            content += "<td class='content-align'>" + aliments[i].descricao + "</td>";
            content += "<td class='content-align'>" + evalAlimentsContent(aliments[i].energia.kcal, "kcal") + "</td>";
            content += "<td class='content-align'>" + evalAlimentsContent(aliments[i].calcio, "g") + "</td>";
            content += getBtnContent(i);
            content += "<td hidden>" + evalAlimentsContentWithZero(aliments[i].energia.kcal) + "</td>";
            content += "<td hidden>" + evalAlimentsContentWithZero(aliments[i].calcio) + "</td>";
            content += "</tr>";
        }
    }

    $('tbody').append(content);

    initDataTables();
    customizeTableComponents();
}

function loadIronTable() {
    var table = "";
    var content = "";

    table +=  "<table id='aliments' class='table'>";
    table += "<thead>";
    table += "<tr>";
    table += "<th class='text-center'>Descrição</th>";
    table += "<th class='text-center'>Calorias</th>";
    table += "<th class='text-center'>Ferro</th>";
    table += "<th class='text-center'>Detalhes</th>";
    table += "<th hidden>Calorias Sort</th>";
    table += "<th hidden>Ferro Sort</th>";
    table += "</thead>";
    table += "<tbody>";
    table += "</tbody>";
    table += "</table>";

    $('#aliments-table').html("");
    $('#aliments-table').append(table);

    for (var i = 0; i < aliments.length; i++) {
        var ferro = aliments[i].ferro;
        ferro = parseFloat(ferro);

        if(ferro > 5 && !isNaN(ferro)) {
            content += "<tr>";
            content += "<td class='content-align'>" + aliments[i].descricao + "</td>";
            content += "<td class='content-align'>" + evalAlimentsContent(aliments[i].energia.kcal, "kcal") + "</td>";
            content += "<td class='content-align'>" + evalAlimentsContent(aliments[i].ferro, "g") + "</td>";
            content += getBtnContent(i);
            content += "<td hidden>" + evalAlimentsContentWithZero(aliments[i].energia.kcal) + "</td>";
            content += "<td hidden>" + evalAlimentsContentWithZero(aliments[i].ferro) + "</td>";
            content += "</tr>";
        }
    }

    $('tbody').append(content);

    initDataTables();
    customizeTableComponents();
}

function loadFiberTable() {
    var table = "";
    var content = "";

    table +=  "<table id='aliments' class='table'>";
    table += "<thead>";
    table += "<tr>";
    table += "<th class='text-center'>Descrição</th>";
    table += "<th class='text-center'>Calorias</th>";
    table += "<th class='text-center'>Fibra</th>";
    table += "<th class='text-center'>Detalhes</th>";
    table += "<th hidden>Calorias Sort</th>";
    table += "<th hidden>Fibra Sort</th>";
    table += "</thead>";
    table += "<tbody>";
    table += "</tbody>";
    table += "</table>";

    $('#aliments-table').html("");
    $('#aliments-table').append(table);

    for (var i = 0; i < aliments.length; i++) {
        var fibra = aliments[i].fibra_alimentar;
        fibra = parseFloat(fibra);

        if(fibra > 15 && !isNaN(fibra)) {
            content += "<tr>";
            content += "<td class='content-align'>" + aliments[i].descricao + "</td>";
            content += "<td class='content-align'>" + evalAlimentsContent(aliments[i].energia.kcal, "kcal") + "</td>";
            content += "<td class='content-align'>" + evalAlimentsContent(aliments[i].fibra_alimentar, "g") + "</td>";
            content += getBtnContent(i);
            content += "<td hidden>" + evalAlimentsContentWithZero(aliments[i].energia.kcal) + "</td>";
            content += "<td hidden>" + evalAlimentsContentWithZero(aliments[i].fibra_alimentar) + "</td>";
            content += "</tr>";
        }
    }

    $('tbody').append(content);

    initDataTables();
    customizeTableComponents();
}

function bindSelectEvent() {
    $('#sel1').change(function() {
        $("#sel2").val("Selecionar Objetivo");

        var diet = $(this).val();

        switch (diet) {
            case 'Reduzidos em Carboidratos':
                loadLowCarbTable();
                break;
            case 'Ricos em Proteína':
                loadProteinTable();
                break;
            case 'Ricos em Cálcio':
                loadCalciumTable();
                break;
            case 'Ricos em Ferro':
                loadIronTable();
                break;
            case 'Ricos em Fibra':
                loadFiberTable();
                break;
        }
    });
}

function getBtnContent(arrayPos) {
    var btnContent =

        "<td> " +
        "<button value='" + arrayPos + "' class='btn btn-primary btn-icon btn-round' type='button'>" +
        "<i class='now-ui-icons ui-2_favourite-28'></i>" +
        "</button>" +
        "</td>";

    return btnContent;
}

function evalAlimentsContent(value, unit) {
    value = parseFloat(value);
    value = value.toFixed(2);

    if (isNaN(value))
        value = "-"
    else
        value += unit;

    return value;
}

function evalAlimentsContentWithZero(value) {
    value = parseFloat(value);
    value = value.toFixed(2);

    if (isNaN(value))
        value = 0;

    return value;
}

function initDataTables() {
    $('#aliments').DataTable({
        "iDisplayLength": 5,
        "aLengthMenu": [5, 10],
        "stripeClasses": [],
        "columnDefs": [
            {"orderable": false, "targets": 3},
            {"orderData": [4], "targets": [1]},
            {"orderData": [5], "targets": [2]}
        ]
    });
}

function customizeTableComponents() {
    $("#aliments_filter").hide();
    $('#aliments_length').hide();
}

function filter(text) {
    $searchBar = $("input[type='search']");
    $("input[type='search']").val(text).keyup();
}

function scroll() {
    var container = $('body'),
        scrollTo = $('#alimentos');

    container.animate({
        scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
    });
}