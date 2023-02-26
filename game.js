// Get the canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set the canvas dimensions
canvas.width = 640;
canvas.height = 480;

// Set up the game variables
let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  vx: 5,
  vy: 5,
  radius: 10
};

let paddle1 = {
  x: 10,
  y: canvas.height / 2 - 50,
  width: 10,
  height: 100,
  score: 0
};

let paddle2 = {
  x: canvas.width - 20,
  y: canvas.height / 2 - 50,
  width: 10,
  height: 100,
  score: 0
};

// Handle keyboard input
const keys = {};
document.addEventListener("keydown", event => {
  keys[event.keyCode] = true;
});
document.addEventListener("keyup", event => {
  delete keys[event.keyCode];
});

// Update the position of the ball
function updateBall() {
  ball.x += ball.vx;
  ball.y += ball.vy;

  // Check for collisions with walls
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.vy = -ball.vy;
  }

  // Check for collisions with paddles
  if (
    ball.x - ball.radius < paddle1.x + paddle1.width &&
    ball.y > paddle1.y &&
    ball.y < paddle1.y + paddle1.height
  ) {
    ball.vx = -ball.vx;
  }

  if (
    ball.x + ball.radius > paddle2.x &&
    ball.y > paddle2.y &&
    ball.y < paddle2.y + paddle2.height
  ) {
    ball.vx = -ball.vx;
  }

  // Check for score
  if (ball.x - ball.radius < 0) {
    paddle2.score++;
    resetBall();
  }

  if (ball.x + ball.radius > canvas.width) {
    paddle1.score++;
    resetBall();
  }
}

// Reset the position of the ball
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.vx = -ball.vx;
  ball.vy = Math.floor(Math.random() * 10) - 5;
}

// Update the position of the paddles
function movePaddles() {
  if (keys[38] && paddle1.y > 0) {
    paddle1.y -= 5;
  }

  if (keys[40] && paddle1.y < canvas.height - paddle1.height) {
    paddle1.y += 5;
  }

  if (keys[87] && paddle2.y > 0) {
    paddle2.y -= 5;
}

if (keys[83] && paddle2.y < canvas.height - paddle2.height) {
paddle2.y += 5;
}
}

// Draw the game objects
function draw() {
// Clear the canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Draw the ball
ctx.beginPath();
ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
ctx.fill();

// Draw the paddles
ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

// Draw the scores
ctx.font = "24px Arial";
ctx.fillStyle = "black";
ctx.fillText("Player 1: " + paddle1.score, 10, 30);
ctx.fillText("Player 2: " + paddle2.score, canvas.width - 120, 30);
}

// Update and draw the game
function gameLoop() {
updateBall();
movePaddles();
draw();

// Request the next frame
requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
