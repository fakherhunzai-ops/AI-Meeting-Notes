import { renderRoute, getHomeTitle } from "./site-pages.js";
import { companyLinks, serviceGroups, serviceBySlug, services } from "./site-data.js";

const homeServiceContent = {
  workflow: {
    label: "01 · WORKFLOW",
    tools: "Inbox · Sheets · CRM",
    input: "INQUIRY INBOX",
    action: "Automation",
    outputs: ["Sheets updated", "CRM record synced", "Report sent"],
    notes: ["NO RE-TYPING", "HANDOVER REMOVED"],
  },
  agents: {
    label: "02 · JUDGEMENT",
    tools: "Inbox · Knowledge · Tools",
    input: "CUSTOMER REQUEST",
    action: "AI Agent",
    outputs: ["Context retrieved", "Action drafted", "Human approval"],
    notes: ["JUDGEMENT BUILT IN", "ESCALATION CLEAR"],
  },
  software: {
    label: "03 · OPERATIONS",
    tools: "Portal · Database · API",
    input: "LEGACY SPREADSHEET",
    action: "Custom System",
    outputs: ["Workflow mapped", "Records migrated", "Portal launched"],
    notes: ["ONE SOURCE OF TRUTH", "MANUAL WORK REMOVED"],
  },
  mvp: {
    label: "04 · NEW PRODUCT",
    tools: "Users · Roadmap · Release",
    input: "PRODUCT IDEA",
    action: "MVP Scope",
    outputs: ["Assumption tested", "Core journey built", "Release measured"],
    notes: ["SMALLEST VALUABLE SCOPE", "BUILT TO LEARN"],
  },
};

const icon = (name, className = "icon") => `<svg class="${className}" aria-hidden="true"><use href="#${name}"></use></svg>`;
const arrow = icon("icon-arrow", "icon tiny");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getDropdownMenu = (id) => document.getElementById(id === "services" ? "mega-menu" : `${id}-menu`);

let homeMain;
let routeMain;
let homeHTML = "";
let mobileNav;
let menuToggle;
let openDropdownId = null;
let lastDraft = "";

function normalizePath(pathname) {
  return pathname.replace(/\/+$/, "") || "/";
}

function isHomePath(pathname) {
  const path = normalizePath(pathname);
  return path === "/" || path === "/index.html";
}

function hidden(element, value) {
  if (!element) return;
  element.hidden = value;
  if (value) element.setAttribute("aria-hidden", "true");
  else element.removeAttribute("aria-hidden");
}

