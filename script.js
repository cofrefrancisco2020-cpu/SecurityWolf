const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu a");

const setMenu = (open) => {
  menuButton?.setAttribute("aria-expanded", String(open));
  mobileMenu?.setAttribute("aria-hidden", String(!open));
  mobileMenu?.classList.toggle("is-open", open);
  document.body.style.overflow = open ? "hidden" : "";
  const label = menuButton?.querySelector(".sr-only");
  if (label) label.textContent = open ? "Cerrar menú" : "Abrir menú";
};

menuButton?.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});

mobileLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

const progressBar = document.querySelector(".page-progress span");
const sectionRailLinks = [...document.querySelectorAll(".section-rail a")];
const desktopLinks = [...document.querySelectorAll(".desktop-nav a")];
const trackedSections = sectionRailLinks
  .map((link) => document.querySelector(`#${link.dataset.section}`))
  .filter(Boolean);
let scrollFrame = null;

const updatePageState = () => {
  const scrollLimit = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const ratio = Math.min(1, Math.max(0, window.scrollY / scrollLimit));
  progressBar?.style.setProperty("transform", `scaleX(${ratio})`);
  header?.classList.toggle("is-scrolled", window.scrollY > 36);

  const checkpoint = window.scrollY + window.innerHeight * 0.42;
  const activeSection = trackedSections.reduce((active, section) => {
    return section.offsetTop <= checkpoint ? section : active;
  }, trackedSections[0]);

  sectionRailLinks.forEach((link) => {
    const isActive = link.dataset.section === activeSection?.id;
    link.classList.toggle("is-active", isActive);
    if (isActive) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });

  desktopLinks.forEach((link) => {
    const target = link.getAttribute("href")?.slice(1);
    link.classList.toggle("is-active", target === activeSection?.id);
  });

  scrollFrame = null;
};

const requestPageUpdate = () => {
  if (scrollFrame !== null) return;
  scrollFrame = window.requestAnimationFrame(updatePageState);
};

window.addEventListener("scroll", requestPageUpdate, { passive: true });
window.addEventListener("resize", requestPageUpdate, { passive: true });
updatePageState();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const heroVisual = document.querySelector("[data-parallax-zone]");

if (heroVisual && !reducedMotion.matches && finePointer.matches) {
  heroVisual.addEventListener("pointermove", (event) => {
    const bounds = heroVisual.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    heroVisual.style.setProperty("--parallax-x", `${x * 12}px`);
    heroVisual.style.setProperty("--parallax-y", `${y * 10}px`);
    heroVisual.style.setProperty("--parallax-rx", `${y * -2.4}deg`);
    heroVisual.style.setProperty("--parallax-ry", `${x * 2.4}deg`);
  });

  heroVisual.addEventListener("pointerleave", () => {
    heroVisual.style.setProperty("--parallax-x", "0px");
    heroVisual.style.setProperty("--parallax-y", "0px");
    heroVisual.style.setProperty("--parallax-rx", "0deg");
    heroVisual.style.setProperty("--parallax-ry", "0deg");
  });
}

if (!reducedMotion.matches && finePointer.matches) {
  document.querySelectorAll(".pillar-card").forEach((card) => {
    const media = card.querySelector(".pillar-media");
    if (!media) return;

    card.addEventListener("pointermove", (event) => {
      const bounds = media.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;
      media.style.setProperty("--spot-x", `${Math.max(0, Math.min(100, x))}%`);
      media.style.setProperty("--spot-y", `${Math.max(0, Math.min(100, y))}%`);
    });
  });
}

document.querySelectorAll(".service-card").forEach((card, index) => {
  const description = card.querySelector(":scope > .service-detail-copy");
  const list = card.querySelector(":scope > ul");
  if (!description || !list) return;

  const detail = document.createElement("div");
  const detailId = `service-detail-${index + 1}`;
  detail.className = "service-card-detail";
  detail.id = detailId;
  detail.append(description, list);

  const toggle = document.createElement("button");
  toggle.className = "service-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", detailId);
  toggle.innerHTML = '<span>Más información</span><i aria-hidden="true"></i>';

  card.classList.add("is-collapsible");
  card.append(toggle, detail);

  toggle.addEventListener("click", () => {
    const shouldOpen = toggle.getAttribute("aria-expanded") !== "true";

    document.querySelectorAll(".service-card.is-expanded").forEach((openCard) => {
      if (openCard === card) return;
      openCard.classList.remove("is-expanded");
      const openToggle = openCard.querySelector(".service-toggle");
      const openDetail = openCard.querySelector(".service-card-detail");
      openToggle?.setAttribute("aria-expanded", "false");
      if (openDetail) openDetail.style.maxHeight = "0px";
    });

    card.classList.toggle("is-expanded", shouldOpen);
    toggle.setAttribute("aria-expanded", String(shouldOpen));
    detail.style.maxHeight = shouldOpen ? `${detail.scrollHeight}px` : "0px";
  });
});

window.addEventListener("resize", () => {
  document.querySelectorAll(".service-card.is-expanded .service-card-detail").forEach((detail) => {
    detail.style.maxHeight = `${detail.scrollHeight}px`;
  });
});

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const answer = item?.querySelector(".faq-answer");
    const expanded = button.getAttribute("aria-expanded") === "true";

    document.querySelectorAll(".faq-item button[aria-expanded='true']").forEach((openButton) => {
      if (openButton !== button) {
        openButton.setAttribute("aria-expanded", "false");
        const openAnswer = openButton.closest(".faq-item")?.querySelector(".faq-answer");
        if (openAnswer) openAnswer.style.maxHeight = "0px";
      }
    });

    button.setAttribute("aria-expanded", String(!expanded));
    if (answer) answer.style.maxHeight = expanded ? "0px" : `${answer.scrollHeight}px`;
  });
});

document.querySelector("#contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = data.get("name")?.toString().trim();
  const company = data.get("company")?.toString().trim();
  const interest = data.get("interest")?.toString().trim();
  const message = data.get("message")?.toString().trim();
  const body = [
    "Hola Silver Wolf Services, quiero hacer una consulta.",
    "",
    `Nombre: ${name || "No indicado"}`,
    `Empresa: ${company || "No indicada"}`,
    `Interés: ${interest || "Orientación"}`,
    `Mensaje: ${message || "Quiero coordinar una conversación inicial."}`,
  ].join("\n");

  window.open(`https://wa.me/56964560874?text=${encodeURIComponent(body)}`, "_blank", "noopener,noreferrer");
});

const year = document.querySelector("#current-year");
if (year) year.textContent = new Date().getFullYear();
