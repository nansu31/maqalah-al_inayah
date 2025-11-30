const items = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.materi-section');

function showSection(id) {
  sections.forEach(sec => {
    sec.style.display = sec.id === id ? 'block' : 'none';
  });
}

items.forEach(item => {
  item.addEventListener('click', () => {
    items.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    showSection(item.dataset.target);
  });
});

// Tampilkan default (misalnya fiqih)
window.addEventListener('load', () => {
  showSection('fiqih');
  document.querySelector('[data-target="fiqih"]').classList.add('active');
});