function buildNavigation() {
  const mega = document.getElementById("mega-menu");
  const company = document.getElementById("company-menu");
  mobileNav = document.getElementById("mobile-nav");

  if (mega) {
    mega.innerHTML = `
      <div class="mega-menu-inner">
        <div class="mega-top"><span>WHAT WE DO</span><span><i class="mega-dot"></i> 15 SERVICES <b>4 PRACTICES</b></span></div>
        <div class="mega-columns">
          <div class="mega-column">
            ${serviceGroups.slice(0, 2).map((group) => `
              <div class="mega-group">
                <p>${group.label.toUpperCase()}</p>
                ${group.services.map((slug) => {
                  const service = serviceBySlug[slug];
                  return `<a class="mega-service" href="/services/${service.slug}"><span class="mega-service-icon">${icon(service.icon)}</span><span><strong>${service.title}</strong><small>${service.short}</small></span></a>`;
                }).join("")}
              </div>`).join("")}
          </div>
          <div class="mega-column">
            ${serviceGroups.slice(2).map((group) => `
              <div class="mega-group">
                <p>${group.label.toUpperCase()}</p>
                ${group.services.map((slug) => {
                  const service = serviceBySlug[slug];
                  return `<a class="mega-service" href="/services/${service.slug}"><span class="mega-service-icon">${icon(service.icon)}</span><span><strong>${service.title}</strong><small>${service.short}</small></span></a>`;
                }).join("")}
              </div>`).join("")}
          </div>
        </div>
        <div class="mega-bottom"><span>Not sure which fits? Start with the problem.</span><div><a href="/services">View all services</a><a href="/book-a-call">Book a call ${arrow}</a></div></div>
      </div>`;
  }

  if (company) {
    company.innerHTML = `
      <div class="company-menu-inner">
        <p class="company-menu-title">COMPANY</p>
        ${companyLinks.map((link) => `<a href="${link.href}"><strong>${link.label}</strong><small>${link.description}</small></a>`).join("")}
      </div>`;
  }

  if (mobileNav) {
    mobileNav.innerHTML = `
      <div class="mobile-nav-inner">
        <button class="mobile-group-toggle" type="button" aria-expanded="false" aria-controls="mobile-services-panel">Services ${icon("icon-chevron", "icon tiny")}</button>
        <div class="mobile-group-panel" id="mobile-services-panel" hidden>
          ${serviceGroups.map((group) => `<div class="mobile-service-group"><p>${group.label.toUpperCase()}</p>${group.services.map((slug) => `<a href="/services/${slug}">${serviceBySlug[slug].title}</a>`).join("")}</div>`).join("")}
          <a class="mobile-view-all" href="/services">View all services ${arrow}</a>
        </div>
        <a class="mobile-nav-link" href="/how-we-work">How We Work</a>
        <a class="mobile-nav-link" href="/case-studies">Case Studies</a>
        <a class="mobile-nav-link" href="/insights">Insights</a>
        <button class="mobile-group-toggle" type="button" aria-expanded="false" aria-controls="mobile-company-panel">Company ${icon("icon-chevron", "icon tiny")}</button>
        <div class="mobile-group-panel" id="mobile-company-panel" hidden>${companyLinks.map((link) => `<a href="${link.href}">${link.label}</a>`).join("")}</div>
        <a class="mobile-nav-link" href="/contact#uk-contact">UK Contact</a>
        <a class="button button--gradient mobile-book" href="/book-a-call">Book a Call ${arrow}</a>
      </div>`;
  }
}

function setDropdownState(id, open, returnFocus = false) {
  const trigger = document.getElementById(`${id}-trigger`);
  const menu = getDropdownMenu(id);
  if (!trigger || !menu) return;
  trigger.setAttribute("aria-expanded", String(open));
  trigger.classList.toggle("is-active", open);
  hidden(menu, !open);
  if (open) openDropdownId = id;
  else if (openDropdownId === id) openDropdownId = null;
  if (!open && returnFocus) trigger.focus();
}

function closeDropdowns(returnFocusId = null) {
  ["services", "company"].forEach((id) => setDropdownState(id, id === returnFocusId ? false : false, id === returnFocusId));
  openDropdownId = null;
}

function toggleDropdown(id) {
  const wasOpen = openDropdownId === id;
  closeDropdowns();
  if (!wasOpen) setDropdownState(id, true);
}

function setupDropdown(id) {
  const trigger = document.getElementById(`${id}-trigger`);
  const menu = getDropdownMenu(id);
  const header = document.querySelector(".site-header");
  if (!trigger || !menu || !header) return;

  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    const wasOpen = openDropdownId === id;
    toggleDropdown(id);
    if (!wasOpen && event.detail === 0) {
      window.setTimeout(() => menu.querySelector("a")?.focus(), 0);
    }
  });

  trigger.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (openDropdownId !== id) {
        closeDropdowns();
        setDropdownState(id, true);
      }
      window.setTimeout(() => menu.querySelector("a")?.focus(), 0);
    }
  });

  trigger.addEventListener("mouseenter", () => {
    if (window.innerWidth > 1199) {
      closeDropdowns();
      setDropdownState(id, true);
    }
  });

  menu.addEventListener("mouseenter", () => setDropdownState(id, true));

  [header, menu].forEach((element) => {
    element.addEventListener("mouseleave", () => {
      window.setTimeout(() => {
        if (!header.matches(":hover") && !menu.matches(":hover")) closeDropdowns();
      }, 120);
    });
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeDropdowns();
  });
}

