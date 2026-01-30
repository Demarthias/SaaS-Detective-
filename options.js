// SaaS Detective Options

const DEFAULT_OPTIONS = {
  enabledCategories: {
    'CMS': true,
    'E-Commerce': true,
    'Site Builder': true,
    'No-Code': true,
    'Analytics': true,
    'Data Platform': true,
    'Heatmaps': true,
    'Chat': true,
    'CRM / Chat': true,
    'Email Marketing': true,
    'Ads': true,
    'Framework': true,
    'Library': true,
    'Payments': true,
  },
};

function setStatus(msg) {
  const el = document.getElementById('status');
  el.textContent = msg;
  setTimeout(() => { el.textContent = ''; }, 1200);
}

async function loadOptions() {
  const { sd_options } = await chrome.storage.sync.get({ sd_options: DEFAULT_OPTIONS });
  return sd_options;
}

async function saveOptions(options) {
  await chrome.storage.sync.set({ sd_options: options });
}

function renderCategories(container, options) {
  container.innerHTML = '';
  const cats = Object.keys(DEFAULT_OPTIONS.enabledCategories);
  cats.forEach(cat => {
    const label = document.createElement('label');
    label.className = 'switch';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = Boolean(options.enabledCategories?.[cat]);
    input.addEventListener('change', async () => {
      options.enabledCategories[cat] = input.checked;
      await saveOptions(options);
      setStatus('Saved');
    });
    const span = document.createElement('span');
    span.textContent = cat;
    label.appendChild(input);
    label.appendChild(span);
    container.appendChild(label);
  });
}

async function init() {
  const container = document.getElementById('category-list');
  const resetBtn = document.getElementById('reset');
  const openPopupBtn = document.getElementById('openPopup');

  let options = await loadOptions();

  renderCategories(container, options);

  resetBtn.addEventListener('click', async () => {
    options = JSON.parse(JSON.stringify(DEFAULT_OPTIONS));
    await saveOptions(options);
    renderCategories(container, options);
    setStatus('Defaults restored');
  });

  openPopupBtn.addEventListener('click', () => {
    chrome.runtime.openOptionsPage ? window.open('popup.html', '_blank') : window.open('popup.html', '_blank');
  });
}

document.addEventListener('DOMContentLoaded', init);
