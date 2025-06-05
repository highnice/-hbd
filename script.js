const wishes = [
  "ขอให้มีความสุขแม้เล็กนิดเดียวก็ยังรู้สึก 🌸",
  "ขอให้เรื่องราวทุกอย่างล้วนน่าจดจำ 💖",
  "ไม่เจ็บไม่ป่วย กินเหล้าไม่แฮงค์ ถึงแฮงค์ก็ทันคลาสเช้า!",
  "ขอให้มีพลังใจทำในสิ่งที่ชอบเสมอ ✨",
  "ยินดีที่ได้รู้จัก😊"
];

const petals = [
  'petal1', 'petal2', 'petal3', 'petal4', 'petal5'
];

const h1 = document.querySelector('h1');
const h2 = document.getElementById('birthday-h2');
const flower = document.querySelector('.flower');
const p = document.getElementById('text');
let introDone = false;
let blinkInterval = null;
let firstPetalClicked = false;
let glowInterval = null;
let glows = [];

// ซ่อนทุกอย่างก่อน
h1.style.opacity = 0;
h2.style.opacity = 0;
flower.classList.remove('visible');
p.style.opacity = 0;

// ลำดับการแสดงผล
setTimeout(() => {
  h1.style.opacity = 1;
  h1.style.transition = 'opacity 0.7s';
  setTimeout(() => {
    h2.style.opacity = 1;
    h2.style.transition = 'opacity 0.7s';
    setTimeout(() => {
      flower.classList.add('visible');
      // หลัง introDone = true; (หลังดอกไม้ปรากฏ)
      setTimeout(() => {
        startBlinkLoop();
        introDone = true;
        launchFlowerGlows(); // <<< เพิ่มตรงนี้ เรียกครั้งเดียว
      }, 1000);
    }, 1000);
  }, 1000);
}, 300);

function startBlinkLoop() {
  p.classList.remove('show');
  p.style.opacity = 1;
  blinkInterval = setInterval(() => {
    p.classList.add('blink');
    setTimeout(() => {
      p.classList.remove('blink');
      p.classList.add('show');
      setTimeout(() => {
        p.classList.remove('show');
      }, 2000);
    }, 2000);
  }, 4000);
}

// จัดการคลิกกลีบ
petals.forEach((id, idx) => {
  const petal = document.getElementById(id);
  if (petal) {
    petal.style.cursor = 'pointer';
    petal.addEventListener('click', () => {
      if (!introDone) return;
      if (!firstPetalClicked) {
        clearInterval(blinkInterval);
        p.classList.remove('blink', 'show');
        firstPetalClicked = true;
      }
      p.classList.add('fade');
      petal.classList.add('petal-fade');
      setTimeout(() => {
        p.textContent = wishes[idx];
        p.classList.remove('fade');
        p.style.opacity = 1;
        if (idx === petals.length - 1) {
          setTimeout(() => {
            p.classList.add('fade');
            checkAllPetalsGone();
          }, 200);
        } else {
          checkAllPetalsGone();
        }
      }, 500);
    });
  }
});

function checkAllPetalsGone() {
  const allGone = petals.every(id => {
    const petal = document.getElementById(id);
    return petal && petal.classList.contains('petal-fade');
  });
  if (allGone) {
    h1.classList.add('hide');
    h2.classList.add('hide');
    p.classList.add('hide');
    const gan2 = document.getElementById('gan-2');
    if (gan2) gan2.classList.add('hide');
    const gan = document.getElementById('gan');
    const daisy = document.getElementById('daisy-petals');
    if (gan) {
      gan.classList.add('gan-scale-5x');
      setTimeout(() => {
        gan.classList.remove('gan-scale-5x');
        gan.classList.add('gan-scale-3x');
        if (daisy) {
          daisy.style.opacity = 1;
          setTimeout(() => {
            h2.textContent = 'happy birthday';
            h2.classList.add('curve');
            h2.classList.remove('hide');
            h2.style.opacity = 1;
            launchBalloonsLoop();
            setTimeout(clearFlowerGlows, 2500); // ให้ glow อยู่ต่ออีกนิด
          }, 1000);
        }
      }, 1000);
    }
  }
}

// ลูกโป่งลอยขึ้นเรื่อยๆ
function launchBalloonsLoop() {
  const colors = ['#ffb347', '#ff5eae', '#7ee8fa', '#baffc9', '#f7b2bd', '#f9f871', '#a3a1ff', '#ff6666', '#6ec6ff'];
  const balloonBg = document.getElementById('balloon-bg');
  function createBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    const size = 40 + Math.random() * 32;
    balloon.style.width = `${size}px`;
    balloon.style.height = `${size}px`;
    balloon.style.left = `${Math.random() * 90}vw`;
    balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.animationDelay = `${Math.random() * 0.7}s`;
    balloonBg.appendChild(balloon);
    setTimeout(() => balloon.remove(), 3500);
  }
  setInterval(() => {
    for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
      createBalloon();
    }
  }, 400);
}

// วงกลมเหลืองใส (glow) ลอยขึ้นและขยับขึ้นลง
function launchFlowerGlows() {
  clearFlowerGlows();
  glowInterval = setInterval(() => {
    const glow = document.createElement('div');
    glow.className = 'flower-glow';
    const size = 0.5 + Math.random() * 24;

    // สุ่มตำแหน่งนอกบริเวณดอกไม้ (กลางจอ)
    let left, bottom;
    while (true) {
      left = Math.random() * 100; // vw
      bottom = Math.random() * 80; // vh
      // กันพื้นที่กลางจอ (35vw-65vw, 20vh-60vh)
      if (
        !(left > 35 && left < 65 && bottom > 20 && bottom < 60)
      ) break;
    }
    glow.style.width = `${size}px`;
    glow.style.height = `${size}px`;
    glow.style.left = `${left}vw`;
    glow.style.bottom = `${bottom}vh`;

    const duration = 3.5 + Math.random() * 2.5;
    glow.style.animationDuration = `${duration}s`;
    document.body.appendChild(glow);
    setTimeout(() => {
      glow.classList.add('glow-float');
      glow.style.animation = `glow-float ${2.5 + Math.random()}s ease-in-out infinite alternate`;
    }, duration * 1000);
    glows.push(glow);
  }, 900); // <--- เปลี่ยนเป็น 1200 หรือ 1500 ก็ได้
}

function clearFlowerGlows() {
  clearInterval(glowInterval);
  glows.forEach(g => g.remove());
  glows = [];
}
