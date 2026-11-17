/*
  ROYAL ENGAGEMENT COUNTDOWN
  Edit the target below using Indian Standard Time (IST, UTC+05:30).
  Example: 13 December 2026 at 6:30 PM:
  const engagementTargetIST = "2026-12-13T18:30:00+05:30";
*/
const engagementTargetIST = "2026-12-13T18:00:00+05:30";

const countdown = document.getElementById("countdown");
const celebration = document.getElementById("celebration");
const units = ["days", "hours", "minutes", "seconds"];
const previousValues = {};
let countdownInterval = null;
let celebrationStarted = false;

const targetTimestamp = new Date(engagementTargetIST).getTime();

function updateCountdown() {
  if (!Number.isFinite(targetTimestamp)) {
    countdown.textContent = "Please check the engagement date and time in script.js.";
    return;
  }

  const remaining = targetTimestamp - Date.now();

  if (remaining <= 0) {
    countdown.style.display = "none";
    celebration.style.display = "block";
    if (countdownInterval !== null) clearInterval(countdownInterval);
    startCelebration();
    return;
  }

  const values = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining % 86400000) / 3600000),
    minutes: Math.floor((remaining % 3600000) / 60000),
    seconds: Math.floor((remaining % 60000) / 1000)
  };

  for (const unit of units) {
    const element = document.getElementById(unit);
    const formatted = String(values[unit]).padStart(2, "0");

    if (previousValues[unit] !== formatted) {
      element.textContent = formatted;
      element.classList.remove("tick");
      void element.offsetWidth;
      element.classList.add("tick");
      previousValues[unit] = formatted;
    }
  }
}

function addSparkles() {
  const layer = document.querySelector(".sparkle-layer");
  if (!layer) return;

  for (let i = 0; i < 18; i++) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.textContent = "✦";
    sparkle.style.left = `${Math.random() * 96}%`;
    sparkle.style.top = `${Math.random() * 90}%`;
    sparkle.style.animationDelay = `${Math.random() * 2.5}s`;
    layer.appendChild(sparkle);
  }
}

function startCelebration() {
  if (celebrationStarted) return;
  celebrationStarted = true;

  const area = document.querySelector(".royal-countdown");
  const symbols = ["🌹", "🌸", "✨", "🌺"];

  window.setInterval(() => {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    petal.style.left = `${Math.random() * 96}%`;
    petal.style.animationDuration = `${3 + Math.random() * 4}s`;
    area.appendChild(petal);
    window.setTimeout(() => petal.remove(), 7500);
  }, 300);
}

addSparkles();
updateCountdown();
countdownInterval = window.setInterval(updateCountdown, 1000);
