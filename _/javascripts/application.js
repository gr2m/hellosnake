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
World = document.getElementById('world');

var levelContainer = document.getElementById('level');

theLevel = new Level({
  draw_free_block : function(x,y) {
    var _element = document.createElement('div');
    _element.className = 'block';
    _element.style.width  = grid + 'px';
    _element.style.height = grid + 'px';
    _element.style.left   = x * grid + 'px';
    _element.style.top    = y * grid + 'px';
    _element.style.backgroundColor = 'RGBa(255,255,255,.1'+(Math.random() * 3 >> 0)+')';
    
    levelContainer.appendChild(_element)
  },
  draw_taken_block : function(x,y) {
    var _element = document.createElement('div');
    _element.className = 'taken block';
    _element.style.width  = grid + 'px';
    _element.style.height = grid + 'px';
    _element.style.left   = x * grid + 'px';
    _element.style.top    = y * grid + 'px';
    _element.style.backgroundColor = 'RGBa(255,255,255,.8'+(Math.random() * 3 >> 0)+')';
    
    levelContainer.appendChild(_element)
  }
});
World.style.left = center_x - theLevel.startPosition().x * grid + 'px';
World.style.top  = center_y - theLevel.startPosition().y * grid + 'px';



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
    
    if (! theLevel.isFree(x,y)) {
      theSnake.die();
    }
    
    
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
    self.x = (Math.random() * 12 >> 0) + 1;
    self.y = (Math.random() * 12 >> 0) + 1;
    
    if (theLevel.isFree(self.x, self.y) && ! theSnake.isPosTaken(self.x, self.y)) {
      _element.style.left = self.x * grid + 'px';
      _element.style.top  = self.y * grid + 'px';
    } else {
      this.create();
    }
  };
  
  
  _element.className    = 'fruit';
  _element.style.width  = grid + 'px';
  _element.style.height = grid + 'px';
  World.appendChild(_element);
  
  this.create();
};

SnakeContainer = document.getElementById('snake');
var theSnake = new Snake(theLevel.startPosition(), {
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


var style_element;
function set_speed(interval) {
  var css = '#world, .body{-webkit-transition: all '+interval/1000+'s linear;}';
  
  if(style_element) {
		style_element.replaceChild(document.createTextNode(css), style_element.firstChild);
	} else {
		style_element = document.createElement("style");
		style_element.type = "text/css";
		style_element.appendChild(document.createTextNode(css));
		console.log(css)
		
		document.getElementsByTagName("head")[0].appendChild(style_element);
	}
} // set_speed(interval)

setTimeout(function() {
  set_speed(speed);
}, 10);


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