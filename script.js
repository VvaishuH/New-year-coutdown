// Countdown Timer
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const messageEl = document.getElementById("newYearMessage");

const nextYear = new Date().getFullYear() + 1;
const newYearDate = new Date(`January 1 ${nextYear} 00:00:00`);

function updateCountdown() {
  const now = new Date();
  const diff = newYearDate - now;

  if (diff <= 0) {
    messageEl.textContent = "🎊 Happy New Year! 🎊";
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";

    if (!window.confettiFired) {
      window.confettiFired = true;
      confetti({
        particleCount: 300,
        spread: 120,
        origin: { y: 0.6 },
      });
    }

    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Fireworks Animation
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];
const colors = ['#ff0000', '#00ff00', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'];

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = canvas.height;
  const color = colors[Math.floor(Math.random() * colors.length)];
  fireworks.push({ x, y, radius: 2, color, velocityY: -(Math.random() * 5 + 5), alpha: 1 });
}

function animateFireworks() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < fireworks.length; i++) {
    const f = fireworks[i];
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
    ctx.fillStyle = f.color;
    ctx.globalAlpha = f.alpha;
    ctx.fill();
    ctx.closePath();

    f.y += f.velocityY;
    f.alpha -= 0.02;

    if (f.alpha <= 0) fireworks.splice(i, 1);
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(animateFireworks);
}

setInterval(createFirework, 300);
animateFireworks();
