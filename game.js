const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const itemImage = new Image();
itemImage.src = "heart.jpeg";

itemImage.onload = () => {
  update(); // 이미지가 로드된 후에 게임 시작
};

itemImage.onload = () => {
  update(); // 이미지가 로드된 후에 게임 시작
};
const scoreDisplay = document.getElementById("score");
const gameOverDisplay = document.getElementById("gameOver");

let score = 0;
let life = 3;
let gameOver = false;

const catcher = {
  width: 80,
  height: 20,
  x: canvas.width / 2 - 40,
  y: canvas.height - 40,
  speed: 10
};

let hearts = [];

function drawCatcher() {
  ctx.fillStyle = "tomato";
  ctx.fillRect(catcher.x, catcher.y, catcher.width, catcher.height);
}

function createHeart() {
  for (let i = 0; i < 2; i++) {
    hearts.push({
      x: Math.random() * (canvas.width - 30),
      y: -30,
      size: 30,
      speed: 3 + Math.random() * 2
    });
  }
}

function drawHeart(heart) {
  ctx.drawImage(itemImage, heart.x, heart.y, heart.size, heart.size);
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score} | Life: ${life}`;
}

function update() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCatcher();

  hearts.forEach((heart, index) => {
    heart.y += heart.speed;
    drawHeart(heart);

    // 캐쳐에 닿았는지 확인
    if (
      heart.y + heart.size > catcher.y &&
      heart.x + heart.size > catcher.x &&
      heart.x < catcher.x + catcher.width
    ) {
      hearts.splice(index, 1);
      score++;
      updateScore();
    } else if (heart.y > canvas.height) {
      // 바닥에 떨어졌을 때
      hearts.splice(index, 1);
      score--;
      life--;
      updateScore();
      if (life <= 0) {
        gameOver = true;
        gameOverDisplay.style.display = "block";
      }
    }
  });

  requestAnimationFrame(update);
}

// 키보드 (PC)
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    catcher.x -= catcher.speed;
    if (catcher.x < 0) catcher.x = 0;
  } else if (e.key === "ArrowRight") {
    catcher.x += catcher.speed;
    if (catcher.x + catcher.width > canvas.width)
      catcher.x = canvas.width - catcher.width;
  }
});

// 터치 (모바일)
canvas.addEventListener("touchmove", (e) => {
  const touchX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
  catcher.x = touchX - catcher.width / 2;
});

// 마우스 (PC)
canvas.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX - canvas.getBoundingClientRect().left;
  catcher.x = mouseX - catcher.width / 2;
});

// 하트 생성
setInterval(() => {
  if (!gameOver) createHeart();
}, 1000);

// 시작
update();
