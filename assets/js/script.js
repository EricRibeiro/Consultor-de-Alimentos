$(document).ready(function () {
    initTable();
    onSelectChangeReloadTable();
    onSelectOptionChangeShowFilters();
    onBtnClickShowPrintModal();
    onBtnClickPrint();
});

var aliments;
var filter;
var alimentsPrintTable;

function initTable() {
    $.getJSON("https://raw.githubusercontent.com/EricRibeiro/Consultor-de-Alimentos/master/assets/js/lib/aliments.json", function (data) {
        aliments = data;
        setFilter('Todos');
        loadTable(getFilter(), 'aliments');
    });
}

function initDataTables(idTable) {
    if (idTable === 'aliments-table') {
        $("#" + idTable).DataTable({
            "aLengthMenu": [5, 10],
            "columnDefs": [
                {"orderable": false, "targets": 7},
                {"visible": false, "targets": 8},
            ],
            "iDisplayLength": 5,
            "scrollX": true,
            "stripeClasses": []
        });

    } else {
        alimentsPrintTable = $("#" + idTable).DataTable({
            buttons: [
                {
                    extend: 'print',
                    title: 'Alimentos',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5, 6]
                    }
                }
            ],
            "columnDefs": [
                {"className": "dt-center", "targets": 8},
                {"orderable": false, "targets": 8},
                {"visible": false, "targets": [1, 2, 3, 4, 5, 6, 7]},
            ],
            dom: 'Bfrtip',
            "info": false,
            "order": [[0, "asc"]],
            "paging": false,
            "scrollCollapse": true,
            "scrollY": "250px",
            fnDrawCallback: function () {
                $('#aliments-print .dataTables_scrollHeadInner').css('width', '97%').css('padding-right', '13px');
                $('#aliments-print .dataTables_scrollHeadInner > table:nth-child(1)').css('width', '100%');
                $('#aliments-print .sorting_asc').css('width', '324px');
                $('#aliments-print .sorting').css('width', '324px');
                $('button.dt-button.buttons-print').hide();
            }
        });
    }
}

function onSelectOptionChangeShowFilters() {
    $('#select-options').change(function () {
        let filter = $(this).val();

        if (filter === 'Todos') {
            loadTable(getFilter(), 'aliments');
            $('#explanation').hide();
            $('.row-filters').children().hide(150);

        } else if (filter === 'Categoria') {
            $('#category').show(150);
            $('#category').siblings().hide();

        } else if (filter === 'Objetivo') {
            $('#goal').show(150);
            $('#goal').siblings().hide();

        } else {
            $('#restriction').show(150);
            $('#restriction').siblings().hide();
        }
    });
}

function onSelectChangeReloadTable() {
    $('.select-filter').change(function () {
        setFilter($(this).val());
        loadTable(getFilter(), 'aliments');
        loadExplanation(getFilter());

        new Noty({
            closeWith: ['click', 'button'],
            progressBar: false,
            text: 'Alimentos filtrados.',
            timeout: 1000,
            theme    : 'bootstrap-v4',
            type: 'success',
        }).show();

    });
}

