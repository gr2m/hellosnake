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
  document.body.appendChild(Mirrors[i]);
};

World = document.getElementById('world');


var BodyPart = function(x, y) {
  var _elements = new Array(Mirrors.length);
  
  this.move = function(x, y) {
    console.log([x,y].join(','), height, (height / 2) - 1)
    
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

var body_parts = [];

var Snake = new Snake({
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
    Snake.move();
  }, 300);
};
stop = function() {
  clearInterval(theBeat);
  theBeat = false;
};
start();


// KEYBOARD NAVIGATION
document.onkeydown = function(event) {
  switch (event.keyCode){
    case 37: Snake.turnLeft(); break;
    case 39: Snake.turnRight(); break;
    default: theBeat ? stop() : start();
  }[];
};

// CLICK / TAB NAVIGATI
document.body.onmousedown = function(event) {
  event.clientX < window.innerWidth / 2 ? Snake.turnLeft() : Snake.turnRight();
  return false;
};
document.body.ontouchstart = function(event) {
  var touch = event.touches[0];
  touch.pageX < window.innerWidth / 2 ? Snake.turnLeft() : Snake.turnRight();
  return false;
};