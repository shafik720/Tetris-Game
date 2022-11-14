
let grid = document.querySelector('.tetris-parent'),
containers = Array.from(grid.querySelectorAll('div'))
;

for(let i=0; i<containers.length ; i++){
    containers[i].innerText = i;
}