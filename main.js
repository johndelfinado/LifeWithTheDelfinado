// Videos from youtube.com/@LifeWithTheDelfinadosInNZ.
// To add one: download its thumbnail to assets/videos/<id>.jpg
// (https://i.ytimg.com/vi/<id>/maxresdefault.jpg) and add a line below.
// Categories: life, homemaking, cooking, wanderlust, faith. Newest first.
const VIDEOS = [
  ['Lne_OAnPOxE', '2026-10-25', 'homemaking', 'Clean with me: spring homemaking in the New Zealand countryside'],
  ['_GM0SfM-Stk', '2026-10-04', 'wanderlust', 'Our spring weekend in Hanmer Springs, Asha’s birthday & countryside life'],
  ['urA5gSbApQw', '2026-09-23', 'life', 'How we welcome spring in the countryside: Athena’s birthday & slow living'],
  ['ll4AYO7O484', '2026-08-09', 'life', 'We moved to a home with a vineyard view: unpacking, organising & slow living'],
  ['BLdR3m1jfnQ', '2026-06-18', 'life', 'We’re moving: persimmon picking & celebrating Angel’s 9th birthday'],
  ['p62QSUKsBYA', '2026-04-08', 'wanderlust', 'Coming home to the Philippines: our complete journey from New Zealand'],
  ['J0sVAdJ_3ZU', '2025-12-19', 'homemaking', 'IKEA NZ tour: summer home, IKEA haul & a fishing trip'],
  ['vQwjz8o0pQY', '2025-11-15', 'faith', 'Capturing fleeting moments: a mother’s reason to document life'],
  ['sGTAKsUGxUw', '2025-10-21', 'life', 'Cozy moments that remind us to slow down: Cornwall Park garden walk'],
  ['fgsQpGhlbGs', '2025-10-01', 'cooking', 'Best seafood boil recipe'],
  ['VRAJfaYMdu4', '2025-10-04', 'cooking', 'Cooking kimbap, harvesting herbs & celebrating life'],
  ['mMZVGxK7Jg4', '2025-09-29', 'cooking', 'Easy and delicious side dishes for the week'],
  ['kA88GFNq-fE', '2025-09-27', 'homemaking', 'Spring homemaking inspiration: routines, cooking & a family celebration'],
  ['xOD4-0ynt-s', '2025-08-30', 'faith', 'This cookware transformed how we eat: Proverbs 31 woman series'],
  ['8wnjMadtrV4', '2025-05-31', 'cooking', 'Autumn birthday at home: homemade treats, decorations & family dinner'],
  ['dGhlgaI2DCI', '2025-05-03', 'wanderlust', 'Why this New Zealand trip made us rethink how we spend our time'],
  ['MvfEwuRmehI', '2025-04-19', 'faith', '15 years of marriage taught me this'],
  ['b0cpQwFZSo0', '2025-02-22', 'homemaking', 'How I preserve food at home without spending much'],
  ['jvOFHEPB9nc', '2025-01-25', 'homemaking', 'Growing vegetables in our small backyard: home economy in NZ'],
  ['dciO4QrAHvw', '2024-09-03', 'wanderlust', 'What real slow living looks like in the Philippine countryside'],
  ['lIxJWs-FLzQ', '2024-03-14', 'wanderlust', 'Village life in the Philippines: homemade suman & garden harvesting'],
  ['J8Ad5XRxxRQ', '2023-12-17', 'homemaking', 'Homemaking on a budget: cozy holiday decor & fruit tanghulu'],
  ['Uy4EAV2hAUc', '2023-12-02', 'cooking', 'Picking raspberries, making salsa & cooking dinner'],
  ['XD7K8C3Cvoc', '2023-11-26', 'cooking', 'A real 5am morning: lunchbox prep for the whole family'],
  ['kW8CNGj4Kec', '2023-11-12', 'homemaking', 'My summer cleaning & laundry routine'],
  ['KlE9KtPXXM4', '2023-11-05', 'cooking', 'Morning routine from 5am: making kimbap & a creamy sandwich'],
  ['J4yt6P_5BQA', '2023-10-22', 'life', '5am routine with kids & a surprise birthday celebration'],
  ['LNE1SIVje7w', '2023-10-08', 'life', 'Relax & recharge: two hours of peaceful acoustic music'],
  ['ON3ljeT7nM8', '2023-10-01', 'life', 'Slow life in New Zealand: a spring morning routine at home'],
  ['-rZgPHcSjvY', '2023-09-24', 'faith', 'A housewife’s productive morning & celebrating Asha’s birthday'],
  ['CNU4Nb7B6eE', '2023-09-17', 'homemaking', 'Cleaning motivation & cooking from scratch'],
  ['RtGFHxk1YUo', '2023-09-11', 'life', 'Slow living in New Zealand: pumpkin pancakes & Father’s Day'],
];

