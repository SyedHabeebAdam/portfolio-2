// ---------- Navbar scroll state ----------
const navbar = document.getElementById('navbar');
const toTop = document.getElementById('toTop');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  toTop.classList.toggle('show', window.scrollY > 500);
});

// ---------- Mobile drawer ----------
const hamburger = document.getElementById('hamburger');
const drawer = document.getElementById('mobileDrawer');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  drawer.classList.toggle('open');
});
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
  });
});

// ---------- Active section highlight ----------
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[data-sec="${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

sections.forEach(sec => sectionObserver.observe(sec));

// ---------- Typing effect ----------
const roles = [
  "Aspiring Full Stack Developer",
  "PHP Developer",
  "Python Programmer"
];
const typedEl = document.getElementById('typedText');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 70);
}
typeLoop();

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ---------- Skill bars fill on view ----------
const skillBars = document.querySelectorAll('.skill-bar');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const level = bar.getAttribute('data-level');
      const fill = bar.querySelector('.fill');
      requestAnimationFrame(() => { fill.style.width = level + '%'; });
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.4 });
skillBars.forEach(bar => skillObserver.observe(bar));

// ---------- Animated counters ----------
const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      let start = 0;
      const duration = 1400;
      const startTime = performance.now();
      function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        el.textContent = value + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(step);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => statObserver.observe(el));

// ---------- Contact form (front-end only) ----------
// const sendBtn = document.getElementById('sendBtn');
// const contactForm = document.getElementById('contactForm');
// const sentState = document.getElementById('sentState');

// sendBtn.addEventListener('click', () => {
//   const name = document.getElementById('cName').value.trim();
//   const email = document.getElementById('cEmail').value.trim();
//   const message = document.getElementById('cMessage').value.trim();
//   if (!name || !email || !message) {
//     sendBtn.textContent = 'Please fill in required fields';
//     setTimeout(() => {
//       sendBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
//     }, 1800);
//     return;
//   }
//   contactForm.style.display = 'none';
//   sentState.classList.add('show');
// });

// ---------- Resume button placeholder ----------
// document.getElementById('resumeBtn').addEventListener('click', (e) => {
//   e.preventDefault();
//   alert('Add your resume PDF link here to enable downloads.');
// });

// ---------- Back to top ----------
toTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------- Smooth nav close on link click (desktop no-op, safe) ----------
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});
