import {
  audiences,
  capabilityGroups,
  caseStudies,
  caseStudyBySlug,
  companyLinks,
  formOptions,
  insightBySlug,
  insightCategories,
  insights,
  processSteps,
  serviceBySlug,
  serviceGroups,
  services,
  siteFaqs,
} from "./site-data.js";

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);

const icon = (name, className = "icon") => `<svg class="${className}" aria-hidden="true"><use href="#${name}"></use></svg>`;
const arrow = icon("icon-arrow", "icon tiny");

const breadcrumbs = (items) => `
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    ${items.map((item, index) => `<span class="breadcrumb-sep">/</span>${item.href ? `<a href="${item.href}">${escapeHtml(item.label)}</a>` : `<span aria-current="page">${escapeHtml(item.label)}</span>`}`).join("")}
  </nav>`;

const pageHero = ({ eyebrow, title, lead, actions = "", visual = "", breadcrumb = "", className = "" }) => `
  <section class="route-hero ${className}">
    <div class="route-container">
      ${breadcrumb}
      <div class="route-hero-grid">
        <div class="route-hero-copy">
          <p class="eyebrow">${escapeHtml(eyebrow)}</p>
          <h1>${title}</h1>
          <p class="route-lead">${escapeHtml(lead)}</p>
          ${actions ? `<div class="route-actions">${actions}</div>` : ""}
        </div>
        ${visual ? `<div class="route-hero-visual" aria-hidden="true">${visual}</div>` : ""}
      </div>
    </div>
  </section>`;

const sectionHeading = ({ eyebrow, title, lead = "", align = "left" }) => `
  <div class="route-section-heading route-section-heading--${align}">
    ${eyebrow ? `<p class="eyebrow">${escapeHtml(eyebrow)}</p>` : ""}
    <h2>${title}</h2>
    ${lead ? `<p>${escapeHtml(lead)}</p>` : ""}
  </div>`;

const routeSection = (id, heading, content, className = "") => `
  <section class="route-section ${className}"${id ? ` id="${id}"` : ""}>
    <div class="route-container">${heading || ""}${content}</div>
  </section>`;

const button = (href, label, variant = "gradient", extra = "") =>
  `<a class="button button--${variant}" href="${href}" ${extra}>${escapeHtml(label)} ${arrow}</a>`;

const textLink = (href, label) => `<a class="route-text-link" href="${href}">${escapeHtml(label)} ${arrow}</a>`;

const ctaBand = (title = "Have a problem worth solving?", lead = "Tell us what is slowing the business down. We’ll help you decide whether it is worth solving and what a useful first step looks like.") => `
  <section class="route-cta">
    <svg class="route-cta-lines" viewBox="0 0 1440 360" preserveAspectRatio="none" aria-hidden="true">
      <path d="M-80 300 C260 80 560 110 820 220 S1220 330 1520 60" />
      <path d="M-80 330 C260 110 560 140 820 250 S1220 360 1520 90" />
      <path d="M-80 360 C260 140 560 170 820 280 S1220 390 1520 120" />
    </svg>
    <div class="route-container route-cta-inner">
      <p class="eyebrow eyebrow--muted">— START THE CONVERSATION</p>
      <h2>${title}</h2>
      <p>${escapeHtml(lead)}</p>
      <div class="route-actions route-actions--center">
        ${button("/book-a-call", "Book a discovery call")}
        ${button("/contact", "Tell us about your project", "white")}
      </div>
    </div>
  </section>`;

const faqList = (items, idPrefix = "page") => `
  <div class="route-faq-list">
    ${items.map((item, index) => `
      <div class="faq-item">
        <button type="button" aria-expanded="false" aria-controls="${idPrefix}-faq-${index}">
          <span>${escapeHtml(item.q)}</span>${icon("icon-plus", "icon")}
        </button>
        <div class="faq-answer" id="${idPrefix}-faq-${index}" hidden><p>${escapeHtml(item.a)}</p></div>
      </div>`).join("")}
  </div>`;

const serviceCard = (service, compact = false) => `
  <a class="route-service-card ${compact ? "route-service-card--compact" : ""}" href="/services/${service.slug}">
    <span class="route-service-icon">${icon(service.icon)}</span>
    <span class="route-service-body"><strong>${escapeHtml(service.title)}</strong><small>${escapeHtml(service.short)}</small></span>
    <span class="route-card-arrow">${arrow}</span>
  </a>`;

