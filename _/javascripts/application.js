var grid   = 32,
    width  = Math.ceil(window.innerWidth / grid),
    height = Math.ceil(window.innerHeight / grid),
    mod_x  = window.innerWidth % grid,
    mod_y  = window.innerHeight % grid;

if (mod_x == 0) width++;
if (mod_y == 0) height++;

var offset_x = (grid - mod_x) / -2,
    offset_y = (grid - mod_y) / -2;    

// create playfield
document.body.style.backgroundPosition = offset_x + 'px ' + offset_y + 'px';

World = document.getElementById('world');
World.style.left = (width / 2 >> 0) * grid + offset_x + 'px'
World.style.top = (height / 2 >> 0) * grid + offset_y + 'px'

var BodyPart = function(x, y) {
  var _element = document.createElement('div');
      
  this.move = function(x, y) {
    _element.style.left   = x * grid + 'px';
    _element.style.top    = y * grid + 'px';
  };
      
  // INIT
  this.move(x, y);
  _element.className = 'body';
  _element.style.width  = grid + 'px';
  _element.style.height = grid + 'px';
  
  World.appendChild(_element);
};

// var World = function(width, height, offset_x, offset_y) {
//   var _element  = document.createElement('div'),
//       taken_pos = {};
//   
//   // INIT
//   _element.style.left = (width / 2 >> 0) * grid + offset_x + 'px'
//   _element.style.top = (height / 2 >> 0) * grid + offset_y + 'px'
// };



var body_parts = [];

var Snake = new Snake({
  onNewPart  : function(x, y) {
    body_parts.push(new BodyPart(x, y))
  },
  onPartMove : function(i, x, y) {
    if (i == 0) {
      // head
      
    }
    body_parts[i].move(x,y)
  },
  onCollision : function() {
    alert('Game Over!');
    clearInterval(theBeat);
  }
});

var theBeat = setInterval(function()
{
  Snake.move();
}, 300);


// arrow keys
document.onkeydown = function(event) {
  switch(event.keyCode) {
    case 37: 
      Snake.turnLeft();
      break;
    case 38: 
      Snake.addNewPart();
      break;
    case 39: 
      Snake.turnRight();
      break;
    default:
      clearInterval(theBeat);
  }
};

// click / tap

document.body.ontouchstart = function(event) {
  var touch = event.touches[0];
  touch.pageX < window.innerWidth / 2 ? Snake.turnLeft() : Snake.turnRight();
  return false;
};

document.body.onmousedown = function(event) {
  event.clientX < window.innerWidth / 2 ? Snake.turnLeft() : Snake.turnRight();
  return false;
};
