$(document).ready(function () {
    initTable();
    bindSelectEvent();
});

var aliments;

function initTable() {

    $.getJSON("https://raw.githubusercontent.com/EricRibeiro/Consultor-de-Alimentos/master/assets/js/lib/aliments.json", function (data) {
        aliments = data;
        loadDefaultTable();
    });
}

function loadDefaultTable() {
    let table = "";
    let content = "";

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

    for (let i = 0; i < aliments.length; i++) {
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
    let table = "";
    let content = "";

    table += "<table id='aliments' class='table'>";
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

    for (let i = 0; i < aliments.length; i++) {
        let caloria = aliments[i].energia.kcal;
        caloria = parseFloat(caloria);

        if (caloria < 15 && !isNaN(caloria)) {
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
    let table = "";
    let content = "";

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

    $('#aliments-table').html("");
    $('#aliments-table').append(table);

    for (let i = 0; i < aliments.length; i++) {
        let proteina = aliments[i].proteina;
        proteina = parseFloat(proteina);

        if (proteina > 30 && !isNaN(proteina)) {
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
    let table = "";
    let content = "";

    table += "<table id='aliments' class='table'>";
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

    for (let i = 0; i < aliments.length; i++) {
        let calcio = aliments[i].calcio;
        calcio = parseFloat(calcio);

        if (calcio > 50 && !isNaN(calcio)) {
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
    let table = "";
    let content = "";

    table += "<table id='aliments' class='table'>";
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

    for (let i = 0; i < aliments.length; i++) {
        let ferro = aliments[i].ferro;
        ferro = parseFloat(ferro);

        if (ferro > 5 && !isNaN(ferro)) {
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
    let table = "";
    let content = "";

    table += "<table id='aliments' class='table'>";
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

    for (let i = 0; i < aliments.length; i++) {
        let fibra = aliments[i].fibra_alimentar;
        fibra = parseFloat(fibra);

        if (fibra > 15 && !isNaN(fibra)) {
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

function loadLowFatTable() {
    let table = "";
    let content = "";

    table += "<table id='aliments' class='table'>";
    table += "<thead>";
    table += "<tr>";
    table += "<th class='text-center'>Descrição</th>";
    table += "<th class='text-center'>Calorias</th>";
    table += "<th hidden>-</th>";
    table += "<th class='text-center'>Detalhes</th>";
    table += "<th hidden>Calorias Sort</th>";
    table += "<th hidden>-</th>";
    table += "</thead>";
    table += "<tbody>";
    table += "</tbody>";
    table += "</table>";

    $('#aliments-table').html("");
    $('#aliments-table').append(table);

    for (let i = 0; i < aliments.length; i++) {
        let calcium = aliments[i].calcio;
        let fiber = aliments[i].fibra_alimentar;
        let protein = aliments[i].proteina;

        calcium = parseFloat(calcium);
        fiber = parseFloat(fiber);
        protein = parseFloat(protein);

        isCalciumValid = (calcium > 20 && !isNaN(calcium));
        isFiberValid = (fiber > 15 && !isNaN(fiber));
        isProteinValid = (protein > 15 && !isNaN(protein));

        if (isCalciumValid && isFiberValid && isProteinValid) {
            content += "<tr>";
            content += "<td class='content-align'>" + aliments[i].descricao + "</td>";
            content += "<td class='content-align'>" + evalAlimentsContent(aliments[i].energia.kcal, "kcal") + "</td>";
            content += "<td hidden>-</td>";
            content += getBtnContent(i);
            content += "<td hidden>" + evalAlimentsContentWithZero(aliments[i].energia.kcal) + "</td>";
            content += "<td hidden></td>";
            content += "</tr>";
        }
    }

    $('tbody').append(content);

    initDataTables();
    customizeTableComponents();
}

function loadMaintainWeigthTable() {
    let table = "";
    let content = "";

    table += "<table id='aliments' class='table'>";
    table += "<thead>";
    table += "<tr>";
    table += "<th class='text-center'>Descrição</th>";
    table += "<th class='text-center'>Calorias</th>";
    table += "<th hidden>-</th>";
    table += "<th class='text-center'>Detalhes</th>";
    table += "<th hidden>Calorias Sort</th>";
    table += "<th hidden>-</th>";
    table += "</thead>";
    table += "<tbody>";
    table += "</tbody>";
    table += "</table>";

    $('#aliments-table').html("");
    $('#aliments-table').append(table);

    for (let i = 0; i < aliments.length; i++) {
        let calcium = aliments[i].calcio;
        let fiber = aliments[i].fibra_alimentar;
        let protein = aliments[i].proteina;

        calcium = parseFloat(calcium);
        fiber = parseFloat(fiber);
        protein = parseFloat(protein);

        isCalciumValid = (calcium > 20 && !isNaN(calcium));
        isFiberValid = (fiber > 15 && !isNaN(fiber));
        isProteinValid = (protein > 15 && !isNaN(protein));

        if (isCalciumValid && isFiberValid && isProteinValid) {
            content += "<tr>";
            content += "<td class='content-align'>" + aliments[i].descricao + "</td>";
            content += "<td class='content-align'>" + evalAlimentsContent(aliments[i].energia.kcal, "kcal") + "</td>";
            content += "<td hidden>-</td>";
            content += getBtnContent(i);
            content += "<td hidden>" + evalAlimentsContentWithZero(aliments[i].energia.kcal) + "</td>";
            content += "<td hidden></td>";
            content += "</tr>";
        }
    }

    $('tbody').append(content);

    initDataTables();
    customizeTableComponents();
}

function loadMassGainTable() {
    let table = "";
    let content = "";

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

    $('#aliments-table').html("");
    $('#aliments-table').append(table);

    for (let i = 0; i < aliments.length; i++) {
        let proteina = aliments[i].proteina;
        proteina = parseFloat(proteina);

        if (proteina > 30 && !isNaN(proteina)) {
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

function bindSelectEvent() {
    $('#sel1').change(function () {
        $("#sel2").val("Selecionar Objetivo");
        $("#explanation-goal").attr('hidden', true);
        $("#explanation-restriction").removeAttr('hidden');

        let diet = $(this).val();
        const $p =  $("#explanation-restriction").children();

        switch (diet) {
            case 'Reduzidos em Carboidratos':
                loadLowCarbTable();
                loadExplanation($p, lowCarbExplanation());
                break;
            case 'Ricos em Proteína':
                loadProteinTable();
                loadExplanation($p, proteinExplanation());
                break;
            case 'Ricos em Cálcio':
                loadCalciumTable();
                loadExplanation($p, calciumExplanation());
                break;
            case 'Ricos em Ferro':
                loadIronTable();
                loadExplanation($p, ironExplanation());
                break;
            case 'Ricos em Fibra':
                loadFiberTable();
                loadExplanation($p, fiberExplanation());
                break;
        }
    });

    $('#sel2').change(function () {
        $("#sel1").val("Selecionar Restrição");
        $("#explanation-restriction").attr('hidden', true);
        $("#explanation-goal").removeAttr('hidden');


        let goal = $(this).val();
        const $p =  $("#explanation-goal").children();

        switch (goal) {
            case 'Reduzir Percentual de Gordura':
                loadLowFatTable();
                loadExplanation($p, lowFatExplanation());
                break;
            case 'Manter o Peso':
                loadMaintainWeigthTable();
                loadExplanation($p, maintainWeigthExplanation());
                break;
            case 'Ganhar Massa Magra':
                loadMassGainTable();
                loadExplanation($p, massGainExplanation());
                break;
        }
    });
}

function showAlimentDetails(arrayPos) {
    let content = "";

    content += "<div class='row'>";
    content += "<div class='col-md-6'>";
    content += "<h6>Descrição</h6>";
    content += "<p>" + aliments[arrayPos].descricao + "</p>";
    content += "</div>";

    content += "<div class='col-md-6'>";
    content += "<h6>Categoria</h6>";
    content += "<p>" + aliments[arrayPos].categoria + "</p>";
    content += "</div>";
    content += "</div>";

    content += "<div class='row'>";
    content += "<div class='col-md-6'>";
    content += "<h6>Calorias</h6>";
    content += "<p>" + evalAlimentsContent(aliments[arrayPos].energia.kcal, "kcal") + "</p>";
    content += "</div>";

    content += "<div class='col-md-6'>";
    content += "<h6>Proteínas</h6>";
    content += "<p>" + evalAlimentsContent(aliments[arrayPos].proteina, "g") + "</p>";
    content += "</div>";
    content += "</div>";

    content += "<div class='row'>";
    content += "<div class='col-md-6'>";
    content += "<h6>Lipídios</h6>";
    content += "<p>" + evalAlimentsContent(aliments[arrayPos].lipideos, "g") + "</p>";
    content += "</div>";

    content += "<div class='col-md-6'>";
    content += "<h6>Colesterol</h6>";
    content += "<p>" + evalAlimentsContent(aliments[arrayPos].colesterol, "g") + "</p>";
    content += "</div>";
    content += "</div>";

    content += "<div class='row'>";
    content += "<div class='col-md-6'>";
    content += "<h6>Fibra</h6>";
    content += "<p>" + evalAlimentsContent(aliments[arrayPos].fibra_alimentar, "g") + "</p>";
    content += "</div>";

    content += "<div class='col-md-6'>";
    content += "<h6>Cálcio</h6>";
    content += "<p>" + evalAlimentsContent(aliments[arrayPos].calcio, "g") + "</p>";
    content += "</div>";
    content += "</div>";

    content += "<div class='row'>";
    content += "<div class='col-md-6'>";
    content += "<h6>Magnésio</h6>";
    content += "<p>" + evalAlimentsContent(aliments[arrayPos].magnesio, "g") + "</p>";
    content += "</div>";

    content += "<div class='col-md-6'>";
    content += "<h6>Fósforo</h6>";
    content += "<p>" + evalAlimentsContent(aliments[arrayPos].fosforo, "g") + "</p>";
    content += "</div>";
    content += "</div>";

    content += "<div class='row'>";
    content += "<div class='col-md-6'>";
    content += "<h6>Ferro</h6>";
    content += "<p>" + evalAlimentsContent(aliments[arrayPos].ferro, "g") + "</p>";
    content += "</div>";

    content += "<div class='col-md-6'>";
    content += "<h6>Sódio</h6>";
    content += "<p>" + evalAlimentsContent(aliments[arrayPos].sodio, "g") + "</p>";
    content += "</div>";
    content += "</div>";

    content += "<div class='row'>";
    content += "<div class='col-md-6'>";
    content += "<h6>Potássio</h6>";
    content += "<p>" + evalAlimentsContent(aliments[arrayPos].potassio, "g") + "</p>";
    content += "</div>";

    content += "<div class='col-md-6'>";
    content += "<h6>Cobre</h6>";
    content += "<p>" + evalAlimentsContent(aliments[arrayPos].cobre, "g") + "</p>";
    content += "</div>";
    content += "</div>";

    content += "<div class='row'>";
    content += "<div class='col-md-6'>";
    content += "<h6>Zinco</h6>";
    content += "<p>" + evalAlimentsContent(aliments[arrayPos].zinco, "g") + "</p>";
    content += "</div>";

    content += "<div class='col-md-6'>";
    content += "<h6>Vitamina C</h6>";
    content += "<p>" + evalAlimentsContent(aliments[arrayPos].vitamina_c, "g") + "</p>";
    content += "</div>";
    content += "</div>";

    $('.modal-body').html("");
    $('.modal-body').append(content);

    $('#myModal').modal('show');
}

function getBtnContent(arrayPos) {
    let btnContent =

        "<td onclick=showAlimentDetails(" + arrayPos + ")> " +
        "<button value='" + arrayPos + "' class='btn btn-primary btn-icon btn-round' type='button'>" +
        "<i class='now-ui-icons ui-1_simple-add'></i>" +
        "</button>" +
        "</td>";

    return btnContent;
}

function evalAlimentsContent(value, unit) {
    valueFloat = parseFloat(value);
    valueFloat = valueFloat.toFixed(2);

    if (!isNaN(valueFloat)) {
        valueFloat += unit;
        value = valueFloat;
    }

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
    let container = $('body'),
        scrollTo = $('#alimentos');

    container.animate({
        scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
    });
}

function loadExplanation($p, explanation) {
    $p.html(explanation);
}

function lowCarbExplanation() {
    return "Foram filtrados alimentos com menos de 15Kcal de <strong>calorias</strong>.";
}

function proteinExplanation() {
    return "Foram filtrados alimentos com mais de 30g de <strong>proteína</strong>.";
}

function calciumExplanation() {
    return "Foram filtrados alimentos com mais de 50g de <strong>cálcio</strong>.";
}

function ironExplanation() {
    return "Foram filtrados alimentos com mais de 5g de <strong>ferro</strong>.";
}

function fiberExplanation() {
    return "Foram filtrados alimentos com mais de 15g de <strong>fibras</strong>.";
}

function lowFatExplanation() {
    return "Foram filtrados alimentos com mais de:" +
        "<ul>" +
        "<li>20g de <strong>cálcio</strong></li>" +
        "<li>15g de <strong>fibras</strong></li>" +
        "<li>15g de <strong>proteína</strong></li>" +
        "</ul>";
}

function maintainWeigthExplanation() {
    return ""
}

function massGainExplanation() {
    return ""
}