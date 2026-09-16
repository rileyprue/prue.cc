const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuButton && mobileMenu) {

```
menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

    if (mobileMenu.classList.contains("active")) {
        mobileMenu.style.display = "flex";
    } else {
        mobileMenu.style.display = "none";
    }

});
```

}

const mobileLinks = document.querySelectorAll(".mobile-menu a");

mobileLinks.forEach(link => {

```
link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    mobileMenu.style.display = "none";
});
```

});

window.addEventListener("scroll", () => {

```
const header = document.querySelector(".site-header");

if (!header) return;

if (window.scrollY > 80) {
    header.style.position = "fixed";
    header.style.background = "rgba(243, 240, 233, .92)";
    header.style.backdropFilter = "blur(14px)";
} else {
    header.style.position = "absolute";
    header.style.background = "transparent";
    header.style.backdropFilter = "none";
}
```

});