function openMobileNav(open) {
  if (!mobileNav || !menuToggle) return;
  hidden(mobileNav, !open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  menuToggle.classList.toggle("is-active", open);
}

function setupMobileNav() {
  menuToggle = document.querySelector(".menu-toggle");
  if (!menuToggle || !mobileNav) return;

  menuToggle.addEventListener("click", () => openMobileNav(mobileNav.hidden));

  mobileNav.addEventListener("click", (event) => {
    const groupToggle = event.target.closest(".mobile-group-toggle");
    if (groupToggle) {
      const panel = document.getElementById(groupToggle.getAttribute("aria-controls"));
      const open = groupToggle.getAttribute("aria-expanded") === "true";
      groupToggle.setAttribute("aria-expanded", String(!open));
      groupToggle.classList.toggle("is-open", !open);
      if (panel) hidden(panel, open);
      return;
    }
    if (event.target.closest("a")) openMobileNav(false);
  });
}

function setupGlobalDismissal() {
  document.addEventListener("pointerdown", (event) => {
    if (!event.target.closest(".site-header, #mega-menu, #company-menu")) closeDropdowns();
    if (!event.target.closest(".site-header, #mobile-nav")) openMobileNav(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (openDropdownId) {
        const id = openDropdownId;
        closeDropdowns();
        document.getElementById(`${id}-trigger`)?.focus();
      }
      openMobileNav(false);
    }
  });

  document.addEventListener("focusin", (event) => {
    if (!event.target.closest(".site-header, #mega-menu, #company-menu")) closeDropdowns();
  });
}

function scrollToHash(hash, behavior = "smooth") {
  if (!hash || hash === "#") return;
  let id;
  try {
    id = decodeURIComponent(hash.slice(1));
  } catch {
    id = hash.slice(1);
  }
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: reducedMotion ? "auto" : behavior, block: "start" });
}

function updateActiveNav() {
  const path = normalizePath(location.pathname);
  document.querySelectorAll(".primary-nav a, .mobile-nav a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const linkPath = normalizePath(new URL(href, location.origin).pathname);
    const active = linkPath === path || (linkPath !== "/" && path.startsWith(`${linkPath}/`));
    link.classList.toggle("is-current", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  const servicesTrigger = document.getElementById("services-trigger");
  const companyTrigger = document.getElementById("company-trigger");
  servicesTrigger?.classList.toggle("is-current", path === "/services" || path.startsWith("/services/"));
  companyTrigger?.classList.toggle("is-current", ["/about", "/capabilities", "/contact"].includes(path));
}

function applyFiltersFromUrl() {
  const params = new URLSearchParams(location.search);
  const category = params.get("category") || "All";
  const audience = params.get("audience");
  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    const type = group.dataset.filterGroup;
    const container = document.querySelector(`[data-filter-container="${type}"]`);
    if (!container) return;
    group.querySelectorAll(".route-filter").forEach((button) => {
      const active = button.dataset.filter === category;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    container.querySelectorAll("[data-category]").forEach((card) => {
      const categoryMatch = category === "All" || card.dataset.category === category;
      const audienceMatch = !audience || !card.dataset.audiences || card.dataset.audiences.split(",").includes(audience);
      hidden(card, !(categoryMatch && audienceMatch));
    });
  });
}

function render({ scroll = true } = {}) {
  const isHome = isHomePath(location.pathname);
  closeDropdowns();
  openMobileNav(false);

  if (isHome) {
    if (!homeMain.innerHTML.trim() && homeHTML) homeMain.innerHTML = homeHTML;
    hidden(homeMain, false);
    hidden(routeMain, true);
    routeMain.innerHTML = "";
    document.title = getHomeTitle();
    document.body.classList.remove("route-active");
    syncProblemState();
  } else {
    homeMain.innerHTML = "";
    hidden(homeMain, true);
    hidden(routeMain, false);
    const result = renderRoute(location.pathname, location.search);
    routeMain.innerHTML = result.html;
    document.title = result.title;
    document.body.classList.add("route-active");
    routeMain.classList.remove("is-entering");
    void routeMain.offsetWidth;
    routeMain.classList.add("is-entering");
    applyFiltersFromUrl();
  }

  updateActiveNav();

  if (scroll) {
    window.requestAnimationFrame(() => {
      if (location.hash) scrollToHash(location.hash, "auto");
      else window.scrollTo({ top: 0, behavior: "auto" });
    });
  }
}

function navigate(url, replace = false) {
  const next = new URL(url, location.origin);
  const samePath = normalizePath(next.pathname) === normalizePath(location.pathname);
  const sameSearch = next.search === location.search;
  const sameHash = next.hash === location.hash;

  if (samePath && sameSearch && sameHash) return;
  history[replace ? "replaceState" : "pushState"]({}, "", `${next.pathname}${next.search}${next.hash}`);
  render();
}

function setupLinkInterception() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || link.target === "_blank" || link.hasAttribute("download") || link.dataset.external !== undefined) return;
    const rawHref = link.getAttribute("href");
    if (!rawHref || rawHref.startsWith("mailto:") || rawHref.startsWith("tel:")) return;

    if (rawHref.startsWith("#")) {
      event.preventDefault();
      history.replaceState({}, "", `${location.pathname}${location.search}${rawHref}`);
      scrollToHash(rawHref);
      return;
    }

    let url;
    try {
      url = new URL(link.href, location.origin);
    } catch {
      return;
    }
    if (url.origin !== location.origin) return;

    const samePath = normalizePath(url.pathname) === normalizePath(location.pathname);
    if (samePath && url.hash) {
      event.preventDefault();
      history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
      scrollToHash(url.hash);
      return;
    }
    if (samePath && url.search !== location.search) {
      event.preventDefault();
      history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
      render({ scroll: false });
      return;
    }
    if (url.pathname.startsWith("/")) {
      event.preventDefault();
      navigate(`${url.pathname}${url.search}${url.hash}`);
    }
  });
}

