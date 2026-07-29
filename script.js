// ---------- Bengali digit helper ----------
const bnDigits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
function toBn(num){
  return String(num).padStart(2,'0').split('').map(d => bnDigits[+d] ?? d).join('');
}

// ---------- Countdown to next Friday 8:00 PM ----------
function getNextFriday8PM(){
  const now = new Date();
  const target = new Date(now);
  const day = now.getDay(); // 0 = Sunday ... 5 = Friday
  let daysUntilFriday = (5 - day + 7) % 7;
  target.setDate(now.getDate() + daysUntilFriday);
  target.setHours(20, 0, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 7);
  return target;
}

function updateCountdown(){
  const target = getNextFriday8PM();
  const now = new Date();
  let diff = Math.max(0, target - now);

  const days = Math.floor(diff / (1000*60*60*24));
  diff -= days * 1000*60*60*24;
  const hours = Math.floor(diff / (1000*60*60));
  diff -= hours * 1000*60*60;
  const mins = Math.floor(diff / (1000*60));
  diff -= mins * 1000*60;
  const secs = Math.floor(diff / 1000);

  const el = id => document.querySelector(`[data-unit="${id}"]`);
  if (el('days')) el('days').textContent = toBn(days);
  if (el('hours')) el('hours').textContent = toBn(hours);
  if (el('mins')) el('mins').textContent = toBn(mins);
  if (el('secs')) el('secs').textContent = toBn(secs);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
if (navToggle && mainNav){
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------- Library tabs ----------
const tabBtns = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.library-panel');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.querySelector(`.library-panel[data-panel="${btn.dataset.tab}"]`).classList.add('active');
  });
});

// ---------- Scroll reveal ----------
const revealTargets = document.querySelectorAll('.pillar-card, .course-card, .lib-card, .section-title, .quiz-preview, .leaderboard');
revealTargets.forEach(el => el.setAttribute('data-reveal', ''));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => io.observe(el));
