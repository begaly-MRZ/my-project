const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // Размер одной клетки
let snake = [{ x: 9 * box, y: 10 * box }]; // Начальное положение змейки
let direction = null; // Направление движения змейки
let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box,
};
let score = 0;

// Управление змейкой
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.code === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (event.code === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.code === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// Рендер змейки
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

// Рендер еды
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);
}

// Логика игры
function update() {
  const head = { ...snake[0] }; // Голова змейки

  // Обновление направления
  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;
  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;

  // Проверка на съедение еды
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box,
    };
  } else {
    snake.pop(); // Удаляем хвост, если еду не съели
  }

  // Добавление новой головы
  snake.unshift(head);

  // Проверка на столкновение со стенами или с собой
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height ||
    snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(game); // Остановка игры
    alert(`Game Over! Your score: ${score}`);
    document.location.reload();
  }
}

// Основной цикл игры
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
  update();
}

// Запуск игры
const game = setInterval(gameLoop, 150);