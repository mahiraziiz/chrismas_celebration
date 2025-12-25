// Create snowflakes with more realistic fall animation
function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.innerHTML = "❄";
  snowflake.style.left = Math.random() * 100 + "vw";
  const duration = Math.random() * 3 + 2;
  snowflake.style.animationDuration = duration + "s";
  snowflake.style.fontSize = Math.random() * 1 + 0.5 + "em";
  document.body.appendChild(snowflake);

  setTimeout(() => {
    snowflake.remove();
  }, duration * 1000);
}

// Generate snowflakes continuously
setInterval(createSnowflake, 200);

// Enhanced celebration function with more effects
function celebrate() {
  createFireworks();
  createConfetti();
  playSound();
}

// Create fireworks effect
function createFireworks() {
  const colors = [
    "#ff0000",
    "#00ff00",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
    "#ffffff",
  ];
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      const firework = document.createElement("div");
      firework.classList.add("firework");
      firework.style.left = centerX + "px";
      firework.style.top = centerY + "px";
      firework.style.background =
        colors[Math.floor(Math.random() * colors.length)];

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 250 + 100;
      firework.style.setProperty("--x", Math.cos(angle) * distance + "px");
      firework.style.setProperty("--y", Math.sin(angle) * distance + "px");

      document.body.appendChild(firework);

      setTimeout(() => firework.remove(), 1000);
    }, i * 50);
  }
}

// Create confetti effect with emoji
function createConfetti() {
  const emojis = ["🎄", "🎅", "⭐", "🎁", "❄️", "🔔", "🎉", "🌟"];

  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.top = "-50px";
      confetti.style.fontSize = Math.random() * 1.5 + 1.5 + "em";
      const duration = Math.random() * 2 + 3;
      confetti.style.animationDuration = duration + "s";
      confetti.style.opacity = Math.random() * 0.7 + 0.3;
      confetti.style.transform = "rotate(" + Math.random() * 360 + "deg)";
      confetti.style.position = "fixed";
      confetti.style.pointerEvents = "none";
      confetti.style.zIndex = "100";

      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), duration * 1000 + 100);
    }, i * 80);
  }
}

// Play celebration sound (optional - add your own audio file)
function playSound() {
  // Create a simple beep sound using Web Audio API
  try {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (e) {
    console.log("Audio not supported");
  }
}

// Make gifts interactive with enhanced animations
document.querySelectorAll(".gift").forEach((gift) => {
  gift.addEventListener("click", function () {
    // Create mini celebration
    createMiniCelebration(this);

    // Add bounce animation
    this.style.animation = "bounce 0.3s";
    setTimeout(() => {
      this.style.animation = "bounce 1s infinite";
    }, 300);
  });
});

// Mini celebration around clicked gift
function createMiniCelebration(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const emojis = ["✨", "⭐", "💫", "🌟"];

  for (let i = 0; i < 8; i++) {
    const sparkle = document.createElement("div");
    sparkle.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    sparkle.style.position = "fixed";
    sparkle.style.left = centerX + "px";
    sparkle.style.top = centerY + "px";
    sparkle.style.fontSize = "1.5em";
    sparkle.style.pointerEvents = "none";
    sparkle.style.zIndex = "1000";

    const angle = (i / 8) * Math.PI * 2;
    const distance = 80;
    sparkle.style.animation = "sparkleAnim 0.8s ease-out forwards";
    sparkle.style.setProperty("--angle", angle);
    sparkle.style.setProperty("--distance", distance + "px");

    document.body.appendChild(sparkle);

    // Add the animation dynamically
    if (!document.querySelector("style[data-sparkle]")) {
      const style = document.createElement("style");
      style.setAttribute("data-sparkle", "true");
      style.textContent = `
                @keyframes sparkleAnim {
                    0% {
                        opacity: 1;
                        transform: translate(0, 0) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translate(calc(cos(var(--angle)) * var(--distance)), calc(sin(var(--angle)) * var(--distance))) scale(0);
                    }
                }
            `;
      document.head.appendChild(style);
    }

    setTimeout(() => sparkle.remove(), 800);
  }
}

// Add page visibility animation
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    document.body.style.animation = "fadeIn 0.5s ease-in";
  }
});

// Personal greeting animation on load
window.addEventListener("load", function () {
  // Add a subtle celebration on page load
  setTimeout(() => {
    createConfetti();
  }, 1000);
});

// Interactive cursor effect (optional - creates trailing sparkles)
document.addEventListener("mousemove", function (e) {
  // Only create sparkles occasionally for performance
  if (Math.random() > 0.98) {
    const sparkle = document.createElement("div");
    sparkle.innerHTML = "✨";
    sparkle.style.position = "fixed";
    sparkle.style.left = e.clientX + "px";
    sparkle.style.top = e.clientY + "px";
    sparkle.style.fontSize = "0.8em";
    sparkle.style.pointerEvents = "none";
    sparkle.style.opacity = "0.8";
    sparkle.style.animation = "twinkle 0.6s ease-out forwards";
    sparkle.style.zIndex = "999";

    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 600);
  }
});
