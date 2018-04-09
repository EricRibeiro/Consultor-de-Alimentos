$(document).ready(function () {
    initTable();
});

var aliments;

function initTable() {
    $.getJSON("assets/js/lib/aliments.json", function (data) {
        aliments = data;
        shuffle(aliments);
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
        caloria = aliments[i].energia.kcal;
        caloria = parseInt(caloria);

        proteina = aliments[i].proteina;
        proteina = parseInt(proteina);

        content += "<tr>";
        content += "<td class='content-align'>" + aliments[i].descricao + "</td>";
        content += "<td class='content-align'>" + caloria + " kcal</td>";
        content += "<td class='content-align'>" + proteina + "g</td>";
        content += getBtnContent(i);
        content += "</tr>";
    }

    $('tbody').append(content);

}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function getBtnContent(i) {
    var btnContent =

        "<td> " +
        "<button value='" + i + "' class='btn btn-primary btn-icon btn-round' type='button'>" +
        "<i class='now-ui-icons ui-2_favourite-28'></i>" +
        "</button>" +
        "</td>";

    return btnContent;
}

function initDataTables() {
    $('#aliments').DataTable({
        "iDisplayLength": 5,
        "aLengthMenu": [5, 10],
        "stripeClasses": [],
        "columnDefs": [
            {"ordering": false}
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