const dateFmt = new Intl.DateTimeFormat('en-NZ', { day: 'numeric', month: 'long', year: 'numeric' });

function card([id, date, , title]) {
  const li = document.createElement('article');
  li.className = 'card';
  li.innerHTML = `
    <button class="card__thumb" type="button" data-id="${id}" tabindex="-1" aria-hidden="true">
      <img src="assets/videos/${id}.jpg" alt="" loading="lazy" width="1280" height="720">
    </button>
    <h3><button type="button" data-id="${id}">${title}</button></h3>
    <time datetime="${date}">${dateFmt.format(new Date(date))}</time>`;
  return li;
}

// Build each shelf, with arrow buttons that page through it.
document.querySelectorAll('.rail').forEach((rail) => {
  VIDEOS.filter((v) => v[2] === rail.dataset.category)
    .sort((a, b) => b[1].localeCompare(a[1]))
    .forEach((v) => rail.append(card(v)));

  const arrows = document.createElement('div');
  arrows.className = 'rail__arrows';
  arrows.innerHTML = '<button type="button" aria-label="Previous videos">‹</button><button type="button" aria-label="Next videos">›</button>';
  rail.before(arrows);
  const [prev, next] = arrows.children;
  const page = (dir) => rail.scrollBy({ left: dir * rail.clientWidth * 0.9, behavior: 'smooth' });
  prev.onclick = () => page(-1);
  next.onclick = () => page(1);
  const update = () => {
    prev.disabled = rail.scrollLeft < 4;
    next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
  };
  rail.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
});

// Play videos in a dialog instead of leaving the site.
const player = document.querySelector('.player');
const frame = player.querySelector('.player__frame');
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-id]');
  if (!btn) return;
  const id = btn.dataset.id;
  frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="YouTube video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
  player.querySelector('.player__yt').href = `https://www.youtube.com/watch?v=${id}`;
  player.showModal();
});
player.querySelector('.player__close').onclick = () => player.close();
player.addEventListener('click', (e) => { if (e.target === player) player.close(); });
player.addEventListener('close', () => { frame.innerHTML = ''; });

// Mobile menu reuses the main nav links plus the Subscribe link.
const menuBtn = document.querySelector('.masthead .menu');
const mobileNav = document.getElementById('mobile-nav');
mobileNav.innerHTML = document.querySelector('.nav').innerHTML
  + document.querySelector('.utility .yt').outerHTML
  + '<button class="menu" type="button">Close</button>';
const setMenu = (open) => {
  mobileNav.hidden = !open;
  menuBtn.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
};
menuBtn.onclick = () => setMenu(true);
mobileNav.addEventListener('click', (e) => { if (e.target.closest('a, button')) setMenu(false); });

// Highlight the side dot for the section in view.
const dots = [...document.querySelectorAll('.dots a')];
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    dots.forEach((d) => d.classList.toggle('is-active', d.hash === '#' + en.target.id));
  });
}, { rootMargin: '-45% 0px -45% 0px' });
dots.forEach((d) => { const s = document.querySelector(d.hash); if (s) io.observe(s); });

// Newsletter: not connected to a service yet.
document.querySelector('.signup').addEventListener('submit', (e) => {
  const form = e.currentTarget;
  const msg = form.querySelector('.signup__msg');
  if (!form.email.checkValidity()) {
    e.preventDefault();
    msg.textContent = 'Enter an email address like name@example.com.';
    return;
  }
  if (!form.getAttribute('action')) {
    e.preventDefault();
    msg.textContent = 'Sign-ups open soon. Subscribe on YouTube to hear about new videos in the meantime.';
  }
});

document.getElementById('year').textContent = new Date().getFullYear();
