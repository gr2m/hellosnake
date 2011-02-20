
var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');

// start at the bottom middle
var grid = 32,
    interval = 300, // in between a move, in milliseconds
    pos = {
      x: canvas.width / 2 >> 0,
      y: canvas.height //canvas.height + grid
    },
    length = 7;

function draw()
{
  // background
  ctx.fillStyle='rgba(255,255,255,0.5)';
  ctx.fillRect(0,0,canvas.width, canvas.height);
  
  // head
  ctx.fillStyle = '#c00';
  ctx.fillRect(pos.x,pos.y,grid,grid);

  // body
  ctx.fillStyle = '#000';
  for (var i=1; i <= length; i++) {
    ctx.fillRect(pos.x,pos.y + i * grid,grid,grid);
  };
}

function move()
{
  pos.y -= grid;
}

setInterval(function()
{
  move();
  draw();
},interval);

draw();