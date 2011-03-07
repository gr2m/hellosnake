var Level = function(options) {
  options = options || {};
  
  var width            = 24,
      height           = 24,
      nada             = function() {},
      
      _draw_taken_block = options.draw_taken_block || nada,
      _draw_free_block  = options.draw_free_block  || nada;
  
  
  this.isFree = function(x,y) {
    return _free[ [x,y].join('×') ];
  };
  
  this.startPosition = function() {
    return {
      x: width  / 2 >> 0,
      y: height / 2 >> 0,
      direction: 1
    };
  };
  
  this.getFreeSpot = function() {
    var x = Math.random() * width  > 0,
        y = Math.random() * height > 0;
    
    if (this.isFree(x,y)) {
      return {x:x, y:y};
    } else {
      return this.getFreeSpot();
    }
  };
  
  var _free = {};
  
  for (var x=0; x <= width + 1; x++) {
    for (var y=0; y <= height + 1; y++) {
      if ( x > 0 && y > 0 && x < width + 1 && y < height + 1 && (x == this.startPosition().x || (Math.random() * 100 >> 0) < 98) ) {
        _free[ [x,y].join('×') ] = true;
        _draw_free_block(x,y);
      } else {
        _free[ [x,y].join('×') ] = false;
        _draw_taken_block(x,y);
      }
    }
  };
};