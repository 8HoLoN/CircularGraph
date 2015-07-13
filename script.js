;(function(){
  'use strict';

  var circularGraph = new CircularGraph({
      canvas:document.getElementById("GraphCanvas"),
      cardinality:414,
      coeffBase:205,
      radius:150,
      isDisplayingMarks:!true,
      isDisplayingCircle:!true
    });

  circularGraph.draw();
  document.getElementById('pointsNumber').value = circularGraph.cardinality;
  document.getElementById('coeffNumber').value = circularGraph.coeffBase;

  var cardinalityRange = document.getElementById('cardinalityRange');
  cardinalityRange.value = circularGraph.cardinality;
  cardinalityRange.addEventListener('input',function(_i,_j){
    document.getElementById('pointsNumber').value = this.value;
    circularGraph.setCardinality(this.value);
    circularGraph.draw();
  },false);

  var coeffRange = document.getElementById('coeffRange');
  coeffRange.value = circularGraph.coeffBase;
  coeffRange.addEventListener('input',function(_i,_j){
    document.getElementById('coeffNumber').value = this.value;
    circularGraph.setCoeffBase(this.value);
    circularGraph.draw();
  },false);

  var pointsNumber = document.getElementById('pointsNumber');
  pointsNumber.addEventListener('input',function(_i,_j){
    document.getElementById('cardinalityRange').value = this.value;
    circularGraph.setCardinality(this.value);
    circularGraph.draw();
  },false);

  var coeffNumber = document.getElementById('coeffNumber');
  coeffNumber.addEventListener('input',function(_i,_j){
    document.getElementById('coeffRange').value = this.value;
    circularGraph.setCoeffBase(this.value);
    circularGraph.draw();
  },false);

  var displayPoints = document.getElementById('displayPoints');
  displayPoints.addEventListener('change',function(_i,_j){
    circularGraph.displayingMarks(this.checked);
    circularGraph.draw();
  },false);

  var animateTimerHandler = null;
  var animateCheckbox = document.getElementById('animateCheckbox');
  animateCheckbox.addEventListener('change',function(_i,_j){
    if( this.checked ){
      animateTimerHandler = setInterval(function(){
        animate();
      },1000/60);
    }else{
      clearInterval(animateTimerHandler);
    }

  },false);

  function animate () {
    var _value = document.getElementById('coeffNumber').value;
    _value=parseFloat(_value)+0.002;
    circularGraph.setCoeffBase(_value);
    document.getElementById('coeffNumber').value = _value;
    document.getElementById('coeffRange').value = _value;
    circularGraph.draw();
  }

  var spiralMode = document.getElementById('spiralModeCheckbox');
  spiralMode.addEventListener('change',function(_i,_j){
    circularGraph.setSpiralMode(this.checked);
    circularGraph.draw();
  },false);


})();
