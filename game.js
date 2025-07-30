const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
let hearts = [];
let isGameOver = false;

const catcher = {
  x: canvas.width / 2 - 30,
  y: canvas.height - 30,
  width: 60,
  height: 20,
  speed: 5
};

function createHeart() {
  const x = Math.random() * (canvas.width - 20);
  hearts.push({ x: x, y: -20, size: 20 });
}

function drawHeart(heart) {
  ctx.beginPath();
  ctx.fillStyle = "hotpink";
  ctx.arc(heart.x, heart.y, heart.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

function drawCatcher() {
  ctx.fillStyle = "black";
  ctx.fillRect(catcher.x, catcher.y, catcher.width, catcher.height);
}

function update() {
  if (isGameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 하트 생성
  if (Math.random() < 0.02) {
    createHeart();
  }

  // 하트 업데이트
  for (let i = 0; i < hearts.length; i++) {
    hearts[i].y += 4;
    drawHeart(hearts[i]);

    // 하트를 잡았는지 확인
    if (
      hearts[i].y + hearts[i].size >= catcher.y &&
      hearts[i].x >= catcher.x &&
      hearts[i].x <= catcher.x + catcher.width
    ) {
      score++;
      document.getElementById("score").innerText = `점수: ${score}`;
      hearts.splice(i, 1);
      i--;
    } else if (hearts[i].y > canvas.height) {
      // 놓친 하트
      score--;
      document.getElementById("score").innerText = `점수: ${score}`;
      hearts.splice(i, 1);
      i--;

      if (score < 0) {
        isGameOver = true;
        document.getElementById("gameOver").style.display = "block";
      }
    }
  }

  drawCatcher();
  requestAnimationFrame(update);
}

function handleMove(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.touches ? e.touches[0].clientX : e.clientX;
  catcher.x = x - rect.left - catcher.width / 2;

  if (catcher.x < 0) catcher.x = 0;
  if (catcher.x + catcher.width > canvas.width) catcher.x = canvas.width - catcher.width;
}

// 마우스/터치 입력 처리
canvas.addEventListener("mousemove", handleMove);
canvas.addEventListener("touchmove", handleMove);

update();
