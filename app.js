
let grid = document.querySelector('.tetris-parent'),
containers = Array.from(document.querySelectorAll('.tetris-parent div')),
width = 10,
timer,
nextRandom = 0,
currentRotation = 0,
currentPosition = 4
;

// for(let i=0; i<containers.length ; i++){
//     containers[i].innerText = i;
// }

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


// function that has been used in time interval
function moveDown(){
    undraw();
    currentPosition += width;
    draw();
    freeze();
    gameScore();
}

// function for freezing the tetro pieces when it comes to the bottom edge
function freeze(){
    if(present.some(index=>containers[currentPosition + index + width].classList.contains('taken'))){
        present.forEach(index=>{
            containers[index + currentPosition].classList.add('taken');
        })
        currentPosition = 4;
        random = nextRandom;
        nextRandom  =   Math.floor(Math.random() * tetro.length);
        present =   tetro[random][currentRotation];
        draw();
        miniDisplay();
    }
}

// this function will freeze tetro while moving. It will also fix bug while moving left & right
function freezeWhileMoving(){
    if(present.some(index=>containers[currentPosition + index + width].classList.contains('taken'))){
        present.forEach(index=>{
            containers[index + currentPosition].classList.add('taken');
            draw();
        })
        currentPosition = 4;
        random  =   Math.floor(Math.random() * tetro.length);
        present =   tetro[random][currentRotation];
        draw();
    }
}


// functions for moving tetro left, right & rotation 
document.addEventListener('keydown',control);
function control(e){
    if(e.keyCode == 37){
        moveLeft();
    }else if(e.keyCode == 38){
        rotation();
    }else if(e.keyCode == 39){
        moveRight();
    }else if(e.keyCode == 40){
        moveDown();
    }
}

// function for moving tetro left
function moveLeft(){
    undraw();
    let isLeft = present.some(index=>(index + currentPosition) % width == 0);
    if(!isLeft){
        currentPosition -= 1;
    }
    if(present.some(index=>containers[index + currentPosition].classList.contains('taken'))){
        currentPosition += 1;
    }
    freezeWhileMoving();
    draw();
}

// function for moving tetro right
function moveRight(){
    undraw();
    let isRight = present.some(index=>(currentPosition + index + 1) % width === 0);
    if(!isRight){
        currentPosition += 1;
    }
    if(present.some(index=>containers[currentPosition + index].classList.contains('taken'))){
        currentPosition -= 1;
    }
    freezeWhileMoving();
    draw();
}

//---------------- function for rotating tetro
function rotation(){
    undraw();
    currentRotation++;
    if(currentRotation == present.length){
        currentRotation = 0;
    }
    present =   tetro[random][currentRotation];
    if(present.some(index=>containers[index + currentPosition].classList.contains('taken'))){
        if(currentRotation != 0){
            --currentRotation;
        }else if(currentRotation == 0){
            currentRotation = 0;
        }
        if(random == 2){
            if(currentRotation == 0){
                currentRotation = 3;
            }
        }
    }
    present =   tetro[random][currentRotation];
    rotationBug();
    freezeWhileMoving();
    draw();
}

//---------------- fixing rotation bug
function isLeftEdge(){
    return present.some(index=>(index + currentPosition) % width === 0);
}

function isRightEdge(){
    return present.some(index=>(index + currentPosition + 1) % width === 0);
}


function rotationBug(p){
    p = currentPosition;
    if((p+1) % width < 4){
        if(isRightEdge()){
            currentPosition += 1;
            rotationBug(p);
        }
    }else if(p % width > 5){
        if(isLeftEdge()){
            currentPosition -= 1;
            rotationBug(p);
        }
    }
}

//------------ mini display work
let miniGrid = document.querySelector('.mini-grid'),
displayWidth = 4,
miniSquares = Array.from(miniGrid.querySelectorAll('div'))
;
// for(let i=0; i<miniSquares.length ; i++){
//     miniSquares[i].innerText = i;
// }

const miniTetro = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], // L tetromino
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //Z tetromino
    [1, displayWidth, displayWidth + 1, displayWidth + 2], // T tetromino
    [0, 1, displayWidth, displayWidth + 1], // O tetromino
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] //iTetromino
  ] 

function miniDisplay(){
    miniSquares.forEach(index=>index.classList.remove('blue'));
    miniTetro[nextRandom].forEach(index=>miniSquares[index].classList.add('blue'));
}
miniDisplay();


// game pause start function
let gameButton = document.querySelector('.gamePauseBtn');
function gamePause(){
    if(timer){
        clearInterval(timer);
        timer = null;
        gameButton.innerText = 'Start Game';
    }else{
        // setting interval to for moving down tetro pieces
        timer = setInterval(moveDown,300);
        gameButton.innerText = 'Pause Game';
    }
}


// working on game score
function gameScore(){
    for(let i=0; i<199; i+=width){
        let row = [i, i+1,  i+2,  i+3,  i+4,  i+5,  i+6,  i+7,  i+8,  i+9];
        if(row.every(index=>containers[index].classList.contains('taken'))){
            row.forEach(index=>{
                containers[index].classList.remove('taken');
                containers[index].classList.remove('blue');
            })
            let removedLine = containers.splice(i, width);
            containers = removedLine.concat(containers);
            containers.forEach(index=>grid.appendChild(index));
        }
    }
}