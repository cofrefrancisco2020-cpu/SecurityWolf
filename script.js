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