function setupHomeServicePanel() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".service-row");
    if (!button) return;
    activateHomeService(button);
  });

  document.addEventListener("keydown", (event) => {
    const button = event.target.closest(".service-row");
    if (!button || !["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    const buttons = [...document.querySelectorAll(".service-row")];
    const index = buttons.indexOf(button);
    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (index + 1) % buttons.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = (index - 1 + buttons.length) % buttons.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = buttons.length - 1;
    buttons[nextIndex].focus();
    activateHomeService(buttons[nextIndex]);
  });
}

function activateHomeService(button) {
  const buttons = [...document.querySelectorAll(".service-row")];
  buttons.forEach((item) => {
    const active = item === button;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-selected", String(active));
  });

  const key = button.dataset.service;
  const data = homeServiceContent[key];
  const panel = document.getElementById("service-panel");
  if (!data || !panel) return;

  const apply = () => {
    const set = (id, value) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    };
    set("service-panel-label", data.label);
    set("service-panel-tools", data.tools);
    set("service-panel-input", data.input);
    set("service-panel-action", data.action);
    set("service-output-1", data.outputs[0]);
    set("service-output-2", data.outputs[1]);
    set("service-output-3", data.outputs[2]);
    set("service-panel-note-1", data.notes[0]);
    set("service-panel-note-2", data.notes[1]);
    panel.classList.remove("is-changing");
  };

  if (reducedMotion) apply();
  else {
    panel.classList.add("is-changing");
    window.setTimeout(apply, 150);
  }
}

function setupFaq() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".faq-item > button");
    if (!button) return;
    const scope = button.closest(".faq-list, .route-faq-list") || document;
    const shouldOpen = button.getAttribute("aria-expanded") !== "true";
    scope.querySelectorAll(".faq-item > button").forEach((other) => {
      const panel = document.getElementById(other.getAttribute("aria-controls"));
      other.setAttribute("aria-expanded", "false");
      if (panel) panel.hidden = true;
    });
    if (shouldOpen) {
      const panel = document.getElementById(button.getAttribute("aria-controls"));
      button.setAttribute("aria-expanded", "true");
      if (panel) panel.hidden = false;
    }
  });
}

