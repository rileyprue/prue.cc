document.body.classList.add("loading");

window.addEventListener("load", () => {
  setTimeout(() => document.querySelector(".loader")?.classList.add("done"), 450);
  document.body.classList.remove("loading");
});

const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");

menuButton?.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  mobileMenu.style.display = mobileMenu.classList.contains("active") ? "flex" : "none";
});

mobileMenu?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    mobileMenu.style.display = "none";
  });
});

let lastScroll = 0;
window.addEventListener("scroll", () => {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const y = window.scrollY;
  if (y > 80) {
    header.style.position = "fixed";
    header.style.background = "rgba(242,239,231,.88)";
    header.style.backdropFilter = "blur(16px)";
    header.style.borderBottom = "1px solid rgba(23,23,21,.08)";
  } else {
    header.style.position = "absolute";
    header.style.background = "transparent";
    header.style.backdropFilter = "none";
    header.style.borderBottom = "0";
  }
  lastScroll = y;
});

document.querySelectorAll(".magnetic").forEach(el => {
  el.addEventListener("mousemove", e => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * .08;
    const y = (e.clientY - r.top - r.height / 2) * .08;
    el.style.transform = `translate(${x}px,${y}px)`;
  });
  el.addEventListener("mouseleave", () => el.style.transform = "");
});

const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");

window.addEventListener("mousemove", e => {
  if (!dot || !ring) return;
  dot.style.left = `${e.clientX}px`;
  dot.style.top = `${e.clientY}px`;
  ring.style.left = `${e.clientX}px`;
  ring.style.top = `${e.clientY}px`;
});

document.querySelectorAll("a,button").forEach(el => {
  el.addEventListener("mouseenter", () => {
    if (ring) { ring.style.width = "48px"; ring.style.height = "48px"; }
  });
  el.addEventListener("mouseleave", () => {
    if (ring) { ring.style.width = "34px"; ring.style.height = "34px"; }
  });
});
