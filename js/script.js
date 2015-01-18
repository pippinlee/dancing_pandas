window.onload = function() {

    var labelTestData = [
{label: "FOX", times: [{"starting_time": 1355752800000, "ending_time": 1355759900000, "thumb": "Bowser.gif"}, {"starting_time": 1355767900000, "ending_time": 1355774400000, "thumb": "Bowser.gif"}]},
{label: "MSNBC", times: [{"starting_time": 1355752800000, "ending_time": 1355759900000, "thumb": "Bowser.gif"}, {"starting_time": 1355759910000, "ending_time": 1355761900000, "thumb": "Bowser.gif"}, ]},
{label: "VOX", times: [{"starting_time": 1355761910000, "ending_time": 1355763910000, "thumb": "Bowser.gif"}]},
];

var labelColorTestData = [
{label: "FOX", times: [{"color":"green", "label":"Weeee", "starting_time": 1355752800000, "ending_time": 1355759900000}, {"color":"blue", "label":"Weeee", "starting_time": 1355767900000, "ending_time": 1355774400000}]},
{label: "MSNBC", times: [{"color":"pink", "label":"Weeee", "starting_time": 1355759910000, "ending_time": 1355761900000}, ]},
{label: "VOX", times: [{"color":"yellow", "label":"Weeee", "starting_time": 1355761910000, "ending_time": 1355763910000}]},
];


var width = 1000;

function timelineHover() {
    var hashed = window.location.hash.replace('#', '');
    console.log(hashed)


    d3.json("data/data.json", function(error, json) {
        if (error) return console.warn(error);
        data = json[hashed];
        console.log(data)

        var chart = d3.timeline()
        .stack()
        .margin({left:70, right:30, top:0, bottom:0})
        .hover(function (d, i, datum) {
            var div = $('#hoverRes');
            var colors = chart.colors();
            div.find('.coloredDiv').css('background-color', colors(i))
            div.find('#name').text(datum.label);
        })
        .click(function (d, i, datum) {
            alert(datum.label);
        })
        .scroll(function (x, scale) {
            $("#scrolled_date").text(scale.invert(x) + " to " + scale.invert(x+width));
        });

        var svg = d3.select("#timeline3").append("svg").attr("width", width)
        .datum(data).call(chart);

    });
}

timelineHover();

}
