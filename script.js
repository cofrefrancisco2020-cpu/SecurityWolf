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

window.addEventListener(
  "scroll",
  () => header?.classList.toggle("is-scrolled", window.scrollY > 36),
  { passive: true },
);

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
