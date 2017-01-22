var globals = {
  insideCircle: 0,
  outsideCircle: 0,
  insideColor: "#1FA1CC",
  outsideColor: "#3E7D29",
  circleColor: "#042956",
  canvasWidth: 800,
  canvasHeight: 800,
  circleRadius: 400
}

$("document").ready(function(){
  canvas.init();
  canvas.clear();

});


var utils = (function($){
  function getRandomInt() {
    return Math.floor(Math.random() * (globals.canvasWidth+1));
  }


  return {
    getRandomInt: getRandomInt
  }
}(jQuery));

var canvas = (function($){
  //public reference to canvas object
  var $canvas = $("#canvas");
  //reference to the setInterval result
  var animation;

  //Private functions
  function drawPoint(x,y,color){
    $canvas.drawArc({
      fillStyle: color,
      strokeStyle: color,
      strokeWidth: 1,
      x: x, y: y,
      radius: 0.5
    });
  }
  function pointAdded(isInside){
    var result;

    if(isInside) updateInsideCount();

    updateAllPointsCount();
    updateResult(computePi());
  }

  function updateInsideCount(){
    globals.insideCircle++;
    $("#pointsInCircle").html(globals.insideCircle);
  }

  function clearInsideCount(){
    $("#pointsInCircle").html("-");
  }

  function updateAllPointsCount(){
    globals.outsideCircle++;
    $("#numberOfPoints").html(globals.outsideCircle);
  }

  function clearAllPointsCount(){
    $("#numberOfPoints").html("-");
  }

  function updateResult(value){
    $("#result").html(value);
  }

  function clearResult(){
    $("#result").html("-");
  }

  function computePi(){
    return (4*globals.insideCircle)/globals.outsideCircle;
  }
  function startAnimation(){
    animation = window.setInterval(function(){
      var x = utils.getRandomInt();
      var y = utils.getRandomInt();
      var color;
      if (Math.sqrt((x-globals.circleRadius)*(x-globals.circleRadius) + (y-globals.circleRadius)*(y-globals.circleRadius)) > globals.circleRadius ){
        pointAdded(false);
        color = globals.outsideColor;
      }
      else{
        pointAdded(true);
        color = globals.insideColor;
      }
      drawPoint(x,y,color);
    });
  }


  // Public functions
  function clearCanvas(){
    $canvas.clearCanvas().drawArc({
      fillStyle: "white",
      strokeStyle: globals.circleColor,
      strokeWidth: 1,
      x: 400, y: 400,
      radius: 400
    });
    clearInsideCount();
    clearResult();
    clearAllPointsCount();
  }

  function init(){
    $("#start").on("click", function(){
      if($(this).is(":disabled")) return;

      startAnimation();
      $(this).attr("disabled", "disabled");
    });

    $("#pause").on("click", function(){
      window.clearTimeout(animation);
      $("#start").removeAttr("disabled");
    });

    $("#stop").on("click", function(){
      clearCanvas();
      window.clearTimeout(animation);
      $("#start").removeAttr("disabled");
    });
  }
  return {
    canvas: $canvas,
    clear: clearCanvas,
    init: init
  }
}(jQuery));
