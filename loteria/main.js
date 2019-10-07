/* global d3 */
$(function() 
{
  var lines = "";
  var options = new Array();

  $("#contenido").hide(0);

  fetch('estudiantes.txt')
      .then(res => res.text())
      .then(content => {
          lines = content.split(/\n/);
          lines.forEach(line => console.log(line));
          options = d3.shuffle(lines);
          options.forEach(line => console.log(line));
      });
  $("#button").click( function()
  {
    $("#contenido").show(2);
    $("#button").hide(0);
    // https://cmatskas.com/get-url-parameters-using-javascript/
    var parseQueryString = function(url) {
      var urlParams = {};
      url.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function($0, $1, $2, $3) {
          urlParams[$1] = $3;
        }
      );
    
      return urlParams;
    };
    
    var params = parseQueryString(location.search);
    if (params && params.section==="2") {
      options = [
    
      ];
    
    }
    
    var allOptions = options.map(function (d, i) {
      return {name:d, id:i, drawn:false};
    });
    var optionsLeft = allOptions.map(function (d) { return d; });
    var optionsDrawn = [];
    
    
    var width = 500,
      height = 500,
      endAngle = 360 - 360/options.length ;
    
    var svg = d3.select("#result")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    
    var angleScale = d3.scale.linear()
      .domain([0, options.length-1])
      .range([0,endAngle]);
    
    
    d3.select("#btnChoose")
      .on("click", onChoose);
    
    
    
    function redraw(options) {
      var optionsSel = svg.selectAll(".option")
        .data(options);
    
      optionsSel.enter()
        .append("text")
        .attr("class", "option");
    
      optionsSel
        // .attr("x", width/2)
        // .attr("y", height/2)
        .attr("id", function (d) { return "id"+ d.id; })
        .classed("drawn", function(d) { return d.drawn; })
        .text(function(d) { return d.name; })
        .transition().duration(1000)
        .attr("transform", function (d) {
          return "translate(" + (width/2- (7*options.length)) + "," + height/2  +
            ") rotate(" + angleScale(d.id) + ")" +
            ", translate(" + (7*options.length) + ",0)";
        });
    
      optionsSel.exit().remove();
    
    }
    
    
    redraw(allOptions);
    
    function onChoose() {
      var sel = Math.floor(Math.random() * optionsLeft.length);
      var optionSel = optionsLeft.splice(sel, 1)[0];
    
      if(optionSel === undefined) {
        console.log("Se eligieron todos los estudiantes");
        alert("Se eligieron todos los estudiantes");  // Optional
      }
    
      optionSel.drawn = true;
      optionsDrawn = [optionSel].concat(optionsDrawn);
      angleScale
        .range([0, endAngle]);
      var selAngle = angleScale(optionSel.id);
    
      console.log("sel="+ sel +" angle="+selAngle + " option " + optionSel.name);
    
      angleScale.range([-selAngle, endAngle-selAngle]);
      console.log("#id "+sel);
      d3.selectAll(".option")
        .classed("selected", false);
      redraw(allOptions);
      console.log("#id" + optionSel.id);
      d3.select("#id" + optionSel.id)
        .classed("selected", true);
    
      var drawn = d3.select("#drawn").selectAll(".drawn")
        .data(optionsDrawn);
    
      drawn.enter()
        .append("p");
      drawn
        .attr("class", "drawn")
        .text(function (d) { return d.name; });
      drawn.exit().remove();
    
    }
  });
});