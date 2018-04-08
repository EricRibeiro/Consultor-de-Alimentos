$(document).ready(function () {
    loadAliments();
});

var aliments;

function loadAliments() {
    $.getJSON("assets/js/lib/aliments.json", function (data) {
        aliments = data;
        loadDefaultTable();
    });
}

function loadDefaultTable() {
    var content = "";
    var caloria = "";
    var proteina = "";

    shuffle(aliments);

    for (var i = 0; i < 4; i++) {
        caloria = aliments[i].energia.kcal;
        caloria = parseInt(caloria);

        proteina = aliments[i].proteina;
        proteina = parseInt(proteina);

        content += "<tr>";
        content += "<td class='content-align'>" + aliments[i].descricao + "</td>";
        content += "<td class='content-align'>" + caloria + " kcal</td>";
        content += "<td class='content-align'>" + proteina + "g</td>";
        content += "<td> " +
            "<button id='" + aliments[i]._id +  "' class='btn btn-primary btn-icon btn-round' type='button'>" +
            "<i class='now-ui-icons ui-2_favourite-28'></i>" +
            "</button>" +
            "</td>";
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