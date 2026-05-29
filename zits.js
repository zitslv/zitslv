// ===========================
// PARTICLES
// ===========================

const canvas = document.createElement("canvas");
canvas.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: -1;
  pointer-events: none;
`;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const particles = [];
for (let i = 0; i < 50; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    speedY: Math.random() * 0.5 + 0.2,
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    p.y -= p.speedY;
    if (p.y < 0) p.y = canvas.height;
  });
  requestAnimationFrame(animate);
}
animate();

// ===========================
// CURSOR EFFECT
// ===========================

let lastCursor = 0;

document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastCursor < 30) return;
  lastCursor = now;

  const dot = document.createElement("div");
  dot.style.cssText = `
    position: fixed;
    left: ${e.clientX}px;
    top: ${e.clientY}px;
    width: 5px; height: 5px;
    border-radius: 50%;
    background: rgba(77,159,255,0.5);
    pointer-events: none;
    transform: translate(-50%,-50%);
    transition: opacity 0.4s;
    z-index: 9999;
  `;
  document.body.appendChild(dot);
  setTimeout(() => (dot.style.opacity = "0"), 50);
  setTimeout(() => dot.remove(), 450);
});

// ===========================
// TYPING EFFECT
// ===========================

const text = "صانع محتوى ألعاب";
const el = document.getElementById("typing");
let i = 0;

function type() {
  if (i < text.length) {
    el.textContent += text[i];
    i++;
    setTimeout(type, 100);
  }
}
type();

// ===========================
// ANIMATED COUNTER
// ===========================

function formatNumber(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(".0", "") + "K";
  return n.toString();
}

function animateCounter(id, start, end, duration) {
  const obj = document.getElementById(id);
  if (!obj) return;
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (end - start) * eased);
    obj.textContent = formatNumber(current);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

animateCounter("yt-count", 0, 1889, 2000);
animateCounter("tt-count", 0, 580, 1500);
animateCounter("ig-count", 0, 80, 1000);

// ===========================
// LINKS LOG
// ===========================

document.querySelectorAll(".links").forEach((link) => {
  link.addEventListener("click", () => {
    console.log(
      "تم الضغط على: " + link.querySelector(".link-content").textContent.trim(),
    );
  });
});

// ===========================
// SHARE
// ===========================

function shareMe() {
  if (navigator.share) {
    navigator.share({
      title: "ZiTs — صانع محتوى ألعاب",
      url: "https://zitslv.netlify.app",
    });
  } else {
    navigator.clipboard.writeText("https://zitslv.netlify.app");
    alert("تم نسخ الرابط!");
  }
}

// ===========================
// LANGUAGE TOGGLE
// ===========================

let isArabic = true; // ← هنا المشكلة كانت — لازم يكون قبل translations

const translations = {
  ar: {
    desc: "صانع محتوى ألعاب",
    share: "🔗 شارك موقعي",
    links: ["رابط الدعم المادي", "يوتيوب", "تويتش", "انستقرام", "تيك توك", "X (تويتر)"],
    platforms: ["يوتيوب", "تيك توك", "انستقرام"], // ← أضف
    aboutText: "مرحبا! أنا ZiTs، صانع محتوى ألعاب من السعودية. أصنع محتوى على يوتيوب وتيك توك. 🎮",
    meee: "من أنا ؟",
  },
  en: {
    desc: "Gaming Content Creator",
    share: "🔗 Share my page",
    links: ["Support Me", "YouTube", "Twitch", "Instagram", "TikTok", "X (Twitter)"],
    platforms: ["YouTube", "TikTok", "Instagram"], // ← أضف
    aboutText: "Hi! I'm ZiTs, a gaming content creator from Saudi Arabia. I create content on YouTube and TikTok. 🎮",
    meee: "Who am I?",
  },
};

function toggleLang() {
  isArabic = !isArabic;
  const lang = isArabic ? "ar" : "en";

  // النص
  document.getElementById("typing").textContent = translations[lang].desc;

  // زر اللغة
  document.querySelector(".lang-btn").textContent = isArabic ? "EN" : "AR";

  // زر المشاركة
  document.querySelector(".share-btn").textContent = translations[lang].share;

  document.getElementById("aboutText").textContent = translations[lang].aboutText;
  
  document.getElementById("meee").textContent = translations[lang].meee;

  // أسماء الروابط
  document.querySelectorAll(".link-content").forEach((el, idx) => {
    const img = el.querySelector("img");
    el.textContent = translations[lang].links[idx];
    el.prepend(img);
  });

  // اتجاه الصفحة
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  // أسماء المنصات في الإحصائيات
  document.querySelectorAll(".platform span").forEach((span, idx) => {
    span.textContent = translations[lang].platforms[idx];
  });
}
function toggleAbout() {
    const panel = document.getElementById('aboutPanel');
    panel.classList.toggle('open');
}
/* =========================
   POPUP
========================= */

const openAbout =
document.getElementById("openAbout");

const closeAbout =
document.getElementById("closeAbout");

const aboutPopup =
document.getElementById("aboutPopup");

/* Open */

openAbout.onclick = () => {
  aboutPopup.classList.add("active");
};

/* Close */

closeAbout.onclick = () => {
  aboutPopup.classList.remove("active");
};

/* Close when click outside */

aboutPopup.onclick = (e) => {

  if(e.target === aboutPopup){
    aboutPopup.classList.remove("active");
  }

};
