const d = document;
const hamburgerBtn = d.getElementById("hamburger-menu");
const hamburgerIcon = d.querySelector(".fa-bars");
const panelMenu = d.getElementById("panel-menu");
const enlacesMenu = d.querySelector(".nav-menu");

d.addEventListener("click", (e) => {
  const t = e.target;
  if (t === hamburgerIcon) panelMenu.classList.toggle("is-active");

  if (t !== panelMenu && t !== hamburgerIcon && t !== hamburgerBtn && t !== enlacesMenu) panelMenu.classList.remove("is-active");
});
