// Mobile menu toggle
const btn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
if (btn) {
  btn.addEventListener('click', () => {
    const open = nav.style.display === 'flex';
    nav.style.display = open ? 'none' : 'flex';
    btn.setAttribute('aria-expanded', String(!open));
  });
}

// Footer year + print
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('printBtn')?.addEventListener('click', () => window.print());

// Fetch GitHub repos (public)
(async function loadRepos(){
  const grid = document.getElementById('repo-grid');
  if (!grid) return;
  try {
    const res = await fetch('https://api.github.com/users/mohdazlanabas/repos?per_page=100&sort=updated');
    if (!res.ok) throw new Error('GitHub API error');
    const data = await res.json();

    const ranked = [...data].sort((a,b) => {
      if (b.stargazers_count !== a.stargazers_count) return b.stargazers_count - a.stargazers_count;
      return new Date(b.updated_at) - new Date(a.updated_at);
    }).slice(0, 9);

    const frag = document.createDocumentFragment();
    ranked.forEach(r => {
      const el = document.createElement('div');
      el.className = 'repo-card';
      el.innerHTML = `
        <a href="${r.html_url}" target="_blank" rel="noopener">${r.name}</a>
        <p class="muted">${r.description ? r.description : '—'}</p>
        <div class="repo-meta">
          <span>★ ${r.stargazers_count}</span>
          <span>⬡ ${r.language ?? '—'}</span>
          <span>Updated: ${new Date(r.updated_at).toLocaleDateString()}</span>
        </div>
      `;
      frag.appendChild(el);
    });
    grid.appendChild(frag);
  } catch (err) {
    const fallback = document.createElement('p');
    fallback.className = 'small';
    fallback.textContent = 'Unable to load GitHub repos right now.';
    grid.appendChild(fallback);
  }
})();