function loadTable(filter, idTableContainer) {
    let content = "";
    let idTable = idTableContainer + "-table";
    let table = "";

    table += "<table id='" + idTable + "' class='table'>";
    table += "<thead>";
    table += "<tr>";
    table += "<th class='text-center'>Descrição</th>";
    table += "<th class='text-center'>Calorias</th>";
    table += "<th class='text-center'>Cálcio</th>";
    table += "<th class='text-center'>Ferro</th>";
    table += "<th class='text-center'>Fibras</th>";
    table += "<th class='text-center'>Lipídios</th>";
    table += "<th class='text-center'>Proteínas</th>";
    table += "<th class='text-center'>Detalhes</th>";
    table += "<th class='text-center'>Remover</th>";
    table += "</thead>";
    table += "<tbody>";
    table += "</tbody>";
    table += "</table>";

    $('#' + idTableContainer).html(table);

    for (let i = 0; i < aliments.length; i++) {
        if (filter === 'Todos' || meetsFilterCondition(filter, aliments[i])) {
            content += "<tr>";
            content += "<td class='content-align'>" + aliments[i].descricao + "</td>";
            content += "<td class='content-align'>" + evalAlimentsContent(aliments[i].energia.kcal, "kcal") + "</td>";
            content += "<td class='content-align'>" + evalAlimentsContent(aliments[i].calcio, "g") + "</td>";
            content += "<td class='content-align'>" + evalAlimentsContent(aliments[i].ferro, "g") + "</td>";
            content += "<td class='content-align'>" + evalAlimentsContent(aliments[i].fibra_alimentar, "g") + "</td>";
            content += "<td class='content-align'>" + evalAlimentsContent(aliments[i].lipideos, "g") + "</td>";
            content += "<td class='content-align'>" + evalAlimentsContent(aliments[i].proteina, "g") + "</td>";
            content += getDetailsBtnContent(i);
            content += getRemoveBtnContent(i);
            content += "</tr>";

        }
    }

    $('#' + idTable + ' tbody').html(content);

    initDataTables(idTable);
    customizeTableComponents(idTable);
}

function getDetailsBtnContent(arrayPos) {
    let btnContent =

        "<td onclick=showAlimentDetails(" + arrayPos + ")> " +
        "<button value='" + arrayPos + "' class='btn btn-primary btn-icon btn-round' type='button'>" +
        "<i class='now-ui-icons files_paper'></i>" +
        "</button>" +
        "</td>";

    return btnContent;
}

function getRemoveBtnContent(i) {
    let btnContent =

        "<td>" +
        "<button class='btn btn-danger btn-icon btn-round' id='" + "btn-remove-" + i + "' onclick='removeRow(this.id)' type='button'>" +
        "<i class='now-ui-icons ui-1_simple-delete'></i>" +
        "</button>" +
        "</td>";

    return btnContent;
}

function loadExplanation(filter) {
    let explanation = "";

    switch (filter) {
        case 'Reduzidos em Carboidratos':
            explanation = "Foram filtrados alimentos com menos de <strong>15Kcal</strong> de <strong>calorias</strong>.";
            break;

        case 'Ricos em Proteína':
            explanation = "Foram filtrados alimentos com mais de <strong>30g</strong> de <strong>proteína</strong>.";
            break;

        case 'Ricos em Cálcio':
            explanation = "Foram filtrados alimentos com mais de <strong>50g</strong> de <strong>cálcio</strong>.";
            break;

        case 'Ricos em Ferro':
            explanation = "Foram filtrados alimentos com mais de <strong>5g</strong> de <strong>ferro</strong>.";
            break;

        case 'Ricos em Fibra':
            explanation = "Foram filtrados alimentos com mais de <strong>15g</strong> de <strong>fibras</strong>.";
            break;

        case 'Reduzir Percentual de Gordura':
            explanation = "Foram filtrados alimentos com mais de:" +
                "<ul>" +
                "<li><strong>20g</strong> de <strong>cálcio</strong></li>" +
                "<li><strong>15g</strong> de <strong>fibras</strong></li>" +
                "<li><strong>15g</strong> de <strong>proteína</strong></li>" +
                "</ul>";
            break;

        case 'Carnes':
            explanation = "Foram filtrados alimentos da categoria <strong>carne</strong> e/ou <strong>derivados</strong>.";
            break;

        case 'Cereais':
            explanation = "Foram filtrados alimentos da categoria <strong>cereais</strong> e/ou <strong>derivados</strong>.";
            break;

        case 'Frutas':
            explanation = "Foram filtrados alimentos da categoria <strong>frutas</strong> e/ou <strong>derivados</strong>.";
            break;

        case 'Leite':
            explanation = "Foram filtrados alimentos da categoria <strong>leite</strong> e/ou <strong>derivados</strong>.";
            break;

        case 'Ovos':
            explanation = "Foram filtrados alimentos da categoria <strong>ovos</strong> e/ou <strong>derivados</strong>.";
            break;
    }

    $('#explanation').show();
    $('#explanation').html(explanation);
}

