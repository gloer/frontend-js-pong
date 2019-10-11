const spillet = document.querySelector("#spillet");
const ctx = spillet.getContext("2d");

function degToRad(grader) {
    return (grader / 360) * (Math.PI * 2);
}

const ball = {
    x: 150,
    y: 39,
    r: 10,
    xspeed: 20,
    yspeed: 15,
    xdir: 1,
    ydir: 1
}

const brett = {
    w: 600,
    h: 400
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
    if(ball.x >= brett.w) { ball.xdir = -1 }; // høyre vegg
    if(ball.x <= 0) { ball.xdir = 1 }; // Venstre vegg
    if(ball.y >= brett.h) { ball.ydir = -1 }; // Gulv
    if(ball.y < 0) { ball.ydir = 1 }; // Tak
}

function loop() {
    tegnBall();
    sjekkOmBallenTrefferVeggen();
    // Gjør andre ting

    requestAnimationFrame(loop);
}
loop();
