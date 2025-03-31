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
});
