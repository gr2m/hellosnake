var grid   = 32,
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
var Mirrors = [
  [ 0, 0], // CENTER
  [ 0,-1], // TOP
  [ 1,-1], // TOP LEFT
  [ 1, 0], // RIGHT
  [ 1, 1], // RIGHT BOTTOM
  [ 0, 1], // BOTTOM
  [-1, 1], // BOTTOM LEFT
  [-1, 0], // LEFT
  [-1,-1]  // TOP LEFT
]
for (var i=0; i < Mirrors.length; i++) {
  var shift = Mirrors[i];
  Mirrors[i] = document.createElement('div');
  Mirrors[i].className = 'view';
  Mirrors[i].style.left = (center_x + shift[0] * (width)  * grid) + 'px';
  Mirrors[i].style.top  = (center_y + shift[1] * (height) * grid) + 'px';
  World.appendChild(Mirrors[i]);
};


var BodyPart = function(x, y) {
  var self = this, _elements = new Array(Mirrors.length);
  
  this.move = function(x, y) {
    
    if (self == body_parts[0]) {
      console.log(theApple.x, x, x % width  , x % width  + width,  x % width  + width)
      console.log(theApple.y, y, y % height , y % height + height, y % height + height)
    }
    
    if ((x % width  == theApple.x || x % width + width == theApple.x   || x % width - width == theApple.x) &&
        (y % height == theApple.y || y % height + height == theApple.y || y % height - height == theApple.y)) {
      theApple.create();
      theSnake.addNewPart();
    }
    
    World.style.top  = height * grid * (-y / height >> 0) + 'px'
    World.style.left = width  * grid * (-x / width  >> 0) + 'px'
    
    for (var i=0; i < _elements.length; i++) {
      _elements[i].style.left = x * grid + 'px';
      _elements[i].style.top  = y * grid + 'px';
    };
  };
      
  // INIT
  for (var i=0; i < _elements.length; i++) {
    _elements[i] = document.createElement('div');
    _elements[i].className = 'body';
    _elements[i].style.width  = grid + 'px';
    _elements[i].style.height = grid + 'px';
    Mirrors[i].appendChild(_elements[i]);
  };
  
  this.move(x, y);
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
  
  Fruits = document.getElementById('fruits');
  Fruits.style.left = center_x + 'px';
  Fruits.style.top  = center_y + 'px';
  
  _element.className    = 'fruit';
  _element.style.width  = grid + 'px';
  _element.style.height = grid + 'px';
  Fruits.appendChild(_element);
  
  this.create();
};

var theApple = new Fruit();

var body_parts = [];

var theSnake = new Snake({
  onNewPart  : function(x, y) {
    body_parts.push(new BodyPart(x, y))
  },
  onPartMove : function(i, x, y) {
    body_parts[i].move(x,y)
  },
  onCollision : function() {
    alert('Game Over!');
    clearInterval(theBeat);
  }
});

start = function() {
  theBeat = setInterval(function()
  {
    theSnake.move();
  }, 100);
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