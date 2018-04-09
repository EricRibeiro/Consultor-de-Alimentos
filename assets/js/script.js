$(document).ready(function () {
    initTable();
});

var aliments;

function initTable() {
    $.getJSON("https://raw.githubusercontent.com/EricRibeiro/Mass-Builder/master/assets/js/lib/aliments.json", function (data) {
        aliments = data;
        loadDefaultTable();
        initDataTables();
        customizeTableComponents();
    });
}

function loadDefaultTable() {
    var content = "";
    var caloria = "";
    var proteina = "";

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
