
let grid = document.querySelector('.tetris-parent'),
containers = Array.from(grid.querySelectorAll('div')),
width = 10,
timer,
nextRandom = 0,
currentRotation = 0,
currentPosition = 4
;

for(let i=0; i<containers.length ; i++){
    containers[i].innerText = i;
}

// lTetromino 
const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ]

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ]

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ]

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ]

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ]

let tetro   =   [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
let random  =   Math.floor(Math.random() * tetro.length);
let present =   tetro[random][currentRotation];

// function for drawing tetro in display
function draw(){
    present.forEach(index=>containers[index + currentPosition].classList.add('blue'));
}

// draw when the document is ready
draw();

//function for undrawing tetro pieces so that it will prevent left piece on display
function undraw(){
    present.forEach(index=>containers[index + currentPosition].classList.remove('blue'));
}

// setting interval to for moving down tetro pieces
timer = setInterval(moveDown,300);

// function that has been used in time interval
function moveDown(){
    undraw();
    currentPosition += width;
    draw();
    freeze();
}

// function for freezing the tetro pieces when it comes to the bottom edge
function freeze(){
    if(present.some(index=>containers[currentPosition + index + width].classList.contains('taken'))){
        present.forEach(index=>{
            containers[index + currentPosition].classList.add('taken');
        })
        currentPosition = 4;
        random  =   Math.floor(Math.random() * tetro.length);
        present =   tetro[random][currentRotation];
        draw();
    }
}