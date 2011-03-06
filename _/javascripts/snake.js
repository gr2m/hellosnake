var Snake = function(options) {
  options = options || {};
  
  // CONSTANTS
  var STOP   = 0,
      UP     = 1,
      RIGHT  = 2, 
      DOWN   = 3,
      LEFT   = 4,
      
      DIRECTIONS = {
        0: {x:  0, y:  0}, // STOP
        1: {x:  0, y: -1}, // UP
        2: {x:  1, y:  0}, // RIGHT
        3: {x:  0, y:  1}, // DOWN
        4: {x: -1, y:  0}  // LEFT
      };
  
  // DEFAULTS
  var _defaults = {
    length    : 4,
    direction : UP
  };
  
  // PUBLIC
  this.move = function()
  {
    _turn();

    // move head in current direction
    _parts[0].direction = _direction;

    // apply move
    for (var i=0; i < _parts.length; i++) {
      _flagAsFree(_parts[i].x,_parts[i].y)
      _parts[i].x += DIRECTIONS[_parts[i].direction].x;
      _parts[i].y += DIRECTIONS[_parts[i].direction].y;
      _onPartMove(i, _parts[i].x, _parts[i].y, _parts[i].direction);
      
      if ( i > 0 && _parts[i].direction) _flagAsTaken(_parts[i].x,_parts[i].y)
    };
    
    if ( this.isPosTaken(_head.x, _head.y) ) {
      _onCollision()
    } else {
      _flagAsTaken(_head.x, _head.y)
    }
    

    // inherit direction from part before
    for (var i = _parts.length - 1; i > 0; i--){
      // if the current part is not moving
      if (_parts[i].direction == STOP) {
        // don't inherit direction unless it has been passed by the part before
        if (_parts[i].x + DIRECTIONS[_parts[i-1].direction].x == _parts[i-1].x &&
            _parts[i].y + DIRECTIONS[_parts[i-1].direction].y == _parts[i-1].y)
            _parts[i].direction = _parts[i-1].direction;
      } else {
        _parts[i].direction = _parts[i-1].direction;
      }
    };
  };
  
  this.turnLeft = function() {
    _turn_queue.push(-1);
  };

  this.turnRight = function() {
    _turn_queue.push(1);
  };
  
  this.addNewPart = function() {
    _parts.push({
      x         : _head.x,
      y         : _head.y,
      direction : STOP
    });
    
    _onNewPart(_head.x, _head.y);
  };
  
  this.isPosTaken = function(x, y) {
    return _taken_pos[ [x,y].join(',') ];
  };

  // PRIVATE
  var _direction   = options.direction || _defaults.direction,
      _init_length = options.length    || _defaults.length,
      _head        = {x:0,y:0,direction: _direction},
      _parts       = [_head],
      _turn_queue  = [],
      _taken_pos   = {},
      _do_nothing  = function() {},
      
      _onNewPart   = options.onNewPart   || nada,
      _onPartMove  = options.onPartMove  || nada,
      _onCollision = options.onCollision || nada;
  
  var _turn = function() 
  {
    if (_turn_queue.length) {
      var to = _turn_queue.shift();
      _direction = [LEFT, UP, RIGHT, DOWN, LEFT, UP][_direction + to]; 
    }
  };
  var _flagAsTaken = function(x,y) {
    _taken_pos[ [x,y].join(',') ] = 1;
  }
  var _flagAsFree = function(x,y) {
    delete _taken_pos[ [x,y].join(',') ];
  }
  
  // create body parts
  for (var i=1; i < _init_length; i++) this.addNewPart();
  
  // trigger newPart event for head
  _onNewPart(_head.x, _head.y);
};