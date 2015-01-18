window.onload = function() {

// var img_data= [
// {'org': 'Al Jazeera English', 'image': }
// ]

var width = 1000;

function timelineHover() {
    var hashed = window.location.hash.replace('#', '');
    console.log(hashed)


    d3.json("data/data.json", function(error, json) {
        if (error) return console.warn(error);
        data = json[hashed];

        var first_item = data[0]['times'][0];
        var arry = first_item.url.split('=');
        d3.select('#vid-frame').attr('src' , '//www.youtube.com/embed/'+arry[1]);


        var chart = d3.timeline()
        .stack()
        .margin({left:150, right:30, top:0, bottom:0})
        .hover(function (d, i, datum) {
            var div = $('#hoverRes');
            var colors = chart.colors();
            div.find('.coloredDiv').css('background-color', colors(i))
            div.find('#name').text(datum.label);
        });

        var svg = d3.select("#timeline3").append("svg").attr("width", width)
        .datum(data).call(chart);

    });
}

timelineHover();

}
