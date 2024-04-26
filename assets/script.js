//Initial Data
let currentColor = 'black'; //get current color
let canDraw = false; //boolean to draw
let mouseX = 0;
let mouseY = 0;

let screen = document.querySelector('#tela'); //get canvas
let ctx = screen.getContext('2d');
//get the permission to draw on canvas

//Events
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);
});
//If you click on a color, it will trigger colorClickEvent

/*
Drawing on canvas step-by-step:

- When mouse click DOWN, turn on drawing mode;
- When mouse cursor move: if drawing mode is on, draw.
- When mouse click UP, turn off drawing mode.

*/
screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click', clearScreen);




//Functions
function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color');
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active'); 
    //Select who has the active class and remove it.

    e.target.classList.add('active');
    //Add the active class to the clicked color.
}

function mouseDownEvent(e) { //get previous mouse position
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
    //.pageX picks X mouse position
    //.pageX picks Y mouse position
    //offsetLeft and offsetTop pick the distance between the canvas and the rest os the page.


}

function mouseMoveEvent(e) {
    if(canDraw) {
        draw(e.pageX, e.pageY);
    }

}

function mouseUpEvent() {
    canDraw = false;

}

function draw(x, y) {
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;
    //gets the position to draw

    ctx.beginPath(); //start line
    ctx.lineWidth = 5; //line width
    ctx.lineJoin = 'round'; //line form
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath(); //close line
    ctx.strokeStyle = currentColor; //line color
    ctx.stroke(); //fill line

    //draw

    mouseX = pointX;
    mouseY = pointY;
}

function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}