const caseVisual = (kind) => {
  if (kind === "agent") {
    return `<div class="route-case-visual route-case-visual--agent"><span class="visual-label">AGENT CONSOLE</span><div class="visual-node">TRIAGE</div><div class="visual-phone"><span>AGENT · 5 checks</span><i></i><i></i><b>Human sign-off</b></div><div class="visual-node">LEDGER SYNC</div></div>`;
  }
  if (kind === "flow") {
    return `<div class="route-case-visual route-case-visual--flow"><span class="visual-label">DELIVERY FLOW</span><div class="visual-flow-chain"><span>Capture</span><i></i><span>AI check</span><i></i><span>Approve</span><i></i><span>Deliver</span></div><small>Five handoffs → one accountable flow</small></div>`;
  }
  return `<div class="route-case-visual route-case-visual--dashboard"><span class="visual-label">OPERATIONS PLATFORM</span><div class="visual-chart"><i style="height:34%"></i><i style="height:52%"></i><i style="height:42%"></i><i style="height:78%"></i><i style="height:66%"></i><i style="height:88%"></i></div><div class="visual-lines"><i></i><i></i><i></i></div></div>`;
};

const caseCard = (item) => `
  <a class="route-case-card" href="/case-studies/${item.slug}">
    <div class="route-case-card-visual">${caseVisual(item.visual)}</div>
    <div class="route-case-card-body">
      <span class="case-label">${escapeHtml(item.label)}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.summary)}</p>
      <div class="route-case-meta"><span>${escapeHtml(item.category)}</span><span>${escapeHtml(item.outcome)}</span></div>
      <span class="route-card-arrow">${arrow}</span>
    </div>
  </a>`;

const insightCard = (item, featured = false) => `
  <a class="route-insight-card ${featured ? "route-insight-card--featured" : ""}" href="/insights/${item.slug}">
    <div class="route-insight-visual" aria-hidden="true"><span>${escapeHtml(item.category)}</span><i></i><i></i><i></i></div>
    <div class="route-insight-body">
      <span class="route-insight-meta">${escapeHtml(item.category)} · ${escapeHtml(item.readTime)}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.summary)}</p>
      <span class="route-card-arrow">${arrow}</span>
    </div>
  </a>`;

const capabilityMap = () => `
  <div class="route-capability-map">
    <div class="route-map-root"><span class="map-logo">H</span><strong>HORIZON</strong><small>One delivery team</small></div>
    <svg class="route-map-lines" viewBox="0 0 1168 320" aria-hidden="true">
      <path d="M584 42v54M150 96h868M150 96v36M367 96v36M584 96v36M801 96v36M1018 96v36" />
    </svg>
    ${capabilityGroups.map((group, index) => `
      <div class="route-map-column route-map-column--${index}">
        <span class="map-category">${escapeHtml(group.name)}</span>
        ${group.items.map((item) => `<a href="${item.route}">${escapeHtml(item.label)}</a>`).join("")}
      </div>`).join("")}
  </div>`;

const servicesOverview = () => {
  const heroVisual = `
    <div class="services-overview-visual">
      <span class="visual-label">15 SERVICES · 4 PRACTICES</span>
      <div class="services-overview-grid">
        ${serviceGroups.map((group) => `<span><i></i>${escapeHtml(group.label)}</span>`).join("")}
      </div>
      <div class="services-overview-center">${icon("icon-target", "icon")}<strong>One accountable team</strong><small>Start with the problem, not the tool.</small></div>
    </div>`;

  const groupContent = serviceGroups.map((group) => `
    <div class="route-service-group" id="${group.id}">
      <div class="route-service-group-heading"><span>${icon(serviceBySlug[group.services[0]].icon)}</span><div><p class="eyebrow">${escapeHtml(group.label)}</p><h3>${escapeHtml(group.summary)}</h3></div></div>
      <div class="route-service-grid">${group.services.map((slug) => serviceCard(serviceBySlug[slug], true)).join("")}</div>
    </div>`).join("");

  return `
    ${pageHero({
      eyebrow: "SERVICES OVERVIEW",
      title: `The right technology for <span class="gradient-text">the right problem.</span>`,
      lead: "Four ways in. Every engagement is scoped and agreed before work begins — with a first deliverable you can plan around.",
      actions: `${button("/book-a-call", "Book a discovery call")}${button("/contact", "Start with the problem", "secondary")}`,
      visual: heroVisual,
      breadcrumb: breadcrumbs([{ label: "Home", href: "/" }, { label: "Services" }]),
    })}
    ${routeSection("service-practices", sectionHeading({ eyebrow: "FOUR PRACTICES", title: "Fifteen services. One delivery system.", lead: "Explore the full capability set, grouped around the problems Horizon is built to solve." }), groupContent, "route-section--tinted")}
    ${routeSection("capabilities", sectionHeading({ eyebrow: "CAPABILITIES", title: "Design, engineering, quality, delivery and growth." }), `${capabilityMap()}<div class="route-inline-action">${textLink("/capabilities", "Explore the full capability map")}</div>`)}
    ${routeSection("related-case-studies", sectionHeading({ eyebrow: "PROOF OVER PROMISES", title: "Related case studies", lead: "Detailed outcomes are published only with written client approval." }), `<div class="route-card-grid route-card-grid--cases">${caseStudies.slice(0, 3).map(caseCard).join("")}</div>`)}
    ${routeSection("process", sectionHeading({ eyebrow: "HOW WE WORK", title: "A documented process from open question to working system." }), `<div class="route-process-grid">${processSteps.slice(0, 5).map((step) => `<div class="route-process-card"><span>${step.step}</span><strong>${escapeHtml(step.title)}</strong><p>${escapeHtml(step.text)}</p></div>`).join("")}</div><div class="route-inline-action">${textLink("/how-we-work", "See the full delivery process")}</div>`)}
    ${routeSection("faq", sectionHeading({ eyebrow: "BEFORE WE START", title: "Questions before we start." }), faqList(siteFaqs.slice(0, 5), "services"))}
    ${ctaBand()}`;
};

