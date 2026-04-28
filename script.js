function setActive(el) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
  }

  function pulse(btn) {
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => btn.style.transform = '', 140);
  }

  // Animate storage bar on load
  window.addEventListener('DOMContentLoaded', () => {
    const bar = document.getElementById('storageBar');
    bar.style.width = '0%';
    requestAnimationFrame(() => {
      setTimeout(() => { bar.style.width = '51%'; }, 200);
    });

    // Converter button opens modal
    const convBtn = document.getElementById('converterBtn');
    if (convBtn) convBtn.addEventListener('click', openModal);

    // Row click toggles selection
    document.querySelectorAll('.file-table tbody tr').forEach(row => {
      row.addEventListener('click', function(e) {
        if (e.target.type === 'checkbox') return;
        const cb = this.querySelector('.custom-checkbox');
        cb.checked = !cb.checked;
        toggleSelection(cb, this);
      });
    });

    // Checkbox change
    document.querySelectorAll('.file-table tbody .custom-checkbox').forEach(cb => {
      cb.addEventListener('change', function() {
        toggleSelection(this, this.closest('tr'));
      });
    });

    // Header checkbox — select all
    const headerCb = document.querySelector('.file-table thead .custom-checkbox');
    if (headerCb) {
      headerCb.addEventListener('change', function() {
        document.querySelectorAll('.file-table tbody .custom-checkbox').forEach(cb => {
          cb.checked = this.checked;
          toggleSelection(cb, cb.closest('tr'));
        });
        updateActionBar();
      });
    }

    // Click outside modal closes it
    document.getElementById('converterModal').addEventListener('click', function(e) {
      if (e.target === this) closeModal();
    });
  });

  function toggleSelection(cb, row) {
    row.classList.toggle('selected', cb.checked);
    updateActionBar();
  }

  function updateActionBar() {
    const any = [...document.querySelectorAll('.file-table tbody .custom-checkbox')].some(c => c.checked);
    document.getElementById('actionBar').classList.toggle('visible', any);
    document.getElementById('mainToolbar').classList.toggle('hidden', any);
  }

  function openModal() {
    document.getElementById('converterModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('converterModal').classList.remove('open');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });