/*!* @preserve
 *
 * https://github.com/8HoLoN/CircularGraph
 * @version: 0.2.1 ( July 2015 )
 * @author 8HoLoN / https://github.com/8HoLoN/
 * < 8holon [at] gmail.com >
 * Copyright (c) 2015 Alexandre REMY
 */
;(function(_g){
  'use strict';

  function CircularGraph(_args){
    _args=_args||{};

    this.cardinality = null;// number of points around the circle
    this.setCardinality(typeof _args.cardinality==='number'?_args.cardinality:3);

    this.coeffBase = null;// coeff multiply w/ each point
    this.setCoeffBase(typeof _args.coeffBase==='number'?_args.coeffBase:2);

    this.c = (typeof _args.canvas !== 'undefined' && _args.canvas.nodeType === 1 && _args.canvas.nodeName.toLowerCase()==='canvas'?_args.canvas:null);
    if( this.c===null ){throw new Error('Canvas element is required.');}
    this.ctx = this.c.getContext("2d");

    this.radius = 150;
    this.offset = this.radius+(this.c.width/2-this.radius);
    this.phase = Math.PI/2;// phase trigo

    this.alpha = 2*Math.PI/this.cardinality;// angle between each point
    this.sensTrigo = -1;// -1 : trigo, 1 : horaire

    // opts
    this.isDisplayingMarks = (typeof _args.isDisplayingMarks==='boolean'?_args.isDisplayingMarks:false);
    this.isDisplayingCircle = (typeof _args.isDisplayingCircle==='boolean'?_args.isDisplayingCircle:false);
  }

  _g.CircularGraph = CircularGraph;

  CircularGraph.prototype.setCardinality = function(_cardinality) {
    this.cardinality = _cardinality;
    this.alpha = 2*Math.PI/this.cardinality;
  };

  CircularGraph.prototype.setCoeffBase = function(_coeffBase) {
    this.coeffBase = _coeffBase;
  };

  CircularGraph.prototype.displayingMarks = function(_isDisplayingMarks) {
    this.isDisplayingMarks = _isDisplayingMarks;
  };

  CircularGraph.prototype.draw = function(_points) {
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    this.ctx.beginPath();

    // trigo circle
    if( this.isDisplayingCircle ){
      this.ctx.moveTo(this.offset+this.radius, this.offset);
      this.ctx.arc(this.offset,this.offset,this.radius,0,Math.PI*2,true);
    }

    var marksRadius = 0.5;
    var _cosFrom = null;
    var _cosTo = null;
    var _sinFrom = null;
    var _sinTo = null;

    for(var i=0;i<this.cardinality;i++){
      _cosFrom = Math.cos(i*this.alpha+this.phase)*this.radius+this.offset;
      _cosTo = Math.cos((i*this.coeffBase)*this.alpha+this.phase)*this.radius+this.offset;
      _sinFrom = this.sensTrigo*Math.sin(i*this.alpha+this.phase)*this.radius+this.offset;
      _sinTo = this.sensTrigo*Math.sin((i*this.coeffBase)*this.alpha+this.phase)*this.radius+this.offset;

      // circle division (invert the sin because up is positive with trigo circle but not w/ ortho grid (canvas))
      if( this.isDisplayingMarks ){
        this.ctx.moveTo(_cosFrom+marksRadius, _sinFrom);
        this.ctx.arc(_cosFrom, _sinFrom,marksRadius,0,Math.PI*2,true);
      }

      // draw line
      this.ctx.moveTo(_cosFrom, _sinFrom);
      this.ctx.lineTo(_cosTo, _sinTo);
    }

    this.ctx.stroke();
  }

})(this);
