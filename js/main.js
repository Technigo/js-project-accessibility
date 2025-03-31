// function displayActiveMenu() {
//   const menuItems = document.querySelectorAll("ul li");
//   const currentPath = window.location.pathname;

//   menuItems.forEach((item) => {
//     const link = item.querySelector("a");
//     const linkPath = link.getAttribute("href");

//     // Check if the link's href matches the current URL path
//     if (currentPath.endsWith(linkPath)) {
//       item.classList.add("active");
//     } else {
//       item.classList.remove("active");
//     }
//     // Add click event listener (for in-page navigation)
//     item.addEventListener("click", () => {
//       // Remove "active" from any other item
//       document.querySelectorAll("li.active").forEach((activeItem) => {
//         activeItem.classList.remove("active");
//       });
//       // Add "active" to the clicked item
//       item.classList.add("active");
//     });
//   });
// }

document.addEventListener("DOMContentLoaded", () => {
  const startQuizButton = document.getElementById("start-quiz-button");
  const quizSection = document.querySelector(".quiz-section");
  const introSection = document.querySelector(".intro-section");

  if (startQuizButton && quizSection && introSection) {
    startQuizButton.addEventListener("click", () => {
      // Show the quiz section
      quizSection.style.display = "block"; // Or 'flex' or 'grid' if needed

      // Hide the intro section
      introSection.style.display = "none";
    });
  } else {
    console.error(
      "Could not find one or more of the required elements: startQuizButton, quizSection, introSection"
    );
  }
  displayActiveMenu();
});
