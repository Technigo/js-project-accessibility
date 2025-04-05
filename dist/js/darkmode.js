"use strict";
const darkmodetoggle = document.querySelector("#dark-mode-icon");
const theBody = document.querySelector("body");
const darkmode = () => {
    if (theBody.classList.contains("dark-mode")) {
        theBody.classList.remove("dark-mode");
        localStorage.setItem("dark-mode", "disabled");
        darkmodetoggle.classList.remove("dark-button");
        darkmodetoggle.innerHTML = "DARK MODE";
    }
    else {
        theBody.classList.add("dark-mode");
        localStorage.setItem("dark-mode", "enabled");
        darkmodetoggle.classList.add("dark-button");
        darkmodetoggle.innerHTML = "LIGHT MODE";
    }
    const isExpanded = darkmodetoggle.getAttribute("aria-expanded") === "true";
    darkmodetoggle.setAttribute("aria-expanded", isExpanded ? "false" : "true");
};
darkmodetoggle.addEventListener("click", darkmode);
