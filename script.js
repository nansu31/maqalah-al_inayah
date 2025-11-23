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

fetch('assets/json/kemasyarakatan.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('konten-materi');
    const title = document.createElement('h2');
    title.textContent = data.judul;
    container.appendChild(title);

    data.materi.forEach(m => {
      const section = document.createElement('section');
      const h3 = document.createElement('h3');
      h3.textContent = m.judul;
      section.appendChild(h3);

      const desc = document.createElement('p');
      desc.textContent = m.deskripsi;
      section.appendChild(desc);

      const ul = document.createElement('ul');
      m.isi.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
      });
      section.appendChild(ul);

      container.appendChild(section);
    });
  });

