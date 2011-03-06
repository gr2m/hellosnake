var grid   = 32,
    speed  = 150,
    width  = Math.ceil(window.innerWidth / grid),
    height = Math.ceil(window.innerHeight / grid),
    mod_x  = window.innerWidth % grid,
    mod_y  = window.innerHeight % grid;

if (mod_x != 0) width--;
if (mod_y != 0) height--;

var offset_x = (grid - mod_x) / -2,
    offset_y = (grid - mod_y) / -2,
    center_x = (width / 2 >> 0) * grid + offset_x,
    center_y = (height / 2 >> 0) * grid + offset_y;    


// create playfield
document.body.style.backgroundPosition = offset_x + 'px ' + offset_y + 'px';

World = document.getElementById('world');
World.style.left = center_x + 'px';
World.style.top  = center_y + 'px';


var body_parts = [];
var BodyPart = function(x, y) {
  var self = this, _element, _dir;
  
  this.move = function(x, y, dir) {
    _element.style.left = x * grid + 'px';
    _element.style.top  = y * grid + 'px';
    _element.className = 'body dir_' + dir;
    
    if (self == body_parts[0]) _head_move(x,y, dir);
  };
  
  var _head_move = function(x,y, dir) {
    if ( typeof _dir == 'undefined' ) {
      _dir = dir;
    } else if (_dir != dir ) {
      
      switch((_dir - dir) % 4) {
        case -1: 
        case 3:
          _dir++; 
          break;
        case 1:
        case -3:
          _dir--; 
          break;
      }
      _element.style.webkitTransform = 'rotate('+(_dir - 1)*90+'deg)';
    }
    
    if (x == theApple.x && y == theApple.y) {
      theApple.create();
      theSnake.addNewPart();
    }
    
    World.style.left = center_x - x * grid + 'px';
    World.style.top  = center_y - y * grid + 'px';
    
    document.body.style.backgroundPosition = (offset_x - x * grid) + 'px ' + (offset_y - y * grid) + 'px';
  };
      
  // INIT
  _element = document.createElement('div');
  _element.className = 'body';
  _element.style.width  = grid + 'px';
  _element.style.height = grid + 'px';
  _element.style.zIndex = 100000000 - body_parts.length;
  SnakeContainer.appendChild(_element);
  
  this.move(x, y, 0);
};

var Fruit = function() {
  var self     = this,
      _element = document.createElement('div');
  this.create = function() {
    self.x = (Math.random() * (width - 2)  >> 0) + 1 - (width  / 2 >> 0),
    self.y = (Math.random() * (height - 2) >> 0) + 1 - (height / 2 >> 0);
        
    _element.style.left = self.x * grid + 'px';
    _element.style.top  = self.y * grid + 'px';
  };
  
  
  _element.className    = 'fruit';
  _element.style.width  = grid + 'px';
  _element.style.height = grid + 'px';
  World.appendChild(_element);
  
  this.create();
};

SnakeContainer = document.getElementById('snake');
var theSnake = new Snake({
  onNewPart  : function(x, y) {
    body_parts.push(new BodyPart(x, y))
  },
  onPartMove : function(i, x, y, direction) {
    body_parts[i].move(x,y, direction)
  },
  onCollision : function() {
    alert('Game Over!');
    clearInterval(theBeat);
  }
});
var theApple = new Fruit();

start = function() {
  theBeat = setInterval(function()
  {
    theSnake.move();
  }, speed);
};
stop = function() {
  clearInterval(theBeat);
  theBeat = false;
};
start();




// KEYBOARD NAVIGATION
document.onkeydown = function(event) {
  switch (event.keyCode){
    case 37: theSnake.turnLeft(); break;
    case 39: theSnake.turnRight(); break;
    default: theBeat ? stop() : start();
  }[];
};

// CLICK / TAB NAVIGATI
document.body.onmousedown = function(event) {
  event.clientX < window.innerWidth / 2 ? theSnake.turnLeft() : theSnake.turnRight();
  return false;
};
document.body.ontouchstart = function(event) {
  var touch = event.touches[0];
  touch.pageX < window.innerWidth / 2 ? theSnake.turnLeft() : theSnake.turnRight();
  return false;
};