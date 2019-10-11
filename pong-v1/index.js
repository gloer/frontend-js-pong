const spillet = document.querySelector("#spillet");
const ctx = spillet.getContext("2d");

function degToRad(grader) {
    return (grader / 360) * (Math.PI * 2);
}

const ball = {
    x: 150,
    y: 39,
    r: 10,
    xspeed: 5,
    yspeed: 5,
    xdir: 1,
    ydir: 1
}

const brett = {
    w: 600,
    h: 400
}

const racket = {
    x: 30,
    y: 180,
    w: 8,
    h: 50,
    yspeed: 5,
    ydir: 0
}

function tegnBall() {

    ctx.beginPath();
        ctx.arc(ball.x, ball.y , ball.r , 0, degToRad(360) );        
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();

    ball.x += ball.xspeed * ball.xdir;
    ball.y += ball.yspeed * ball.ydir;

}

function sjekkOmBallenTrefferVeggen() {
    if(ball.x + ball.r >= brett.w) { ball.xdir = -1 }; // høyre vegg
    if(ball.x <= 0) { ball.xdir = 1 }; // Venstre vegg
    if(ball.y >= brett.h) { ball.ydir = -1 }; // Gulv
    if(ball.y < 0) { ball.ydir = 1 }; // Tak
}

function tegnRacket() {
    ctx.beginPath();
        ctx.rect(racket.x, racket.y, racket.w, racket.h);
    ctx.closePath();
    ctx.fillStyle = "yellow";
    ctx.fill();

    racket.y += racket.yspeed * racket.ydir;
}

function startRacket(evt) {
    const tast = evt.keyCode;
    if(tast === 38) {
        racket.ydir = -1;
    }
    if(tast === 40) {
        racket.ydir = 1;
    }
}

function sjekkOmBallTrefferRacket() {
    
    const erOver = ball.y < racket.y;
    const erUnder = ball.y < racket.y;
    const erTilHoyure = ball.y < racket.y;
    const erTilVenstre = ball.y < racket.y;
    
    if(!erOver && !erUnder && !tilHoyre && !tilVenstre) {
        ball.xdir = 1; // Snu ballen
    }
}

function stoppRacket(evt) {
    const tast = evt.keyCode;
    if(tast === 38 && racket.ydir === -1)
        racket.ydir = 0;

    if(tast === 40 && racket.ydir === 1)
        racket.ydir = 0;
}

function loop() {
    ctx.clearRect(0, 0, brett.w, brett.h);
    tegnBall();
    tegnRacket();
    sjekkOmBallenTrefferVeggen();
    // Gjør andre ting

    requestAnimationFrame(loop);
}
loop();

document.addEventListener("keydown", startRacket);
document.addEventListener("keyup", stoppRacket);