const serviceDetail = (slug) => {
  const service = serviceBySlug[slug];
  if (!service) return notFound();
  const group = serviceGroups.find((item) => item.id === service.group);
  const related = service.related.map((item) => serviceBySlug[item]).filter(Boolean);
  const relatedCase = caseStudyBySlug[service.relatedCase];
  const visual = `
    <div class="service-detail-visual">
      <div class="service-detail-visual-top"><span>${escapeHtml(group.label)}</span><span>HORIZON DELIVERY</span></div>
      <div class="service-detail-flow">
        <div class="service-detail-input"><span>INPUT</span><i></i><i></i><i></i></div>
        <div class="service-detail-arrow">→</div>
        <div class="service-detail-output"><span>${escapeHtml(service.visual)}</span><i></i><i></i><i></i></div>
      </div>
      <div class="service-detail-tags">${service.capabilities.map((item) => `<span class="pill pill--outline">${escapeHtml(item)}</span>`).join("")}</div>
    </div>`;

  return `
    ${pageHero({
      eyebrow: group.label,
      title: `${escapeHtml(service.title)} <span class="gradient-text">without the guesswork.</span>`,
      lead: service.hero,
      actions: `${button("/book-a-call", "Book a discovery call")}${button("/contact", "Discuss this service", "secondary")}`,
      visual,
      breadcrumb: breadcrumbs([{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]),
      className: "route-hero--detail",
    })}
    ${routeSection("problem", sectionHeading({ eyebrow: "THE PROBLEM", title: "What this service solves" }), `<div class="route-split"><div class="route-prose"><p>${escapeHtml(service.problem)}</p><p>We begin with the workflow and the commercial outcome, then agree the smallest valuable scope before any build starts.</p></div><div class="route-callout"><span class="route-callout-icon">${icon(service.icon)}</span><strong>Start with the problem</strong><p>${escapeHtml(service.short)}</p>${textLink("/contact", "Tell us what is getting in the way")}</div></div>`)}
    ${routeSection("deliver", sectionHeading({ eyebrow: "WHAT HORIZON DELIVERS", title: "A practical, owned working system" }), `<div class="route-deliver-grid">${service.delivers.map((item, index) => `<div class="route-deliver-card"><span>0${index + 1}</span><strong>${escapeHtml(item)}</strong></div>`).join("")}</div>`)}
    ${routeSection("how-it-works", sectionHeading({ eyebrow: "HOW IT WORKS", title: "From open question to measured release" }), `<div class="route-process-grid">${service.process.map((item) => `<div class="route-process-card"><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.text)}</p></div>`).join("")}</div>`)}
    ${routeSection("visual", sectionHeading({ eyebrow: "CAPABILITY VISUAL", title: "The system behind the service" }), `<div class="route-capability-panel"><span class="visual-label">${escapeHtml(service.title)}</span><div class="route-capability-flow"><span>Discover</span><i></i><span>Shape</span><i></i><span>Build</span><i></i><span>Release</span></div><div class="route-capability-tags">${service.capabilities.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div></div>`)}
    ${routeSection("case-study", sectionHeading({ eyebrow: "RELATED CASE STUDY", title: "A related example of the work" }), relatedCase ? caseCard(relatedCase) : `<p>Case study detail is being prepared for publication.</p>`)}
    ${routeSection("faq", sectionHeading({ eyebrow: "SERVICE FAQ", title: "Useful answers before we start." }), faqList(service.faqs, slug))}
    ${ctaBand("Have a problem worth solving?", `Discuss ${service.title.toLowerCase()} with a senior UK contact and get a practical view of the first step.`)}
    ${routeSection("related-services", sectionHeading({ eyebrow: "RELATED SERVICES", title: "You may also need" }), `<div class="route-service-grid">${related.map((item) => serviceCard(item, true)).join("")}</div>`)}`;
};

const howWeWork = () => `
  ${pageHero({
    eyebrow: "HOW WE WORK",
    title: `Five steps from open question to <span class="gradient-text">working system.</span>`,
    lead: "You should understand what is happening, why it matters and what comes next at every stage.",
    actions: `${button("/book-a-call", "Book a discovery call")}${button("/services", "Explore services", "secondary")}`,
    breadcrumb: breadcrumbs([{ label: "Home", href: "/" }, { label: "How We Work" }]),
  })}
  ${routeSection("delivery-process", sectionHeading({ eyebrow: "DOCUMENTED DELIVERY", title: "The detail most agencies hide, published here because it’s how we work." }), `<div class="route-how-grid">${processSteps.map((item, index) => `<article class="route-how-step" id="step-${index}"><span>${item.step}</span><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.text)}</p></article>`).join("")}</div>`, "route-section--tinted")}
  ${routeSection("governance", sectionHeading({ eyebrow: "GOVERNANCE", title: "Clear ownership. Careful delivery." }), `<div class="route-governance-grid"><div class="route-pipeline"><span>Discover</span><i></i><span>Shape</span><i></i><span>Agree</span><i></i><span>Build</span><i></i><span>QA</span><i></i><span>Launch</span></div><div class="route-governance-points">${["Named engineers", "Reviewed pull requests", "Automated testing", "Controlled releases", "GDPR-aware handling", "Clear IP ownership"].map((item) => `<div>${icon("icon-check", "check-icon")}<strong>${escapeHtml(item)}</strong></div>`).join("")}</div></div>`)}
  ${routeSection("leadership", sectionHeading({ eyebrow: "PRODUCT & PROJECT LEADERSHIP", title: "Direction, scope and delivery kept aligned." }), `<div class="route-split"><div class="route-prose"><p>Engagements can include fractional product or project leadership when your team needs senior direction without a full-time hire.</p></div><div class="route-inline-actions">${textLink("/services/product-management", "Product Management")}${textLink("/services/project-management", "Project Management")}</div></div>`)}
  ${routeSection("delivery-model", sectionHeading({ eyebrow: "DELIVERY MODEL", title: "UK accountability. Senior international engineering." }), `<div class="route-three-column"><div><strong>UK contact</strong><p>Commercial responsibility and day-to-day accountability sit with a named UK contact.</p></div><div><strong>One delivery team</strong><p>Product, design, engineering, QA and leadership work from one documented process.</p></div><div><strong>Senior international team</strong><p>Engineering and delivery capability is supported by senior people in Pakistan.</p></div></div><div class="route-inline-action">${textLink("/about", "Read more about Horizon")}</div>`)}
  ${ctaBand()}`;

const caseStudiesPage = (search) => {
  const params = new URLSearchParams(search);
  const category = params.get("category") || "All";
  const audience = params.get("audience");
  const categories = ["All", ...caseStudies.map((item) => item.category)];
  return `
    ${pageHero({
      eyebrow: "CASE STUDIES",
      title: `Proof over <span class="gradient-text">promises.</span>`,
      lead: "Three engagements are being documented for publication now. Each is published only with the client’s written approval — with measured outcomes, not marketing numbers.",
      actions: `${button("/contact", "Start a project")}${button("/services", "Explore services", "secondary")}`,
      breadcrumb: breadcrumbs([{ label: "Home", href: "/" }, { label: "Case Studies" }]),
    })}
    ${routeSection("case-list", sectionHeading({ eyebrow: "SELECTED WORK", title: "Case studies in preparation", lead: audience ? `Filtered for ${audience.replace(/-/g, " ")}.` : "Use the filters to explore the work by service area." }), `<div class="route-filters" data-filter-group="case">${categories.map((item) => `<button type="button" class="route-filter ${item === category ? "is-active" : ""}" data-filter="${escapeHtml(item)}" aria-pressed="${item === category}">${escapeHtml(item)}</button>`).join("")}</div><div class="route-card-grid route-card-grid--cases" data-filter-container="case">${caseStudies.map((item) => `<div data-category="${escapeHtml(item.category)}" data-audiences="${(item.audiences || []).join(",")}">${caseCard(item)}</div>`).join("")}</div>`, "route-section--tinted")}
    ${routeSection("outcomes", sectionHeading({ eyebrow: "MEASURED OUTCOMES", title: "No invented metrics. No imaginary logos." }), `<div class="route-prose route-prose--wide"><p>Case-study metrics, client names, technology details and timelines will be published only where the client has approved them. Until then, the work is represented by the actual delivery problem and the system design.</p></div>`)}
    ${ctaBand("Have a similar problem?", "Tell us what is slowing your business down. We’ll help you identify the highest-value opportunity before suggesting a tool.")}`;
};

const caseStudyDetail = (slug) => {
  const item = caseStudyBySlug[slug];
  if (!item) return notFound();
  const index = caseStudies.findIndex((entry) => entry.slug === slug);
  const next = caseStudies[(index + 1) % caseStudies.length];
  return `
    ${pageHero({
      eyebrow: item.label,
      title: escapeHtml(item.title),
      lead: item.summary,
      actions: `${button("/case-studies", "All case studies", "secondary")}${button("/contact", "Start with the problem")}`,
      visual: caseVisual(item.visual),
      breadcrumb: breadcrumbs([{ label: "Home", href: "/" }, { label: "Case Studies", href: "/case-studies" }, { label: item.title }]),
      className: "route-hero--case",
    })}
    ${routeSection("client", sectionHeading({ eyebrow: "CLIENT & INDUSTRY", title: "Publication context" }), `<div class="route-meta-grid"><div><span>CLIENT · INDUSTRY</span><strong>${escapeHtml(item.industry)}</strong></div><div><span>PROBLEM</span><strong>Published with client consent</strong></div><div><span>TECHNOLOGY</span><strong>Stack confirmed at publication</strong></div><div><span>MEASURED OUTCOME</span><strong>${escapeHtml(item.outcome)}</strong></div></div>`)}
    ${routeSection("challenge", sectionHeading({ eyebrow: "CHALLENGE", title: "What was getting in the way" }), `<div class="route-split"><div class="route-prose"><p>${escapeHtml(item.challenge)}</p><p>${escapeHtml(item.context)}</p></div><div class="route-callout"><strong>Outcome area</strong><p>${escapeHtml(item.outcome)}</p></div></div>`)}
    ${routeSection("approach", sectionHeading({ eyebrow: "APPROACH", title: "How the work was shaped" }), `<div class="route-deliver-grid">${item.approach.map((step, stepIndex) => `<div class="route-deliver-card"><span>0${stepIndex + 1}</span><strong>${escapeHtml(step)}</strong></div>`).join("")}</div>`)}
    ${routeSection("solution", sectionHeading({ eyebrow: "SOLUTION", title: "The working system" }), `<div class="route-solution-grid"><div class="route-solution-visual">${caseVisual(item.visual)}</div><div><ul class="route-check-list">${item.solution.map((solution) => `<li>${icon("icon-check", "check-icon")}<span>${escapeHtml(solution)}</span></li>`).join("")}</ul><div class="route-inline-action">${textLink(`/services/${item.services[0]}`, "Explore the lead service")}</div></div></div>`)}
    ${routeSection("delivery-process", sectionHeading({ eyebrow: "DELIVERY PROCESS", title: "Short cycles, reviewed work, controlled release" }), `<div class="route-process-grid">${processSteps.slice(0, 5).map((step) => `<div class="route-process-card"><span>${step.step}</span><strong>${escapeHtml(step.title)}</strong><p>${escapeHtml(step.text)}</p></div>`).join("")}</div>`)}
    ${routeSection("capabilities", sectionHeading({ eyebrow: "CAPABILITIES", title: "Skills used on the engagement" }), `<div class="route-chip-row">${item.capabilities.map((capability) => `<a class="route-chip-link" href="/capabilities">${escapeHtml(capability)}</a>`).join("")}</div><div class="route-inline-action">${textLink("/capabilities", "View all capabilities")}</div>`)}
    ${routeSection("related-services", sectionHeading({ eyebrow: "RELATED SERVICES", title: "Services behind the case study" }), `<div class="route-service-grid">${item.services.map((serviceSlug) => serviceBySlug[serviceSlug]).filter(Boolean).map((service) => serviceCard(service, true)).join("")}</div>`)}
    ${routeSection("next", sectionHeading({ eyebrow: "NEXT CASE STUDY", title: "Keep exploring" }), caseCard(next))}
    ${ctaBand()}`;
};

const insightsPage = (search) => {
  const params = new URLSearchParams(search);
  const category = params.get("category") || "All";
  const [featured, ...rest] = insights;
  const categories = ["All", ...insightCategories];
  return `
    ${pageHero({
      eyebrow: "INSIGHTS",
      title: `Useful thinking for <span class="gradient-text">practical technology decisions.</span>`,
      lead: "Short, grounded articles about automation, agents, product delivery, engineering quality and modern search. No hype and no invented proof.",
      actions: `${button("/contact", "Ask us a question")}${button("/services", "Explore services", "secondary")}`,
      breadcrumb: breadcrumbs([{ label: "Home", href: "/" }, { label: "Insights" }]),
    })}
    ${routeSection("featured", sectionHeading({ eyebrow: "FEATURED INSIGHT", title: "Start here" }), insightCard(featured, true), "route-section--tinted")}
    ${routeSection("articles", sectionHeading({ eyebrow: "ARTICLES", title: "Browse by category" }), `<div class="route-filters" data-filter-group="insight">${categories.map((item) => `<button type="button" class="route-filter ${item === category ? "is-active" : ""}" data-filter="${escapeHtml(item)}" aria-pressed="${item === category}">${escapeHtml(item)}</button>`).join("")}</div><div class="route-card-grid route-card-grid--insights" data-filter-container="insight">${insights.map((item) => `<div data-category="${escapeHtml(item.category)}">${insightCard(item)}</div>`).join("")}</div>`)}
    ${ctaBand("Need a second opinion?", "Use a discovery call to pressure-test the problem before you commit to a tool or a build.")}`;
};

const insightDetail = (slug) => {
  const item = insightBySlug[slug];
  if (!item) return notFound();
  const related = insights.filter((entry) => entry.slug !== slug).slice(0, 3);
  return `
    ${pageHero({
      eyebrow: item.category,
      title: escapeHtml(item.title),
      lead: item.summary,
      breadcrumb: breadcrumbs([{ label: "Home", href: "/" }, { label: "Insights", href: "/insights" }, { label: item.title }]),
      className: "route-hero--article",
    })}
    ${routeSection("article", "", `<div class="route-article-layout"><aside class="route-toc"><strong>On this page</strong>${item.sections.map((section) => `<a href="#${section.id}">${escapeHtml(section.title)}</a>`).join("")}<div class="route-article-meta"><span>${escapeHtml(item.date)}</span><span>${escapeHtml(item.readTime)}</span></div></aside><article class="route-article-body"><div class="route-article-visual"><span>${escapeHtml(item.category)}</span><i></i><i></i><i></i></div>${item.sections.map((section) => `<section id="${section.id}"><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.body)}</p></section>`).join("")}<div class="route-article-note"><strong>Working principle</strong><p>Start with the problem, make the assumptions visible and agree the outcome before choosing the tool.</p></div></article></div>`)}
    ${routeSection("related-articles", sectionHeading({ eyebrow: "RELATED ARTICLES", title: "Keep reading" }), `<div class="route-card-grid route-card-grid--insights">${related.map((entry) => insightCard(entry)).join("")}</div>`)}
    ${ctaBand()}`;
};

const about = () => `
  ${pageHero({
    eyebrow: "ABOUT HORIZON",
    title: `UK accountability. <span class="gradient-text">Senior international engineering.</span>`,
    lead: "Horizon Consults is a UK technology and AI delivery partner. We find the highest-value problem, then build the working system.",
    actions: `${button("/how-we-work", "See how we work")}${button("/contact", "Start with the problem", "secondary")}`,
    breadcrumb: breadcrumbs([{ label: "Home", href: "/" }, { label: "About" }]),
  })}
  ${routeSection("who-we-are", sectionHeading({ eyebrow: "WHO HORIZON IS", title: "A useful partner does more than take orders." }), `<div class="route-prose route-prose--wide"><p>We help clients decide what is worth doing, what can wait and how to keep delivery accountable. The commercial relationship and day-to-day accountability sit with a UK contact, while product, design, engineering, QA and delivery work is carried out by a senior international team in Pakistan.</p></div>`, "route-section--tinted")}
  ${routeSection("philosophy", sectionHeading({ eyebrow: "BUSINESS-FIRST PHILOSOPHY", title: "Start with friction, value and judgement." }), `<div class="route-three-column"><div><span>01</span><strong>Find the problem</strong><p>Understand where time, revenue or customer experience is leaking before talking about technology.</p></div><div><span>02</span><strong>Shape the scope</strong><p>Remove assumptions and define the smallest valuable piece of work.</p></div><div><span>03</span><strong>Build the system</strong><p>Deliver in short cycles with reviewed work, clear ownership and a measured outcome.</p></div></div>`)}
  ${routeSection("delivery-model", sectionHeading({ eyebrow: "DELIVERY MODEL", title: "One accountable team, one documented process." }), `<div class="route-split"><div class="route-prose"><p>Your UK contact owns the commercial relationship, scope and communication. The senior delivery team works from Pakistan under one process, with named engineers, reviewed code, automated testing and controlled releases.</p></div><div class="route-callout"><strong>Proof strip</strong><p>One accountable delivery lead. One documented process. One team you can phone.</p>${textLink("/how-we-work", "Explore governance")}</div></div>`)}
  ${routeSection("capabilities", sectionHeading({ eyebrow: "CAPABILITIES", title: "Design, engineering, quality, delivery and growth." }), `${capabilityMap()}<div class="route-inline-action">${textLink("/capabilities", "Open the capability map")}</div>`)}
  ${routeSection("principles", sectionHeading({ eyebrow: "PRINCIPLES", title: "What stays true on every engagement" }), `<div class="route-principle-grid">${["Business-first discovery", "Senior people stay involved", "Commercial clarity", "Built to belong to you"].map((item, index) => `<div><span>0${index + 1}</span><strong>${escapeHtml(item)}</strong></div>`).join("")}</div>`)}
  ${ctaBand()}`;

const capabilities = () => `
  ${pageHero({
    eyebrow: "CAPABILITIES",
    title: `The skills needed to move from <span class="gradient-text">problem to working product.</span>`,
    lead: "Horizon brings together the design, technical and delivery skills required for each engagement — without forcing clients to coordinate multiple suppliers.",
    actions: `${button("/services", "View all services")}${button("/contact", "Discuss your requirement", "secondary")}`,
    breadcrumb: breadcrumbs([{ label: "Home", href: "/" }, { label: "Capabilities" }]),
  })}
  ${routeSection("map", sectionHeading({ eyebrow: "ONE DELIVERY TEAM", title: "Complete multidisciplinary capability map" }), capabilityMap(), "route-section--tinted")}
  ${routeSection("by-practice", sectionHeading({ eyebrow: "BY PRACTICE", title: "Every capability links to a real service" }), `<div class="route-capability-lists">${capabilityGroups.map((group) => `<div><h3>${escapeHtml(group.name)}</h3>${group.items.map((item) => `<a href="${item.route}">${escapeHtml(item.label)} ${arrow}</a>`).join("")}</div>`).join("")}</div>`)}
  ${ctaBand()}`;

const contact = () => {
  const fields = {
    help: formOptions.help.map((item) => `<option>${escapeHtml(item)}</option>`).join(""),
    service: services.map((item) => `<option value="${item.slug}">${escapeHtml(item.title)}</option>`).join(""),
    stage: formOptions.stages.map((item) => `<option>${escapeHtml(item)}</option>`).join(""),
    budget: formOptions.budgets.map((item) => `<option>${escapeHtml(item)}</option>`).join(""),
  };
  return `
    ${pageHero({
      eyebrow: "CONTACT",
      title: `Start with the problem. <span class="gradient-text">We’ll help shape the next step.</span>`,
      lead: "Use the form to describe the workflow, system or product question. Every enquiry is treated as a discovery conversation, not a sales script.",
      breadcrumb: breadcrumbs([{ label: "Home", href: "/" }, { label: "Contact" }]),
      className: "route-hero--contact",
    })}
    ${routeSection("contact-form", sectionHeading({ eyebrow: "PROJECT ENQUIRY", title: "Tell us what you need help with" }), `<div class="route-contact-layout"><form class="route-form" data-form="contact" novalidate><div class="route-form-grid"><label>Name<input name="name" type="text" autocomplete="name" required /></label><label>Work email<input name="email" type="email" autocomplete="email" required /></label><label>Company<input name="company" type="text" autocomplete="organization" required /></label><label>Role<input name="role" type="text" autocomplete="organization-title" required /></label><label class="route-form-full">What do you need help with?<select name="help" required><option value="">Select an option</option>${fields.help}</select></label><label>Service interest<select name="service" required><option value="">Select a service</option>${fields.service}</select></label><label>Project stage<select name="stage" required><option value="">Select a stage</option>${fields.stage}</select></label><label>Budget range<select name="budget" required><option value="">Select a range</option>${fields.budget}</select></label><label class="route-form-full">Message<textarea name="message" rows="5" required></textarea></label></div><label class="route-consent"><input name="consent" type="checkbox" required /><span>I agree that Horizon may use these details to respond to this enquiry.</span></label><div class="route-form-actions"><button class="button button--gradient" type="submit" data-submit>Send enquiry ${arrow}</button><span class="route-form-note">No hard sell. Just a practical response.</span></div><div class="route-form-status" data-form-status aria-live="polite" hidden></div></form><aside class="route-contact-aside" id="uk-contact"><h3>UK contact</h3><p>Verified UK phone, email and company details will be published before launch. Until then, the form is the reliable route to start a conversation.</p><div class="route-contact-list"><div><span>PHONE</span><strong>UK number — live before launch</strong></div><div><span>EMAIL</span><strong>Email — live before launch</strong></div><div><span>COMPANY</span><strong>UK-registered business</strong></div></div>${button("/book-a-call", "Book a discovery call", "secondary")}</aside></div>`, "route-section--tinted")}
    ${ctaBand()}`;
};

const bookCall = () => `
  ${pageHero({
    eyebrow: "BOOK A CALL",
    title: `A free 30-minute <span class="gradient-text">discovery call.</span>`,
    lead: "Tell us what is slowing your business down. We’ll use the call to decide whether there is a useful problem to solve and what the next step should be.",
    breadcrumb: breadcrumbs([{ label: "Home", href: "/" }, { label: "Book a Call" }]),
    className: "route-hero--contact",
  })}
  ${routeSection("booking", sectionHeading({ eyebrow: "INTEGRATION-READY BOOKING", title: "Prepare your call request" }), `<div class="route-contact-layout"><form class="route-form" data-form="booking" novalidate><div class="route-form-grid"><label>Name<input name="name" type="text" autocomplete="name" required /></label><label>Work email<input name="email" type="email" autocomplete="email" required /></label><label>Company<input name="company" type="text" autocomplete="organization" required /></label><label>Preferred date<input name="date" type="date" required /></label><label>Preferred time<select name="time" required><option value="">Select a time</option>${formOptions.times.map((item) => `<option>${escapeHtml(item)}</option>`).join("")}</select></label><label class="route-form-full">What would you like to discuss?<textarea name="topic" rows="4" required></textarea></label></div><label class="route-consent"><input name="consent" type="checkbox" required /><span>I agree that Horizon may use these details to respond to this call request.</span></label><div class="route-form-actions"><button class="button button--gradient" type="submit" data-submit>Prepare call request ${arrow}</button><span class="route-form-note">Booking integration can be connected later.</span></div><div class="route-form-status" data-form-status aria-live="polite" hidden></div></form><aside class="route-contact-aside"><h3>What happens on the call?</h3><ul class="route-check-list"><li>${icon("icon-check", "check-icon")}<span>Understand the current workflow and friction.</span></li><li>${icon("icon-check", "check-icon")}<span>Identify the highest-value opportunity.</span></li><li>${icon("icon-check", "check-icon")}<span>Agree whether Horizon is the right partner.</span></li><li>${icon("icon-check", "check-icon")}<span>Leave with a clear next step, without obligation.</span></li></ul>${button("/contact", "Prefer a written enquiry?", "secondary")}</aside></div>`, "route-section--tinted")}
  ${ctaBand()}`;

const legal = () => `
  ${pageHero({
    eyebrow: "LEGAL",
    title: `Privacy, terms and <span class="gradient-text">site information.</span>`,
    lead: "This page is an integration-ready placeholder. Legal details will be published before launch and will not include unverified company information.",
    breadcrumb: breadcrumbs([{ label: "Home", href: "/" }, { label: "Legal" }]),
  })}
  ${routeSection("privacy", sectionHeading({ eyebrow: "PRIVACY", title: "Privacy notice" }), `<div class="route-prose route-prose--wide"><p>Horizon Consults will use enquiry details only to respond to your request and manage any resulting conversation. A complete privacy notice, data controller details and retention periods will be published before launch.</p></div>`, "route-section--tinted")}
  ${routeSection("terms", sectionHeading({ eyebrow: "TERMS", title: "Website terms" }), `<div class="route-prose route-prose--wide"><p>Website terms will be published before launch. No contractual relationship is created by browsing this site or preparing an enquiry draft.</p></div>`)}
  ${routeSection("contact", sectionHeading({ eyebrow: "QUESTIONS", title: "Need something clarified?" }), `<div class="route-inline-action">${textLink("/contact", "Contact Horizon Consults")}</div>`)}
  ${ctaBand()}`;

const notFound = () => `
  ${pageHero({
    eyebrow: "404",
    title: `That page has not been <span class="gradient-text">built yet.</span>`,
    lead: "The link may be outdated, or the page may still be in preparation. Use the navigation below to return to a useful part of the site.",
    actions: `${button("/", "Return home")}${button("/services", "View all services", "secondary")}`,
    breadcrumb: breadcrumbs([{ label: "Home", href: "/" }, { label: "Not found" }]),
  })}
  ${routeSection("suggestions", sectionHeading({ eyebrow: "USEFUL DESTINATIONS", title: "Where to go next" }), `<div class="route-service-grid">${services.slice(0, 4).map((service) => serviceCard(service, true)).join("")}</div>`)}
  ${ctaBand()}`;

export function renderRoute(pathname, search = "") {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/services") return { title: "Services Overview — Horizon Consults", html: servicesOverview() };
  if (path.startsWith("/services/")) return { title: `${serviceBySlug[path.split("/")[2]]?.title || "Service"} — Horizon Consults`, html: serviceDetail(path.split("/")[2]) };
  if (path === "/how-we-work") return { title: "How We Work — Horizon Consults", html: howWeWork() };
  if (path === "/case-studies") return { title: "Case Studies — Horizon Consults", html: caseStudiesPage(search) };
  if (path.startsWith("/case-studies/")) return { title: `${caseStudyBySlug[path.split("/")[2]]?.title || "Case Study"} — Horizon Consults`, html: caseStudyDetail(path.split("/")[2]) };
  if (path === "/insights") return { title: "Insights — Horizon Consults", html: insightsPage(search) };
  if (path.startsWith("/insights/")) return { title: `${insightBySlug[decodeURIComponent(path.split("/")[2])]?.title || "Insight"} — Horizon Consults`, html: insightDetail(decodeURIComponent(path.split("/")[2])) };
  if (path === "/about") return { title: "About — Horizon Consults", html: about() };
  if (path === "/capabilities") return { title: "Capabilities — Horizon Consults", html: capabilities() };
  if (path === "/contact") return { title: "Contact — Horizon Consults", html: contact() };
  if (path === "/book-a-call") return { title: "Book a Call — Horizon Consults", html: bookCall() };
  if (path === "/legal") return { title: "Legal — Horizon Consults", html: legal() };
  return { title: "Page not found — Horizon Consults", html: notFound() };
}

export function getHomeTitle() {
  return "Horizon Consults — UK Technology & AI Delivery Partner";
}

export { serviceGroups, services, companyLinks, insightCategories, audiences };
