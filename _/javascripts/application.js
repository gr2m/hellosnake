var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');

var UP     = 1,
    RIGHT  = 2, 
    DOWN   = 3,
    LEFT   = 4 

// start at the bottom middle
var grid = 32,
    interval = 300, // in between a move, in milliseconds
    position = {
      x: canvas.width / 2 >> 0,
      y: canvas.height //canvas.height + grid
    },
    length = 7;
    parts = new Array(length);
    direction = UP,
    directions = {
      1: {x:  0, y: -1}, // UP   
      2: {x:  1, y:  0}, // RIGTH
      3: {x:  0, y:  1}, // DOWN 
      4: {x: -1, y:  0}, // LEFT 
    }
    
// init snake parts
for (var i=0; i < parts.length; i++) {
  parts[i] = {
    x         : position.x - directions[direction].x * i * grid,
    y         : position.y - directions[direction].y * i * grid,
    color     : '#000',
    direction : direction
  };
};
// head
parts[0].color = '#c00';

function draw()
{
  // clear with blur effect
  ctx.fillStyle='rgba(255,255,255,0.5)';
  ctx.fillRect(0,0,canvas.width, canvas.height);
 
  for (var i=0; i < parts.length; i++) {
    ctx.fillStyle = parts[i].color;
    ctx.fillRect(parts[i].x,parts[i].y,grid,grid);
  };
}

function move()
{
  // inherit direction from part before
  for (var i = parts.length - 1; i > 0; i--){
    parts[i].direction = parts[i-1].direction;
  };
  
  // move head in current direction
  parts[0].direction = direction;
  
  // apply move
  for (var i=0; i < parts.length; i++) {
    parts[i].x += directions[parts[i].direction].x * grid;
    parts[i].y += directions[parts[i].direction].y * grid;
  };
}

function turn(to) 
{
  var mapping = [LEFT, UP, RIGHT, DOWN, LEFT, UP];
  direction = mapping[direction + to];
}

setInterval(function()
{
  move();
  draw();
},interval);

draw();


// arrow keys
function handleArrowKeys(event) {
  switch(event.keyCode) {
    case 37: 
      turn(-1);
      break;
    case 39: 
      turn(1);
      break;
  }
}

document.onkeyup = handleArrowKeys;