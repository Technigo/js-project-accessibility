// Menu

const navLinks = document.querySelector("#nav-links")
const menuIcon = document.querySelector("#menu-icon")

const burgerMenu = () => {
  navLinks.classList.toggle("active")
  menuIcon.classList.toggle("fa-bars")
  menuIcon.classList.toggle("fa-times")
}

menuIcon.addEventListener("click", burgerMenu)

// Darkmode

const theBody = document.querySelector("body")

const darkmodetoggle = document.querySelector(
  "#dark-mode-icon"
)

if (localStorage.getItem("dark-mode") === "enabled") {
  theBody.classList.add("dark-mode");
}

const darkmode = () => {
  if (theBody.classList.contains("dark-mode")) {
    theBody.classList.remove("dark-mode");
    localStorage.setItem("dark-mode", "disabled");
    darkmodetoggle.classList.remove("dark-button");
    darkmodetoggle.innerHTML = "DARK MODE";
  } else {
    theBody.classList.add("dark-mode");
    localStorage.setItem("dark-mode", "enabled");
    darkmodetoggle.classList.add("dark-button");
    darkmodetoggle.innerHTML = "LIGHT MODE";
  }

  const isExpanded = darkmodetoggle.getAttribute("aria-expanded") === "true";
  darkmodetoggle.setAttribute("aria-expanded", isExpanded ? "false" : "true");
};

darkmodetoggle.addEventListener("click", darkmode);



