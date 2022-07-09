// JavaScript Snake example
// Author Jan Bodnar
// http://zetcode.com/javascript/snake/

var canvas;
var ctx;

var head;
var apple;
var ball;

var dots;
var apple_x;
var apple_y;

var music;

var leftDirection = false;
var rightDirection = true;
var upDirection = false;
var downDirection = false;
var inGame = true;

const DOT_SIZE = 20;
const ALL_DOTS = 10000;
const MAX_RAND = 29;
const DELAY = 140;
const C_HEIGHT = 500;
const C_WIDTH = 500;

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var x = new Array(ALL_DOTS);
var y = new Array(ALL_DOTS);

export  function init() {

    canvas = document.getElementById('game');
    ctx = canvas.getContext('2d');
    music = document.getElementById('music');

    loadImages();
    createSnake();
    locateApple();
    setTimeout(gameCycle, DELAY);
}

export function loadImages() {

    head = new Image();
    head.src = '/assets/images/s_head.png';

    ball = new Image();
    ball.src = '/assets/images/s_body.png';

    apple = new Image();
    apple.src = '/assets/images/s_apple.png';
}

export function createSnake() {

    dots = 10;

    for (var z = 0; z < dots; z++) {
        x[z] = 50 - z * 10;
        y[z] = 50;
    }
}

export function checkApple() {

    if ((x[0] == apple_x) && (y[0] == apple_y)) {

        dots++;
        locateApple();
    }
}

export function doDrawing() {

    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);

    if (inGame) {

        ctx.drawImage(apple, apple_x, apple_y);

        for (var z = 0; z < dots; z++) {

            if (z == 0) {
                ctx.drawImage(head, x[z]-70, y[z]);
            } else {
                ctx.drawImage(ball, x[z]-30, y[z]);
            }
        }
    } else {

        gameOver();
    }
}

export function gameOver() {

    ctx.fillStyle = 'black';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = 'normal bold 24px sans-serif';


    ctx.fillText('Game over', C_WIDTH/2, C_HEIGHT/2);
}


export function move() {

    for (var z = dots; z > 0; z--) {

        x[z] = x[(z - 1)];
        y[z] = y[(z - 1)];
    }

    if (leftDirection) {

        x[0] -= DOT_SIZE;
    }

    if (rightDirection) {
        x[0] += DOT_SIZE;
        
    }

    if (upDirection) {

        y[0] -= DOT_SIZE;
    }

    if (downDirection) {

        y[0] += DOT_SIZE;
    }
}

export function checkCollision() {

    for (var z = dots; z > 0; z--) {

        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
            inGame = false;
        }
    }

    if (y[0] >= C_HEIGHT) {

        inGame = false;
    }

    if (y[0] < 0) {

       inGame = false;
    }

    if (x[0] >= C_WIDTH) {

      inGame = false;
    }

    if (x[0] < 0) {

      inGame = false;
    }
}

export function locateApple() {

    var r = Math.floor(Math.random() * MAX_RAND);
    apple_x = r * DOT_SIZE;

    r = Math.floor(Math.random() * MAX_RAND);
    apple_y = r * DOT_SIZE;
}

export function gameCycle() {

    if (inGame) {

        checkApple();
        checkCollision();
        move();
        doDrawing();
        setTimeout(gameCycle, DELAY);
    }
}

var TO_RADIANS = Math.PI/180; 
export function drawRotatedImage(image, x, y, angle)
{ 
    // save the current co-ordinate system 
    // before we screw with it
    ctx.save(); 

    // move to the middle of where we want to draw our image
    ctx.translate(x, y);

    // rotate around that point, converting our 
    // angle from degrees to radians 
    ctx.rotate(angle * TO_RADIANS);

    // draw it up and to the left by half the width
    // and height of the image 
    ctx.drawImage(image, -(image.width/2), -(image.height/2));

    // and restore the co-ords to how they were when we began
    ctx.restore(); 
}

onkeydown = function(e) {

    var key = e.keyCode;

    if ((key == LEFT_KEY) && (!rightDirection)) {

        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == RIGHT_KEY) && (!leftDirection)) {

        rightDirection = true;
        upDirection = false;
        downDirection = false;
        drawRotatedImage(head, x[0], y[0], 180);
    }

    if ((key == UP_KEY) && (!downDirection)) {

        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    if ((key == DOWN_KEY) && (!upDirection)) {

        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }
};