function syncProblemState(activeRow = document.querySelector(".problem-item.is-active")) {
  document.querySelectorAll(".problem-item").forEach((item) => {
    const active = item === activeRow;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  const selected = (activeRow?.dataset.legacy || "").split(",").filter(Boolean).map(Number);
  document.querySelectorAll(".legacy-box").forEach((box, index) => box.classList.toggle("is-highlighted", selected.includes(index)));
}

function setupProblemRows() {
  document.addEventListener("click", (event) => {
    const row = event.target.closest(".problem-item");
    if (!row) return;
    syncProblemState(row);
  });
}

function setupFilters() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".route-filter");
    if (!button) return;
    const group = button.closest("[data-filter-group]");
    const type = group?.dataset.filterGroup;
    if (!type) return;
    const category = button.dataset.filter || "All";
    const params = new URLSearchParams(location.search);
    if (category === "All") params.delete("category");
    else params.set("category", category);
    const query = params.toString();
    history.replaceState({}, "", `${location.pathname}${query ? `?${query}` : ""}${location.hash}`);
    applyFiltersFromUrl();
  });
}

function setFormStatus(form, type, html) {
  const status = form.querySelector("[data-form-status]");
  if (!status) return;
  hidden(status, false);
  status.className = `route-form-status route-form-status--${type}`;
  status.innerHTML = html;
}

function formDataToText(form, kind) {
  const data = new FormData(form);
  return [
    `Horizon Consults — ${kind === "booking" ? "Discovery call request" : "Project enquiry"}`,
    "",
    ...[...data.entries()].filter(([key]) => key !== "consent").map(([key, value]) => `${key.replace(/_/g, " ").toUpperCase()}: ${value}`),
    "",
    "Prepared locally in the browser. Connect a submission endpoint to deliver this automatically.",
  ].join("\n");
}

function setupForms() {
  document.addEventListener("submit", async (event) => {
    const form = event.target.closest("form[data-form]");
    if (!form) return;
    event.preventDefault();

    if (!form.checkValidity()) {
      setFormStatus(form, "error", "<strong>Some details need attention.</strong><span>Please complete the highlighted fields and try again.</span>");
      form.reportValidity();
      form.querySelector(":invalid")?.focus();
      return;
    }

    const submit = form.querySelector("[data-submit]");
    const originalLabel = submit?.innerHTML;
    form.classList.add("is-loading");
    if (submit) {
      submit.disabled = true;
      submit.innerHTML = `Preparing… ${arrow}`;
    }
    setFormStatus(form, "loading", "<strong>Preparing your request…</strong><span>Validating the details and creating a local draft.</span>");

    await new Promise((resolve) => window.setTimeout(resolve, reducedMotion ? 50 : 650));

    const kind = form.dataset.form;
    lastDraft = formDataToText(form, kind);
    try {
      localStorage.setItem(`horizon-${kind}-draft`, lastDraft);
    } catch {
      // Storage may be unavailable; the download action remains available.
    }

    form.classList.remove("is-loading");
    if (submit) {
      submit.disabled = false;
      submit.innerHTML = originalLabel || `Send ${arrow}`;
    }
    form.reset();
    setFormStatus(
      form,
      "success",
      `<strong>${kind === "booking" ? "Call request" : "Enquiry"} draft prepared.</strong><span>The booking/submission endpoint is not connected yet. Your draft is saved locally; copy or download it below.</span><div class="route-form-status-actions"><button type="button" data-copy-draft>Copy request</button><button type="button" data-download-draft>Download request</button></div>`,
    );
  });

  document.addEventListener("click", async (event) => {
    if (event.target.closest("[data-copy-draft]")) {
      try {
        await navigator.clipboard.writeText(lastDraft);
        event.target.closest("[data-copy-draft]").textContent = "Copied";
      } catch {
        event.target.closest("[data-copy-draft]").textContent = "Copy unavailable";
      }
      return;
    }
    if (event.target.closest("[data-download-draft]")) {
      const blob = new Blob([lastDraft], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "horizon-consults-request.txt";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    }
  });
}

function init() {
  homeMain = document.querySelector("main");
  routeMain = document.getElementById("route-main");
  if (!homeMain || !routeMain) return;
  homeHTML = homeMain.innerHTML;

  buildNavigation();
  setupDropdown("services");
  setupDropdown("company");
  setupMobileNav();
  setupGlobalDismissal();
  setupLinkInterception();
  setupHomeServicePanel();
  setupFaq();
  setupProblemRows();
  setupFilters();
  setupForms();

  window.addEventListener("popstate", () => render());
  render({ scroll: false });
  if (location.hash) window.requestAnimationFrame(() => scrollToHash(location.hash, "auto"));
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
else init();