function meetsFilterCondition(filter, aliment) {
    let meetsFilterCondition = false;

    switch (filter) {
        case 'Reduzidos em Carboidratos':
            let caloria = aliment.energia.kcal;
            caloria = parseFloat(caloria);
            meetsFilterCondition = caloria < 15 && !isNaN(caloria);
            break;

        case 'Ricos em Proteína':
            let proteina = aliment.proteina;
            proteina = parseFloat(proteina);
            meetsFilterCondition = proteina > 30 && !isNaN(proteina);
            break;

        case 'Ricos em Cálcio':
            let calcio = aliment.calcio;
            calcio = parseFloat(calcio);
            meetsFilterCondition = calcio > 50 && !isNaN(calcio);
            break;

        case 'Ricos em Ferro':
            let ferro = aliment.ferro;
            ferro = parseFloat(ferro);
            meetsFilterCondition = ferro > 5 && !isNaN(ferro);
            break;

        case 'Ricos em Fibra':
            let fibra = aliment.fibra_alimentar;
            fibra = parseFloat(fibra);
            meetsFilterCondition = fibra > 15 && !isNaN(fibra);
            break;

        case 'Reduzir Percentual de Gordura':
            let calcium = aliment.calcio;
            let fiber = aliment.fibra_alimentar;
            let protein = aliment.proteina;

            calcium = parseFloat(calcium);
            fiber = parseFloat(fiber);
            protein = parseFloat(protein);

            let isCalciumValid = (calcium > 20 && !isNaN(calcium));
            let isFiberValid = (fiber > 15 && !isNaN(fiber));
            let isProteinValid = (protein > 15 && !isNaN(protein));

            meetsFilterCondition = isCalciumValid && isFiberValid && isProteinValid;
            break;

        case 'Carnes':
            meetsFilterCondition = aliment.categoria === 'Carnes e derivados';
            break;

        case 'Cereais':
            meetsFilterCondition = aliment.categoria === 'Cereais e derivados';
            break;

        case 'Frutas':
            meetsFilterCondition = aliment.categoria === 'Frutas e derivados';
            break;

        case 'Leite':
            meetsFilterCondition = aliment.categoria === 'Leite e derivados';
            break;

        case 'Ovos':
            meetsFilterCondition = aliment.categoria === 'Ovos e derivados';
            break;
    }

    return meetsFilterCondition;
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

    $('.modal-body-details').html(content);

    $('#myModal').modal('show');
}

function evalAlimentsContent(value, unit) {
    let valueFloat = parseFloat(value);
    valueFloat = valueFloat.toFixed(2);

    if (!isNaN(valueFloat)) {
        valueFloat += unit;
        value = valueFloat;
    } else {
        value = "Tr";
    }

    return value;
}

function customizeTableComponents(idTable) {
    $("#" + idTable + "_filter").hide();
    $("#" + idTable + "_length").hide();
}

function search(text, name) {
    $("#" + name + " input").val(text).keyup();
}

function scroll() {
    let container = $('body'),
        scrollTo = $('#alimentos');

    container.animate({
        scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
    });
}

function getFilter() {
    return this.filter;
}

function setFilter(filter) {
    this.filter = filter;
}

/* Below is the print feature code. Given time this will go in another file. */

function onBtnClickShowPrintModal() {
    $('#btn-print').click(function () {
        loadTable(getFilter(), 'aliments-print');
        $('#modal-print').modal('show');
    });
}

function onBtnClickPrint() {
    $('#btn-print-confirm').click(function () {
        $('button.dt-button.buttons-print').click();
    });
}

function removeRow(idBtn) {
    alimentsPrintTable
        .row($("#" + idBtn).parents('tr'))
        .remove()
        .draw();

    new Noty({
        closeWith: ['click', 'button'],
        progressBar: false,
        text: 'Alimento removido.',
        timeout: 1000,
        theme    : 'bootstrap-v4',
        type: 'success',
    }).show();
}