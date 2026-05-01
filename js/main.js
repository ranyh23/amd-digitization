// ── DATA ──────────────────────────────────────────────────────────────────────
// Placeholder dataset structure. Replace URLs with actual Zenodo direct links.
// Format: { year: [ { name, description, files: [ { label, filename, url, type } ] } ] }

const AMD_DATA = {
  1906: [
    {
      name: "Full Directory",
      description: "Complete digitized AMD volume, 1906 edition",
      files: [
        { label: "Full dataset",    filename: "amd_1906_full.csv",           url: "#", type: "CSV" },
        { label: "Documentation",   filename: "amd_1906_documentation.pdf",  url: "#", type: "PDF" }
      ]
    }
  ],
  1912: [
    {
      name: "Full Directory",
      description: "Complete digitized AMD volume, 1912 edition",
      files: [
        { label: "Full dataset",    filename: "amd_1912_full.csv",           url: "#", type: "CSV" },
        { label: "Documentation",   filename: "amd_1912_documentation.pdf",  url: "#", type: "PDF" }
      ]
    }
  ],
  1914: [
    {
      name: "Full Directory",
      description: "Complete digitized AMD volume, 1914 edition",
      files: [
        { label: "Full dataset",    filename: "amd_1914_full.csv",           url: "#", type: "CSV" },
        { label: "Documentation",   filename: "amd_1914_documentation.pdf",  url: "#", type: "PDF" }
      ]
    }
  ],
  1918: [
    {
      name: "Full Directory",
      description: "Complete digitized AMD volume, 1918 edition",
      files: [
        { label: "Full dataset",    filename: "amd_1918_full.csv",           url: "#", type: "CSV" },
        { label: "Documentation",   filename: "amd_1918_documentation.pdf",  url: "#", type: "PDF" }
      ]
    }
  ],
  1921: [
    {
      name: "Full Directory",
      description: "Complete digitized AMD volume, 1921 edition",
      files: [
        { label: "Full dataset",    filename: "amd_1921_full.csv",           url: "#", type: "CSV" },
        { label: "Documentation",   filename: "amd_1921_documentation.pdf",  url: "#", type: "PDF" }
      ]
    }
  ],
  1925: [
    {
      name: "Full Directory",
      description: "Complete digitized AMD volume, 1925 edition",
      files: [
        { label: "Full dataset",    filename: "amd_1925_full.csv",           url: "#", type: "CSV" },
        { label: "Documentation",   filename: "amd_1925_documentation.pdf",  url: "#", type: "PDF" }
      ]
    }
  ],
  1942: [
    {
      name: "Full Directory",
      description: "Complete digitized AMD volume, 1942 edition",
      files: [
        { label: "Full dataset",    filename: "amd_1942_full.csv",           url: "#", type: "CSV" },
        { label: "Documentation",   filename: "amd_1942_documentation.pdf",  url: "#", type: "PDF" }
      ]
    }
  ]
};

const CITATION_PLAIN = `[Author names]. "The AMD Digitization Project." [Year]. [DOI placeholder].`;
const CITATION_BIBTEX = `@data{amd_digitization,
  author    = {[Author names]},
  title     = {{The AMD Digitization Project}},
  year      = {[Year]},
  doi       = {[DOI placeholder]},
  url       = {[URL placeholder]}
}`;

// ── NAVIGATION ────────────────────────────────────────────────────────────────

function navigate(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  const page = document.getElementById('page-' + pageId);
  if (page) page.classList.add('active');

  const link = document.querySelector(`.nav-links a[data-page="${pageId}"]`);
  if (link) link.classList.add('active');

  window.scrollTo(0, 0);
}

document.querySelectorAll('[data-page]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    navigate(el.dataset.page);
  });
});

// ── DATA PAGE ─────────────────────────────────────────────────────────────────

const yearSelect = document.getElementById('year-select');
const fileList   = document.getElementById('file-list');

function renderFileList(year) {
  const groups = AMD_DATA[year];
  if (!groups) { fileList.classList.remove('visible'); return; }

  const downloadIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 1v6M2 7l3 2 3-2"/><path d="M1 9h8"/></svg>`;

  const groupsHTML = groups.map(group => {
    const filesHTML = group.files.map(f => `
      <div class="file-download-row">
        <span class="file-type-badge">${f.type}</span>
        <span class="file-name">${f.filename}</span>
        <a href="${f.url}" class="download-btn" ${f.url !== '#' ? 'download' : ''}>
          ${downloadIcon} ${f.label}
        </a>
      </div>
    `).join('');

    return `
      <div class="file-group">
        <div class="file-group-header">
          <span class="file-group-name">${group.name}</span>
          <span class="file-group-desc">${group.description}</span>
        </div>
        <div class="file-group-files">${filesHTML}</div>
      </div>
    `;
  }).join('');

  fileList.innerHTML = `
    <div class="file-list-header">
      <span class="file-list-year">AMD ${year}</span>
      <span class="file-list-subtitle">American Medical Directory · ${year} edition</span>
    </div>
    ${groupsHTML}
    <div class="citation-box">
      <div class="citation-label">Cite this dataset</div>
      <div class="citation-text" id="citation-display">${CITATION_PLAIN}</div>
      <div class="citation-actions">
        <button class="cite-btn" onclick="copyCitation('plain')">Copy citation</button>
        <button class="cite-btn" onclick="copyCitation('bibtex')">BibTeX</button>
      </div>
    </div>
  `;

  fileList.classList.add('visible');
}

yearSelect.addEventListener('change', () => {
  const year = parseInt(yearSelect.value);
  if (year) renderFileList(year);
  else fileList.classList.remove('visible');
});

// ── CITATION ──────────────────────────────────────────────────────────────────

function copyCitation(format) {
  const text = format === 'bibtex' ? CITATION_BIBTEX : CITATION_PLAIN;
  navigator.clipboard.writeText(text).then(() => {
    const btns = document.querySelectorAll('.cite-btn');
    btns.forEach(b => { b.classList.add('copied'); b.textContent = 'Copied!'; });
    setTimeout(() => {
      btns.forEach(b => { b.classList.remove('copied'); });
      document.querySelector('.cite-btn:first-child').textContent = 'Copy citation';
      document.querySelector('.cite-btn:last-child').textContent = 'BibTeX';
    }, 2000);
  });
}

// ── INIT ──────────────────────────────────────────────────────────────────────
navigate('home');
