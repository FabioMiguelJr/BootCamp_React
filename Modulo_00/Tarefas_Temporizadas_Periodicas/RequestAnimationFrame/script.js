const cv = document.getElementById("cv");
const ctx = cv.getContext("2d");

const pos = [50, 50];
const speed = [40, 60];
const size = 300;
let lastTime;

function draw(time) {
    if (!lastTime) {
        lastTime = time;
    }
    const ellapsedTime = (time - lastTime) / 1000;
    lastTime = time;

    ctx.fillStyle = "rgb(9,80,120)";
    ctx.clearRect(0, 0, 300, 300);

    ctx.beginPath();
    pos[0] = pos[0] >= size ? pos[0] % size : pos[0];
    pos[1] = pos[1] >= size ? pos[1] % size : pos[1];

    pos[0] += ellapsedTime * speed[0];
    pos[1] += ellapsedTime * speed[1];
    ctx.arc(pos[0], pos[1], 20, 0, 2 * Math.PI, true);
    ctx.fill();
    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

// draw();
