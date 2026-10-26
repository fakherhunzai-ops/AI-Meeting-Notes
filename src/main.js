const serviceContent = {
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

const serviceButtons = [...document.querySelectorAll(".service-row")];
const servicePanel = document.querySelector("#service-panel");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function renderService(key) {
  const data = serviceContent[key];
  if (!data || !servicePanel) return;

  const applyContent = () => {
    document.querySelector("#service-panel-label").textContent = data.label;
    document.querySelector("#service-panel-tools").textContent = data.tools;
    document.querySelector("#service-panel-input").textContent = data.input;
    document.querySelector("#service-panel-action").textContent = data.action;
    document.querySelector("#service-output-1").textContent = data.outputs[0];
    document.querySelector("#service-output-2").textContent = data.outputs[1];
    document.querySelector("#service-output-3").textContent = data.outputs[2];
    document.querySelector("#service-panel-note-1").textContent = data.notes[0];
    document.querySelector("#service-panel-note-2").textContent = data.notes[1];
    servicePanel.classList.remove("is-changing");
  };

  if (reducedMotion) {
    applyContent();
    return;
  }

  servicePanel.classList.add("is-changing");
  window.setTimeout(applyContent, 150);
}

function activateService(button) {
  serviceButtons.forEach((item) => {
    const active = item === button;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-selected", String(active));
  });
  renderService(button.dataset.service);
}

serviceButtons.forEach((button, index) => {
  button.addEventListener("click", () => activateService(button));
  button.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (index + 1) % serviceButtons.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = (index - 1 + serviceButtons.length) % serviceButtons.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = serviceButtons.length - 1;
    serviceButtons[nextIndex].focus();
    activateService(serviceButtons[nextIndex]);
  });
});

// FAQ accordion
const faqButtons = [...document.querySelectorAll(".faq-item button")];

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    const shouldOpen = button.getAttribute("aria-expanded") !== "true";

    faqButtons.forEach((otherButton) => {
      const otherPanel = document.getElementById(otherButton.getAttribute("aria-controls"));
      otherButton.setAttribute("aria-expanded", "false");
      if (otherPanel) otherPanel.hidden = true;
    });

    if (shouldOpen) {
      button.setAttribute("aria-expanded", "true");
      if (panel) panel.hidden = false;
    }
  });
});

// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

function closeMenu() {
  if (!menuToggle || !primaryNav) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  primaryNav.classList.remove("is-open");
}

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
    menuToggle.setAttribute("aria-label", open ? "Open navigation menu" : "Close navigation menu");
    primaryNav.classList.toggle("is-open", !open);
  });

  primaryNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1199) closeMenu();
  });
}

// Keep the active navigation item in sync with the visible section.
const observedSections = ["services", "process", "case-studies", "capabilities", "delivery-model"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);
const navLinks = [...document.querySelectorAll(".primary-nav a")];

if ("IntersectionObserver" in window && observedSections.length && navLinks.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${visible.target.id}`;
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.15, 0.4] },
  );
  observedSections.forEach((section) => observer.observe(section));
}
