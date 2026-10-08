(function () {
  'use strict';

  /* ---------- Sticky header border ---------- */
  var header = document.querySelector('[data-header]');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector('[data-nav-toggle]');
  var nav = document.querySelector('[data-nav]');
  if (toggle && nav) {
    var closeNav = function () {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    };
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeNav();
        toggle.focus();
      }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) closeNav();
    });
  }

  /* ---------- Legacy-system tabs (WAI-ARIA tabs pattern) ---------- */
  document.querySelectorAll('[data-tabs]').forEach(function (root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));

    function select(tab, focus) {
      tabs.forEach(function (t) {
        var active = t === tab;
        t.setAttribute('aria-selected', String(active));
        t.tabIndex = active ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !active;
      });
      if (focus) tab.focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(tab, false); });
      tab.addEventListener('keydown', function (e) {
        var next = null;
        switch (e.key) {
          case 'ArrowDown':
          case 'ArrowRight': next = tabs[(i + 1) % tabs.length]; break;
          case 'ArrowUp':
          case 'ArrowLeft': next = tabs[(i - 1 + tabs.length) % tabs.length]; break;
          case 'Home': next = tabs[0]; break;
          case 'End': next = tabs[tabs.length - 1]; break;
        }
        if (next) {
          e.preventDefault();
          select(next, true);
        }
      });
    });
  });

  /* ---------- Contact form ---------- */
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    var status = form.querySelector('[data-form-status]');
    var setStatus = function (msg, type) {
      status.textContent = msg;
      status.className = 'form-status' + (type ? ' is-' + type : '');
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstInvalid = null;
      Array.prototype.forEach.call(form.querySelectorAll('[required]'), function (field) {
        var valid = field.checkValidity() && field.value.trim() !== '';
        field.setAttribute('aria-invalid', String(!valid));
        if (!valid && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) {
        setStatus('Please complete the highlighted fields with valid details.', 'error');
        firstInvalid.focus();
        return;
      }

      var endpoint = form.getAttribute('data-endpoint');
      if (!endpoint) {
        // No form handler configured yet — confirm locally without sending data.
        setStatus('Thanks — your request is ready. (Form handler not yet connected.)', 'ok');
        form.reset();
        return;
      }

      setStatus('Sending…');
      fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (res) {
          if (!res.ok) throw new Error('Request failed');
          setStatus('Thanks — we’ll be in touch to arrange your discovery call.', 'ok');
          form.reset();
        })
        .catch(function () {
          setStatus('Sorry, something went wrong. Please try again.', 'error');
        });
    });

    form.addEventListener('input', function (e) {
      if (e.target.getAttribute('aria-invalid') === 'true' && e.target.checkValidity()) {
        e.target.setAttribute('aria-invalid', 'false');
      }
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
