const canvas = document.getElementById("eclipseCanvas");
const ctx = canvas.getContext("2d");
const moonRotationRange = document.getElementById("moonRotationRange");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

const moonRotationRate = 2;
let moonRotation = 0;

let moonAngle = 1;
let earthAngle = 0;
let animationFrame;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moonRotation += moonRotationRate;

    // Draw Sun (stationary)
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 40, 0, 2 * Math.PI);
    ctx.fill();

    // Draw Earth (rotating)
    ctx.fillStyle = "blue";
    const earthX = canvas.width / 2 + 150 * Math.cos((earthAngle * Math.PI) / 180);
    const earthY = canvas.height / 2 + 150 * Math.sin((earthAngle * Math.PI) / 180);
    ctx.beginPath();
    ctx.arc(earthX, earthY, 30, 0, 2 * Math.PI);
    ctx.fill();

    // Draw Moon (rotating based on user input)
    ctx.fillStyle = "gray";
    const moonX = earthX + 50 * Math.cos((moonRotation * Math.PI) / 180);
    const moonY = earthY + 50 * Math.sin((moonRotation * Math.PI) / 180);
    ctx.beginPath();
    ctx.arc(moonX, moonY, 15, 0, 2 * Math.PI);
    ctx.fill();

    // Check for eclipse
    const distanceBetweenMoonAndSun = Math.sqrt(
        Math.pow(moonX - canvas.width / 2, 2) +
        Math.pow(moonY - canvas.height / 2, 2)
    );
    if (distanceBetweenMoonAndSun < 55) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    
    earthAngle += 0.5;
    animationFrame = requestAnimationFrame(draw);
}

startButton.addEventListener("click", () => {
    startButton.disabled = true;
    stopButton.disabled = false;
    moonRotationRange.disabled = false;
    draw();
});

stopButton.addEventListener("click", () => {
    startButton.disabled = false;
    stopButton.disabled = true;
    moonRotationRange.disabled = false;
    cancelAnimationFrame(animationFrame);
});

moonRotationRange.addEventListener("input", () => {
    moonAngle = parseInt(moonRotationRange.value);
});
