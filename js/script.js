window.onload = function() {

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
        .margin({left:150, right:30, top:0, bottom:0})
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
